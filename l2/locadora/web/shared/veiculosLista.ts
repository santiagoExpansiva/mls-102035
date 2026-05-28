/// <mls fileReference="_102035_/l2/locadora/web/shared/veiculosLista.ts" enhancement="_blank" />

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import type { AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import {
    bindExpectedNavigationLoad,
    consumeExpectedNavigationLoad,
    runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import type { LocadoraVeiculoResponse } from '/_102035_/l2/locadora/web/contracts/veiculosLista.js';
import { ParameterizedStatement$ } from '@aws-sdk/client-dynamodb';

/// **collab_i18n_start**
const message_pt = {
    brand: 'Locadora',
    pageTitle: 'Veiculos - Lista',
    pageSubtitle: 'Consultar e filtrar veiculos cadastrados.',
    loadingVeiculos: 'Carregando veiculos...',
    couldNotLoad: 'Nao foi possivel carregar os dados.',
    reload: 'Recarregar',
    filterStatus: 'Status',
    placa: 'Placa',
    modelo: 'Modelo',
    ano: 'Ano',
    categoria: 'Categoria',
    status: 'Status',
    quilometragem: 'Quilometragem',
    itemsAvailable: 'itens disponiveis',
};
const message_en = {
    brand: 'Car rental',
    pageTitle: 'Vehicles - List',
    pageSubtitle: 'View and filter registered vehicles.',
    loadingVeiculos: 'Loading vehicles...',
    couldNotLoad: 'Could not load data.',
    reload: 'Reload',
    filterStatus: 'Status',
    placa: 'Plate',
    modelo: 'Model',
    ano: 'Year',
    categoria: 'Category',
    status: 'Status',
    quilometragem: 'Mileage',
    itemsAvailable: 'items available',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class LocadoraVeiculosListaBase extends CollabLitElement {
    static properties = {
        veiculo: { state: true },
        status: { state: true },
    };

    declare veiculo: LocadoraVeiculoResponse[];
    declare status: string;
    protected msg: MessageType = messages['en'];

    constructor() {
        super();
        this.veiculo = [];
        this.status = '';
    }

    createRenderRoot() { return this; }

    connectedCallback() {
        super.connectedCallback();
        const pendingLoad = consumeExpectedNavigationLoad();
        const task = this.loadInitialData(undefined, {
            // mode: pendingLoad ? 'blocking' : 'silent',
            mode: 'silent',
            signal: pendingLoad?.signal,
        });
        bindExpectedNavigationLoad(pendingLoad, task);
        void task.catch(() => undefined);
        const lang: string = this.getMessageKey(messages);
        this.msg = messages[lang] || messages['en'];
    }

    protected async loadInitialData(_params?: unknown, options?: BffClientOptions): Promise<void> {
        return await this.loadListVeiculos();
    }

    // ── load methods (one per read routine) ──
    async loadListVeiculos(
        params?: { status?: string },
        options?: BffClientOptions,
    ): Promise<void> {
        this.status = this.msg.loadingVeiculos;

        if ((window as any).mls) {
            const mocked: LocadoraVeiculoResponse[] = [
                {
                    placa: 'BRA1A23',
                    modelo: 'Fiat Argo',
                    ano: 2022,
                    categoria: 'Hatch',
                    status: 'disponível',
                    quilometragem: 38210,
                },
                {
                    placa: 'XYZ9B87',
                    modelo: 'Chevrolet Onix',
                    ano: 2021,
                    categoria: 'Compacto',
                    status: 'locado',
                    quilometragem: 54780,
                },
                {
                    placa: 'QWE7C55',
                    modelo: 'Toyota Corolla',
                    ano: 2020,
                    categoria: 'Sedan',
                    status: 'manutenção',
                    quilometragem: 90120,
                },
            ];


            const statusParam = (params?.status ?? 'todos') as string;
            this.veiculo = statusParam && statusParam !== 'todos'
                ? mocked.filter((v) => v.status === statusParam)
                : mocked;
            this.status = `${this.veiculo.length} ${this.msg.itemsAvailable}`;
            return;
        }
        if((params ?? {}).status === 'todos') {
            params.status = '';
        }
        
        const response = await execBff<LocadoraVeiculoResponse[]>(
            'locadora.veiculosLista.listVeiculos',
            params ?? {},
            options,
        );
        if (!response.ok || !response.data) {
            if (options?.mode === 'blocking') {
                throw (response.error ?? {
                    code: 'UNEXPECTED_ERROR',
                    message: this.msg.couldNotLoad,
                }) satisfies AuraNormalizedError;
            }
            this.status = this.msg.couldNotLoad;
            this.veiculo = [];
            return;
        }
        this.veiculo = response.data ?? [];
        this.status = `${this.veiculo.length} ${this.msg.itemsAvailable}`;
    }

    // ── action methods (one per write routine) ──
    // (no write routines defined for this page)

    // ── form submit handlers (one per write routine that originates from a form) ──
    // (no form actions defined for this page)

    protected handleReloadClick(): void {
        const params = { status: '' };
        void runBlockingUiAction(
            async (signal: AbortSignal) => {
                await this.loadListVeiculos(params, { mode: 'blocking', signal });
            },
            {
                busyLabel: this.msg.loadingVeiculos,
                errorTitle: this.msg.couldNotLoad,
                retry: () => this.loadListVeiculos(params),
            },
        );
    }
}

/// <mls fileReference="_102035_/l2/locadora/web/shared/veiculosCadastro.ts" enhancement="_blank" />

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import type { AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import {
    bindExpectedNavigationLoad,
    consumeExpectedNavigationLoad,
    runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import type { LocadoraUpdateVeiculoRequest } from '/_102035_/l2/locadora/web/contracts/veiculosCadastro.js';

/// **collab_i18n_start**
const message_pt = {
    brand: 'Locadora',
    pageTitle: 'Cadastro de veiculos',
    pageSubtitle: 'Cadastrar veiculo da frota com dados obrigatorios.',
    loadingStatusVeiculoOptions: 'Carregando opcoes de status do veiculo...',
    couldNotLoad: 'Nao foi possivel carregar os dados.',
    couldNotSave: 'Nao foi possivel salvar o veiculo.',
    savedSuccessfully: 'Veiculo salvo com sucesso.',
    reload: 'Recarregar',
    save: 'Salvar',
    saving: 'Salvando...',
    placa: 'Placa',
    modelo: 'Modelo',
    ano: 'Ano',
    categoria: 'Categoria',
    status: 'Status',
    quilometragem: 'Quilometragem',
};
const message_en = {
    brand: 'Car rental',
    pageTitle: 'Vehicle registration',
    pageSubtitle: 'Register a fleet vehicle with required data.',
    loadingStatusVeiculoOptions: 'Loading vehicle status options...',
    couldNotLoad: 'Could not load data.',
    couldNotSave: 'Could not save vehicle.',
    savedSuccessfully: 'Vehicle saved successfully.',
    reload: 'Reload',
    save: 'Save',
    saving: 'Saving...',
    placa: 'License plate',
    modelo: 'Model',
    ano: 'Year',
    categoria: 'Category',
    status: 'Status',
    quilometragem: 'Mileage',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class LocadoraVeiculosCadastroBase extends CollabLitElement {
    static properties = {
        statusVeiculoOptions: { state: true },
        placa: { state: true },
        modelo: { state: true },
        ano: { state: true },
        categoria: { state: true },
        statusVeiculo: { state: true },
        quilometragem: { state: true },
        formErrors: { state: true },
        formDirty: { state: true },
        status: { state: true },
    };

    declare statusVeiculoOptions: string[];
    declare placa: string;
    declare modelo: string;
    declare ano: number | undefined;
    declare categoria: string;
    declare statusVeiculo: string;
    declare quilometragem: number | undefined;
    declare formErrors: Record<string, string>;
    declare formDirty: boolean;
    declare status: string;

    protected msg: MessageType = messages['en'];

    constructor() {
        super();
        this.statusVeiculoOptions = [];
        this.placa = '';
        this.modelo = '';
        this.ano = undefined;
        this.categoria = '';
        this.statusVeiculo = '';
        this.quilometragem = undefined;
        this.formErrors = {};
        this.formDirty = false;
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

    protected async loadInitialData(_params?: undefined, options?: BffClientOptions): Promise<void> {
        await this.loadGetStatusVeiculoOptions(undefined, options);
    }

    // ── load methods (one per read routine) ──
    async loadGetStatusVeiculoOptions(_params?: undefined, options?: BffClientOptions): Promise<void> {
        this.status = this.msg.loadingStatusVeiculoOptions;

        this.statusVeiculoOptions = ['disponivel', 'locado', 'manutencao'];
        this.status = '';
        return;

    }

    // ── action methods (one per write routine) ──
    async save(params: LocadoraUpdateVeiculoRequest, signal?: AbortSignal): Promise<void> {
        const options: BffClientOptions | undefined = signal ? { mode: 'blocking', signal } : { mode: 'blocking' };

        if ((window as any).mls) {
            console.log('[mls mock] locadora.veiculosCadastro.saveVeiculo', params);
            this.status = this.msg.savedSuccessfully;
            return;
        }

        const response = await execBff<unknown>('locadora.veiculosCadastro.saveVeiculo', params, options);
        if (!response.ok) {
            throw (response.error ?? {
                code: 'UNEXPECTED_ERROR',
                message: this.msg.couldNotSave,
            }) satisfies AuraNormalizedError;
        }

        this.status = this.msg.savedSuccessfully;
        await this.loadGetStatusVeiculoOptions(undefined, { mode: 'silent' });
    }

    // ── form submit handlers (one per write routine that originates from a form) ──
    handleSaveSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const params: LocadoraUpdateVeiculoRequest = {
            placa: this.placa,
            modelo: this.modelo,
            ano: this.ano,
            categoria: this.categoria,
            status: (this.statusVeiculo as any),
            quilometragem: this.quilometragem,
        };

        void runBlockingUiAction(
            async (signal: AbortSignal) => { await this.save(params, signal); },
            {
                busyLabel: this.msg.saving,
                errorTitle: this.msg.couldNotSave,
                retry: () => this.save(params),
            },
        );
    }
}

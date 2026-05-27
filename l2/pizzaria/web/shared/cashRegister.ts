/// <mls fileReference="_102035_/l2/pizzaria/web/shared/cashRegister.ts" enhancement="_blank" />

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import type { AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import {
bindExpectedNavigationLoad,
consumeExpectedNavigationLoad,
runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import type { PizzariaCaixa, PizzariaMovimentoCaixa } from '/_102035_/l2/pizzaria/web/contracts/cashRegister.js';

/// **collab_i18n_start**
const message_pt = {
brand: 'Pizzaria',
pageTitle: 'Cash Register',
pageSubtitle: 'Gerenciar abertura, sangria e fechamento do caixa diario.',
loadingCaixaDia: 'Carregando caixa do dia...',
loadingMovimentosCaixaDia: 'Carregando movimentos do caixa...',
couldNotLoad: 'Nao foi possivel carregar os dados.',
couldNotSave: 'Nao foi possivel salvar.',
savedSuccessfully: 'Salvo com sucesso.',
reload: 'Recarregar',
save: 'Salvar',
saving: 'Salvando...',
confirm: 'Confirmar',
confirming: 'Confirmando...',
fieldData: 'Data',
fieldStatus: 'Status',
fieldValorAbertura: 'Valor de abertura',
fieldValorFechamento: 'Valor de fechamento',
fieldTipo: 'Tipo',
fieldValor: 'Valor',
fieldObservacao: 'Observacao',
};
const message_en = {
brand: 'Pizzaria',
pageTitle: 'Cash Register',
pageSubtitle: 'Manage opening, cash withdrawal, and daily closing.',
loadingCaixaDia: 'Loading daily cash register...',
loadingMovimentosCaixaDia: 'Loading cash movements...',
couldNotLoad: 'Could not load data.',
couldNotSave: 'Could not save.',
savedSuccessfully: 'Saved successfully.',
reload: 'Reload',
save: 'Save',
saving: 'Saving...',
confirm: 'Confirm',
confirming: 'Confirming...',
fieldData: 'Date',
fieldStatus: 'Status',
fieldValorAbertura: 'Opening amount',
fieldValorFechamento: 'Closing amount',
fieldTipo: 'Type',
fieldValor: 'Amount',
fieldObservacao: 'Notes',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PizzariaCashRegisterBase extends CollabLitElement {
static properties = {
caixaDia: { state: true },
movimentosCaixaDia: { state: true },
status: { state: true },
};

declare caixaDia: PizzariaCaixa | undefined;
declare movimentosCaixaDia: PizzariaMovimentoCaixa[];
declare status: string;

protected msg: MessageType = messages['en'];

createRenderRoot() {
return this;
}

connectedCallback() {
super.connectedCallback();

// defaults
this.caixaDia ??= undefined;
this.movimentosCaixaDia ??= [];
this.status ??= '';

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

async loadInitialData(
params?: { data?: string | Date },
options?: BffClientOptions,
): Promise<void> {
await this.loadGetCaixaDia(params, options);
await this.loadListMovimentosCaixaDia(params, options);
}

// ── load methods (one per read routine) ──
async loadGetCaixaDia(
params?: { data?: string | Date },
options?: BffClientOptions,
): Promise<void> {
this.status = this.msg.loadingCaixaDia;

if ((window as any).mls) {
this.caixaDia = {
id: 'cx-1',
data: params?.data ? String(params.data) : '2026-05-27',
status: 'aberto',
valorAbertura: 250,
valorFechamento: 0,
} as PizzariaCaixa;
this.status = this.msg.savedSuccessfully;
return;
} else {
const response = await execBff<PizzariaCaixa>('pizzaria.getCaixaDia', params, options);
if (!response.ok || !response.data) {
if (options?.mode === 'blocking') {
throw (
response.error ??
({
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotLoad,
} satisfies AuraNormalizedError)
);
}
this.status = this.msg.couldNotLoad;
this.caixaDia = undefined;
return;
}
this.caixaDia = response.data ?? undefined;
this.status = '';
}
}

async loadListMovimentosCaixaDia(
params?: { data?: string | Date },
options?: BffClientOptions,
): Promise<void> {
this.status = this.msg.loadingMovimentosCaixaDia;

if ((window as any).mls) {
this.movimentosCaixaDia = [
{
id: 'mv-1',
dataHora: '2026-05-27T09:05:00',
tipo: 'entrada',
valor: 100,
observacao: 'Troco inicial',
} as PizzariaMovimentoCaixa,
{
id: 'mv-2',
dataHora: '2026-05-27T12:30:00',
tipo: 'sangria',
valor: 80,
observacao: 'Deposito parcial',
} as PizzariaMovimentoCaixa,
{
id: 'mv-3',
dataHora: '2026-05-27T15:10:00',
tipo: 'entrada',
valor: 50,
observacao: 'Ajuste de caixa',
} as PizzariaMovimentoCaixa,
];
this.status = this.msg.savedSuccessfully;
return;
} else {
const response = await execBff<PizzariaMovimentoCaixa[]>(
'pizzaria.listMovimentosCaixaDia',
params,
options,
);
if (!response.ok || !response.data) {
if (options?.mode === 'blocking') {
throw (
response.error ??
({
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotLoad,
} satisfies AuraNormalizedError)
);
}
this.status = this.msg.couldNotLoad;
this.movimentosCaixaDia = [];
return;
}
this.movimentosCaixaDia = response.data ?? [];
this.status = '';
}
}

// ── action methods (one per write routine) ──
async abrirCaixa(
params: Record<string, unknown>,
signal?: AbortSignal,
): Promise<void> {
const options: BffClientOptions | undefined = signal ? { signal, mode: 'blocking' } : { mode: 'blocking' };

if ((window as any).mls) {
console.log('[mls mock] pizzaria.abrirCaixa', params);
this.status = this.msg.savedSuccessfully;
await this.loadInitialData(undefined, { mode: 'silent' });
return;
}

const response = await execBff<{ ok: boolean }>('pizzaria.abrirCaixa', params, options);
if (!response.ok) {
throw (
response.error ??
({
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotSave,
} satisfies AuraNormalizedError)
);
}
this.status = this.msg.savedSuccessfully;
await this.loadInitialData(undefined, { mode: 'silent' });
}

async registrarSangria(
params: Record<string, unknown>,
signal?: AbortSignal,
): Promise<void> {
const options: BffClientOptions | undefined = signal ? { signal, mode: 'blocking' } : { mode: 'blocking' };

if ((window as any).mls) {
console.log('[mls mock] pizzaria.registrarSangria', params);
this.status = this.msg.savedSuccessfully;
await this.loadInitialData(undefined, { mode: 'silent' });
return;
}

const response = await execBff<{ ok: boolean }>('pizzaria.registrarSangria', params, options);
if (!response.ok) {
throw (
response.error ??
({
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotSave,
} satisfies AuraNormalizedError)
);
}
this.status = this.msg.savedSuccessfully;
await this.loadInitialData(undefined, { mode: 'silent' });
}

async fecharCaixa(
params: Record<string, unknown>,
signal?: AbortSignal,
): Promise<void> {
const options: BffClientOptions | undefined = signal ? { signal, mode: 'blocking' } : { mode: 'blocking' };

if ((window as any).mls) {
console.log('[mls mock] pizzaria.fecharCaixa', params);
this.status = this.msg.savedSuccessfully;
await this.loadInitialData(undefined, { mode: 'silent' });
return;
}

const response = await execBff<{ ok: boolean }>('pizzaria.fecharCaixa', params, options);
if (!response.ok) {
throw (
response.error ??
({
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotSave,
} satisfies AuraNormalizedError)
);
}
this.status = this.msg.savedSuccessfully;
await this.loadInitialData(undefined, { mode: 'silent' });
}

// ── form submit handlers (one per write routine that originates from a form) ──
handleAbrirCaixaSubmit(event: SubmitEvent) {
event.preventDefault();
const form = event.target as HTMLFormElement;
const fd = new FormData(form);
const params = Object.fromEntries(fd.entries());

void runBlockingUiAction(
async (signal: AbortSignal) => {
await this.abrirCaixa(params, signal);
},
{
busyLabel: this.msg.saving,
errorTitle: this.msg.couldNotSave,
retry: () => this.abrirCaixa(params),
},
);
}

handleRegistrarSangriaSubmit(event: SubmitEvent) {
event.preventDefault();
const form = event.target as HTMLFormElement;
const fd = new FormData(form);
const params = Object.fromEntries(fd.entries());

void runBlockingUiAction(
async (signal: AbortSignal) => {
await this.registrarSangria(params, signal);
},
{
busyLabel: this.msg.saving,
errorTitle: this.msg.couldNotSave,
retry: () => this.registrarSangria(params),
},
);
}

handleFecharCaixaSubmit(event: SubmitEvent) {
event.preventDefault();
const form = event.target as HTMLFormElement;
const fd = new FormData(form);
const params = Object.fromEntries(fd.entries());

void runBlockingUiAction(
async (signal: AbortSignal) => {
await this.fecharCaixa(params, signal);
},
{
busyLabel: this.msg.saving,
errorTitle: this.msg.couldNotSave,
retry: () => this.fecharCaixa(params),
},
);
}
}

/// <mls fileReference="_102035_/l2/pizzaria/web/shared/customerEditor.ts" enhancement="_blank" />

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import type { AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import {
bindExpectedNavigationLoad,
consumeExpectedNavigationLoad,
runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import type {
PizzariaCustomer,
PizzariaCustomerOrderHistory,
PizzariaUpdateCustomerParams,
} from '_102035_/l1/pizzaria/module.js';

/// **collab_i18n_start**
const message_pt = {
brand: 'Pizzaria',
pageTitle: 'customerEditor',
pageSubtitle: 'Cadastrar e atualizar clientes com historico de pedidos para uso interno.',
loadingCustomer: 'Carregando cliente...',
loadingCustomerHistory: 'Carregando historico...',
couldNotLoad: 'Nao foi possivel carregar os dados.',
couldNotSave: 'Nao foi possivel salvar.',
savedSuccessfully: 'Salvo com sucesso.',
itemsAvailable: 'itens disponiveis',
statusReady: 'Pronto.',
reload: 'Recarregar',
save: 'Salvar',
saving: 'Salvando...',
confirm: 'Confirmar',
confirming: 'Confirmando...',
customerId: 'Codigo do cliente',
name: 'Nome',
phone: 'Telefone',
notes: 'Observacoes',
orderId: 'Pedido',
orderDate: 'Data do pedido',
};
const message_en = {
brand: 'Pizzaria',
pageTitle: 'customerEditor',
pageSubtitle: 'Create and update customers with order history for internal use.',
loadingCustomer: 'Loading customer...',
loadingCustomerHistory: 'Loading history...',
couldNotLoad: 'Could not load data.',
couldNotSave: 'Could not save.',
savedSuccessfully: 'Saved successfully.',
itemsAvailable: 'items available',
statusReady: 'Ready.',
reload: 'Reload',
save: 'Save',
saving: 'Saving...',
confirm: 'Confirm',
confirming: 'Confirming...',
customerId: 'Customer ID',
name: 'Name',
phone: 'Phone',
notes: 'Notes',
orderId: 'Order',
orderDate: 'Order date',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PizzariaCustomerEditorBase extends CollabLitElement {
static properties = {
customerDetail: { state: true },
customerOrderHistory: { state: true },
status: { state: true },
};

declare customerDetail: PizzariaCustomer | undefined;
declare customerOrderHistory: PizzariaCustomerOrderHistory[];
declare status: string;

protected msg: MessageType = messages['en'];

constructor() {
super();
this.customerDetail = undefined;
this.customerOrderHistory = [];
this.status = '';
}

createRenderRoot() {
return this;
}

connectedCallback() {
super.connectedCallback();
const pendingLoad = consumeExpectedNavigationLoad();
const task = this.loadInitialData(undefined, {
mode: pendingLoad ? 'blocking' : 'silent',
signal: pendingLoad?.signal,
});
bindExpectedNavigationLoad(pendingLoad, task);
void task.catch(() => undefined);
const lang: string = this.getMessageKey(messages);
this.msg = messages[lang] || messages['en'];
}

protected async loadInitialData(
params?: { customerId?: string },
options?: BffClientOptions,
): Promise<void> {
// Load customer first; if we have an id, also load history.
await this.loadGetCustomer(params, options);
const customerId = params?.customerId ?? this.customerDetail?.customerId;
if (customerId) {
await this.loadViewCustomerHistory({ customerId }, options);
}
}

// ── load methods (one per read routine) ──
async loadGetCustomer(
params?: { customerId?: string },
options?: BffClientOptions,
): Promise<void> {
this.status = this.msg.loadingCustomer;

if ((window as any).mls) {
this.customerDetail = {
customerId: params?.customerId ?? 'C-1001',
name: 'Joao Silva',
phone: '(11) 98888-7777',
notes: 'Prefere borda recheada e sem cebola.',
};
this.status = this.msg.statusReady;
return;
} else {
const response = await execBff<PizzariaCustomer>(
'customerManagement.getCustomer',
params,
options,
);
if (!response.ok || !response.data) {
if (options?.mode === 'blocking') {
throw (
response.error ?? {
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotLoad,
}
) satisfies AuraNormalizedError;
}
this.status = this.msg.couldNotLoad;
this.customerDetail = undefined;
return;
}
this.customerDetail = response.data ?? undefined;
this.status = this.msg.statusReady;
}
}

async loadViewCustomerHistory(
params?: { customerId?: string },
options?: BffClientOptions,
): Promise<void> {
this.status = this.msg.loadingCustomerHistory;

if ((window as any).mls) {
const cid = params?.customerId ?? this.customerDetail?.customerId ?? 'C-1001';
this.customerOrderHistory = [
{ customerId: cid, orderId: 'P-89321', orderDate: '2026-05-02T19:21:00Z' },
{ customerId: cid, orderId: 'P-89388', orderDate: '2026-05-10T20:05:00Z' },
{ customerId: cid, orderId: 'P-89410', orderDate: '2026-05-18T18:47:00Z' },
];
this.status = `${this.customerOrderHistory.length} ${this.msg.itemsAvailable}`;
return;
} else {
const response = await execBff<PizzariaCustomerOrderHistory[]>(
'customerManagement.viewCustomerHistory',
params,
options,
);
if (!response.ok || !response.data) {
if (options?.mode === 'blocking') {
throw (
response.error ?? {
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotLoad,
}
) satisfies AuraNormalizedError;
}
this.status = this.msg.couldNotLoad;
this.customerOrderHistory = [];
return;
}
this.customerOrderHistory = response.data ?? [];
this.status = `${this.customerOrderHistory.length} ${this.msg.itemsAvailable}`;
}
}

// ── action methods (one per write routine) ──
async save(
params: PizzariaUpdateCustomerParams,
signal?: AbortSignal,
): Promise<void> {
if ((window as any).mls) {
console.log('[mls mock] customerManagement.updateCustomer', params);
this.status = this.msg.savedSuccessfully;
// Refresh local mock state
this.customerDetail = {
customerId: params.customerId,
name: params.name ?? this.customerDetail?.name ?? 'Maria Oliveira',
phone: params.phone ?? this.customerDetail?.phone ?? '(21) 97777-6666',
notes: params.notes ?? this.customerDetail?.notes,
};
return;
}

const response = await execBff<unknown>(
'customerManagement.updateCustomer',
params,
{ mode: 'silent', signal },
);

if (!response.ok) {
throw (
response.error ?? {
code: 'UNEXPECTED_ERROR',
message: this.msg.couldNotSave,
}
) satisfies AuraNormalizedError;
}

this.status = this.msg.savedSuccessfully;
await this.loadGetCustomer({ customerId: params.customerId }, { mode: 'silent', signal });
await this.loadViewCustomerHistory(
{ customerId: params.customerId },
{ mode: 'silent', signal },
);
}

// ── form submit handlers (one per write routine that originates from a form) ──
handleSaveSubmit(event: SubmitEvent) {
event.preventDefault();

const form = event.currentTarget as HTMLFormElement | null;
const fd = new FormData(form ?? undefined);

const params: PizzariaUpdateCustomerParams = {
customerId:
(String(fd.get('customerId') ?? this.customerDetail?.customerId ?? '') || '').trim(),
name: String(fd.get('name') ?? '').trim() || undefined,
phone: String(fd.get('phone') ?? '').trim() || undefined,
notes: String(fd.get('notes') ?? '').trim() || undefined,
};

void runBlockingUiAction(
async (signal: AbortSignal) => {
await this.save(params, signal);
},
{
busyLabel: this.msg.saving,
errorTitle: this.msg.couldNotSave,
retry: () => this.save(params),
},
);
}
}

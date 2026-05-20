/// <mls fileReference="_102035_/l2/pizzaria/web/desktop/page11/customerEditor.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PizzariaCustomerEditorBase } from '/_102035_/l2/pizzaria/web/shared/customerEditor.js';

@customElement('pizzaria--web--desktop--page11--customer-editor-102035')
export class PizzariaWebDesktopCustomerEditorPage extends PizzariaCustomerEditorBase {
  render() {
    const customer = this.customerDetail;
    const history = this.customerOrderHistory ?? [];

    return html`
      <div class="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
        <header class="border-b border-zinc-200 bg-white/80 backdrop-blur">
          <div class="mx-auto max-w-7xl px-6 py-5">
            <div class="flex flex-col gap-1">
              <div class="text-sm font-semibold tracking-wide text-zinc-500">${this.msg.brand}</div>
              <div class="text-2xl font-semibold text-zinc-900">${this.msg.pageTitle}</div>
              <div class="text-sm text-zinc-600">${this.msg.pageSubtitle}</div>
            </div>

            <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <div class="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                <div class="text-sm text-zinc-700">${this.status}</div>
              </div>

              <div class="flex items-center gap-2">
                <button
                  class="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50"
                  @click=${() => this.loadInitialData({ customerId: this.customerDetail?.customerId }, { mode: 'blocking' })}
                  type="button"
                >
                  ${this.msg.reload}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-12">
          <section class="lg:col-span-8">
            <div class="rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div class="border-b border-zinc-200 px-5 py-4">
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div class="text-lg font-semibold text-zinc-900">${this.msg.pageTitle}</div>
                    <div class="mt-1 text-sm text-zinc-600">${this.msg.customerId}: ${customer?.customerId ?? ''}</div>
                  </div>
                </div>
              </div>

              <form class="px-5 py-5" @submit=${this.handleSaveSubmit}>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label class="block">
                    <div class="text-sm font-medium text-zinc-800">${this.msg.customerId}</div>
                    <input
                      class="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 shadow-sm"
                      name="customerId"
                      .value=${customer?.customerId ?? ''}
                      readonly
                    />
                  </label>

                  <div class="hidden md:block"></div>

                  <label class="block">
                    <div class="text-sm font-medium text-zinc-800">${this.msg.name}</div>
                    <input
                      class="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                      name="name"
                      .value=${customer?.name ?? ''}
                      autocomplete="off"
                    />
                  </label>

                  <label class="block">
                    <div class="text-sm font-medium text-zinc-800">${this.msg.phone}</div>
                    <input
                      class="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                      name="phone"
                      .value=${customer?.phone ?? ''}
                      autocomplete="off"
                    />
                  </label>

                  <label class="block md:col-span-2">
                    <div class="text-sm font-medium text-zinc-800">${this.msg.notes}</div>
                    <textarea
                      class="mt-1 min-h-[96px] w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                      name="notes"
                    >${customer?.notes ?? ''}</textarea>
                  </label>
                </div>

                <div class="mt-5 flex flex-wrap items-center justify-end gap-2">
                  <button
                    class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
                    type="submit"
                  >
                    ${this.msg.save}
                  </button>
                </div>
              </form>
            </div>

            <div class="mt-6 rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div class="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
                <div>
                  <div class="text-lg font-semibold text-zinc-900">${this.msg.loadingCustomerHistory}</div>
                  <div class="mt-1 text-sm text-zinc-600">${history.length} ${this.msg.itemsAvailable}</div>
                </div>
                <button
                  class="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50"
                  @click=${() => this.loadViewCustomerHistory({ customerId: this.customerDetail?.customerId }, { mode: 'blocking' })}
                  type="button"
                >
                  ${this.msg.reload}
                </button>
              </div>

              <div class="px-2 py-2">
                <div class="overflow-hidden rounded-xl border border-zinc-200">
                  <div class="grid grid-cols-12 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                    <div class="col-span-4">${this.msg.orderId}</div>
                    <div class="col-span-4">${this.msg.orderDate}</div>
                    <div class="col-span-4">${this.msg.customerId}</div>
                  </div>
                  <div class="divide-y divide-zinc-200">
                    ${(history ?? []).map((item) => html`
                      <div class="grid grid-cols-12 px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-50">
                        <div class="col-span-4 font-medium text-zinc-900">${item.orderId}</div>
                        <div class="col-span-4 text-zinc-700">${item.orderDate}</div>
                        <div class="col-span-4 text-zinc-700">${item.customerId}</div>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside class="lg:col-span-4">
            <div class="sticky top-6 space-y-6">
              <div class="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div class="text-sm font-semibold text-zinc-900">${this.msg.confirm}</div>
                <div class="mt-3 space-y-3">
                  <div class="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <div class="text-xs font-semibold uppercase tracking-wide text-zinc-600">${this.msg.customerId}</div>
                    <div class="mt-1 text-sm font-medium text-zinc-900">${customer?.customerId ?? ''}</div>
                  </div>

                  <div class="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <div class="text-xs font-semibold uppercase tracking-wide text-zinc-600">${this.msg.name}</div>
                    <div class="mt-1 text-sm font-medium text-zinc-900">${customer?.name ?? ''}</div>
                  </div>

                  <div class="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <div class="text-xs font-semibold uppercase tracking-wide text-zinc-600">${this.msg.phone}</div>
                    <div class="mt-1 text-sm font-medium text-zinc-900">${customer?.phone ?? ''}</div>
                  </div>
                </div>

                <div class="mt-5">
                  <button
                    class="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
                    type="button"
                    @click=${() => {
                      const form = this.querySelector('form');
                      if (form) {
                        (form as HTMLFormElement).requestSubmit();
                      }
                    }}
                  >
                    ${this.msg.save}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    `;
  }
}

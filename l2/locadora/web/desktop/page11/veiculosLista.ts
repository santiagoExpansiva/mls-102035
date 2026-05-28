/// <mls fileReference="_102035_/l2/locadora/web/desktop/page11/veiculosLista.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LocadoraVeiculosListaBase } from '/_102035_/l2/locadora/web/shared/veiculosLista.js';

@customElement('locadora--web--desktop--page11--veiculos-lista-102035')
export class LocadoraWebDesktopVeiculosListaPage extends LocadoraVeiculosListaBase {
  render() {
    const currentStatus = 'todos';

    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <header class="border-b border-slate-200 bg-white">
          <div class="mx-auto max-w-6xl px-6 py-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div class="min-w-0">
                <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 truncate text-2xl font-semibold text-slate-900">${this.msg.pageTitle}</h1>
                <p class="mt-1 text-sm text-slate-600">${this.msg.pageSubtitle}</p>
              </div>

              <div class="flex items-center gap-2">
                <div class="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700" aria-live="polite">${this.status}</div>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  @click=${this.handleReloadClick}
                >
                  ${this.msg.reload}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto max-w-6xl px-6 py-6">
          <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-200 px-5 py-4">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div class="text-sm font-semibold text-slate-900">${this.msg.filterStatus}</div>

                <div class="flex flex-wrap gap-2">
                  ${[
                    { id: 'todos', label: 'todos' },
                    { id: 'disponível', label: 'disponível' },
                    { id: 'locado', label: 'locado' },
                    { id: 'manutenção', label: 'manutenção' },
                  ].map((opt) => {
                    const active = String(currentStatus) === opt.id;
                    return html`
                      <button
                        type="button"
                        class=${[
                          'rounded-full px-3 py-1.5 text-sm font-medium transition',
                          active
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
                        ].join(' ')}
                        @click=${() => {
                          (this as any).setState?.('ui.veiculosLista.filter.status', opt.id);
                          void this.loadListVeiculos({ status: opt.id });
                        }}
                      >
                        ${opt.label}
                      </button>
                    `;
                  })}
                </div>
              </div>
            </div>

            <div class="px-5 py-4">
              <div class="overflow-hidden rounded-md border border-slate-200">
                <div class="grid grid-cols-12 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <div class="col-span-2">${this.msg.placa}</div>
                  <div class="col-span-3">${this.msg.modelo}</div>
                  <div class="col-span-1">${this.msg.ano}</div>
                  <div class="col-span-2">${this.msg.categoria}</div>
                  <div class="col-span-2">${this.msg.status}</div>
                  <div class="col-span-2 text-right">${this.msg.quilometragem}</div>
                </div>

                <div class="divide-y divide-slate-200">
                  ${(this.veiculo ?? []).map((item: any) => html`
                    <button
                      type="button"
                      class="grid w-full grid-cols-12 items-center px-3 py-3 text-left text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      @click=${() => {
                        // event declared: veiculosLista.itemSelected (no base handler/state writer specified)
                        this.dispatchEvent(new CustomEvent('veiculosLista.itemSelected', { detail: { placa: item?.placa } }));
                      }}
                    >
                      <div class="col-span-2 font-mono text-slate-900">${item?.placa ?? ''}</div>
                      <div class="col-span-3 text-slate-900">${item?.modelo ?? ''}</div>
                      <div class="col-span-1 text-slate-700">${item?.ano ?? ''}</div>
                      <div class="col-span-2 text-slate-700">${item?.categoria ?? ''}</div>
                      <div class="col-span-2">
                        <span class="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800">${item?.status ?? ''}</span>
                      </div>
                      <div class="col-span-2 text-right tabular-nums text-slate-700">${item?.quilometragem ?? ''}</div>
                    </button>
                  `)}

                  ${(this.veiculo ?? []).length === 0
                    ? html`
                        <div class="px-3 py-10 text-center text-sm text-slate-600">${this.msg.couldNotLoad}</div>
                      `
                    : null}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;
  }
}

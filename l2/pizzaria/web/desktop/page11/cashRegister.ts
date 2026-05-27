/// <mls fileReference="_102035_/l2/pizzaria/web/desktop/page11/cashRegister.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PizzariaCashRegisterBase } from '/_102035_/l2/pizzaria/web/shared/cashRegister.js';

@customElement('pizzaria--web--desktop--page11--cash-register-102035')
export class PizzariaWebDesktopCashRegisterPage extends PizzariaCashRegisterBase {
  render() {
    const caixa = this.caixaDia;
    const movimentos = this.movimentosCaixaDia ?? [];

    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <div class="mx-auto max-w-7xl px-6 py-6">
          <header class="flex flex-wrap items-start justify-between gap-4">
            <div class="min-w-[16rem]">
              <div class="text-xs font-semibold tracking-wide text-slate-500">${this.msg.brand}</div>
              <h1 class="mt-1 text-2xl font-semibold leading-tight text-slate-900">${this.msg.pageTitle}</h1>
              <p class="mt-1 text-sm text-slate-600">${this.msg.pageSubtitle}</p>
            </div>

            <div class="flex items-center gap-3">
              <button
                class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                @click=${() => this.loadInitialData(undefined, { mode: 'blocking' })}
                type="button"
              >
                ${this.msg.reload}
              </button>
            </div>
          </header>

          <div class="mt-4">
            ${this.status
              ? html`<div class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                  ${this.status}
                </div>`
              : html``}
          </div>

          <main class="mt-6 grid grid-cols-12 gap-6">
            <section class="col-span-12 lg:col-span-5">
              <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="border-b border-slate-200 px-5 py-4">
                  <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                  <div class="mt-1 text-xs text-slate-500">${this.msg.loadingCaixaDia}</div>
                </div>

                <div class="px-5 py-5">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="rounded-xl bg-slate-50 px-4 py-3">
                      <div class="text-xs font-medium text-slate-500">${this.msg.fieldData}</div>
                      <div class="mt-1 text-sm font-semibold text-slate-900">${caixa?.data ?? ''}</div>
                    </div>

                    <div class="rounded-xl bg-slate-50 px-4 py-3">
                      <div class="text-xs font-medium text-slate-500">${this.msg.fieldStatus}</div>
                      <div class="mt-1 text-sm font-semibold text-slate-900">${caixa?.status ?? ''}</div>
                    </div>

                    <div class="rounded-xl bg-slate-50 px-4 py-3">
                      <div class="text-xs font-medium text-slate-500">${this.msg.fieldValorAbertura}</div>
                      <div class="mt-1 text-sm font-semibold tabular-nums text-slate-900">${caixa?.valorAbertura ?? ''}</div>
                    </div>

                    <div class="rounded-xl bg-slate-50 px-4 py-3">
                      <div class="text-xs font-medium text-slate-500">${this.msg.fieldValorFechamento}</div>
                      <div class="mt-1 text-sm font-semibold tabular-nums text-slate-900">${caixa?.valorFechamento ?? ''}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="border-b border-slate-200 px-5 py-4">
                  <div class="text-sm font-semibold text-slate-900">${this.msg.confirm}</div>
                  <div class="mt-1 text-xs text-slate-500">${this.msg.save}</div>
                </div>

                <div class="grid gap-5 px-5 py-5">
                  <form class="grid gap-3" @submit=${this.handleAbrirCaixaSubmit}>
                    <div class="grid gap-2">
                      <label class="text-xs font-medium text-slate-600">${this.msg.fieldValorAbertura}</label>
                      <input
                        name="valorAbertura"
                        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-400"
                        inputmode="decimal"
                      />
                    </div>
                    <button
                      class="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                      type="submit"
                    >
                      ${this.msg.save}
                    </button>
                  </form>

                  <div class="h-px bg-slate-100"></div>

                  <form class="grid gap-3" @submit=${this.handleRegistrarSangriaSubmit}>
                    <div class="grid gap-2">
                      <label class="text-xs font-medium text-slate-600">${this.msg.fieldTipo}</label>
                      <select
                        name="tipo"
                        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-400"
                      >
                        <option value="entrada">entrada</option>
                        <option value="sangria">sangria</option>
                      </select>
                    </div>

                    <div class="grid gap-2">
                      <label class="text-xs font-medium text-slate-600">${this.msg.fieldValor}</label>
                      <input
                        name="valor"
                        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-400"
                        inputmode="decimal"
                      />
                    </div>

                    <div class="grid gap-2">
                      <label class="text-xs font-medium text-slate-600">${this.msg.fieldObservacao}</label>
                      <input
                        name="observacao"
                        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-400"
                      />
                    </div>

                    

                    <button
                      class="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                      type="submit"
                    >
                      ${this.msg.save}
                    </button>
                  </form>

                  <div class="h-px bg-slate-100"></div>

                  <form class="grid gap-3" @submit=${this.handleFecharCaixaSubmit}>
                    <div class="grid gap-2">
                      <label class="text-xs font-medium text-slate-600">${this.msg.fieldValorFechamento}</label>
                      <input
                        name="valorFechamento"
                        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-400"
                        inputmode="decimal"
                      />
                    </div>

                  

                    <button
                      class="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                      type="submit"
                    >
                      ${this.msg.confirm}
                    </button>
                  </form>
                </div>
              </div>
            </section>

            <section class="col-span-12 lg:col-span-7">
              <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                  <div>
                    <div class="text-sm font-semibold text-slate-900">${this.msg.loadingMovimentosCaixaDia}</div>
                    <div class="mt-1 text-xs text-slate-500">${this.msg.fieldData}</div>
                  </div>

                  <button
                    class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    @click=${() => this.loadListMovimentosCaixaDia(undefined, { mode: 'blocking' })}
                    type="button"
                  >
                    ${this.msg.reload}
                  </button>
                </div>

                <div class="overflow-hidden">
                  <div class="grid grid-cols-12 gap-0 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <div class="col-span-5">${this.msg.fieldData}</div>
                    <div class="col-span-3">${this.msg.fieldTipo}</div>
                    <div class="col-span-2 text-right">${this.msg.fieldValor}</div>
                    <div class="col-span-2">${this.msg.fieldObservacao}</div>
                  </div>

                  <div class="divide-y divide-slate-100">
                    ${(movimentos ?? []).map(
                      (m) => html`
                        <div class="grid grid-cols-12 items-center gap-0 px-5 py-3 text-sm hover:bg-slate-50">
                          <div class="col-span-5 font-medium text-slate-800">${m.dataHora ?? ''}</div>
                          <div class="col-span-3 text-slate-700">${m.tipo ?? ''}</div>
                          <div class="col-span-2 text-right font-semibold tabular-nums text-slate-900">${m.valor ?? ''}</div>
                          <div class="col-span-2 text-slate-600">${m.observacao ?? ''}</div>
                        </div>
                      `,
                    )}
                  </div>

                  ${movimentos.length === 0
                    ? html`<div class="px-5 py-10 text-center text-sm text-slate-500">${this.msg.couldNotLoad}</div>`
                    : html``}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
  }
}

/// <mls fileReference="_102035_/l2/locadora/web/desktop/page11/veiculosCadastro.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LocadoraVeiculosCadastroBase } from '/_102035_/l2/locadora/web/shared/veiculosCadastro.js';

@customElement('locadora--web--desktop--page11--veiculos-cadastro-102035')
export class LocadoraWebDesktopVeiculosCadastroPage extends LocadoraVeiculosCadastroBase {
  render() {
    const errors = this.formErrors ?? {};

    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <div class="mx-auto max-w-5xl px-6 py-8">
          <header class="flex flex-col gap-2">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 text-2xl font-semibold tracking-tight text-slate-900">${this.msg.pageTitle}</h1>
                <p class="mt-1 text-sm text-slate-600">${this.msg.pageSubtitle}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                  @click=${() => this.loadGetStatusVeiculoOptions(undefined, { mode: 'silent' })}
                >
                  ${this.msg.reload}
                </button>
              </div>
            </div>

            ${this.status
        ? html`
                  <div class="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                    ${this.status}
                  </div>
                `
        : html``}
          </header>

          <main class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section class="lg:col-span-2">
              <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div class="border-b border-slate-200 px-5 py-4">
                  <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                  <div class="mt-1 text-xs text-slate-500">${this.msg.pageSubtitle}</div>
                </div>

                <form class="px-5 py-5" @submit=${this.handleSaveSubmit}>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <label class="block text-xs font-medium text-slate-700" for="placa">${this.msg.placa}</label>
                      <input
                        id="placa"
                        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        .value=${this.placa ?? ''}
                        @input=${(e: Event) => {
        this.placa = (e.target as HTMLInputElement).value;
        this.formDirty = true;
      }}
                      />
                      ${errors['placa']
        ? html`<div class="mt-1 text-xs text-rose-700">${errors['placa']}</div>`
        : html``}
                    </div>

                    <div class="sm:col-span-1">
                      <label class="block text-xs font-medium text-slate-700" for="modelo">${this.msg.modelo}</label>
                      <input
                        id="modelo"
                        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        .value=${this.modelo ?? ''}
                        @input=${(e: Event) => {
        this.modelo = (e.target as HTMLInputElement).value;
        this.formDirty = true;
      }}
                      />
                      ${errors['modelo']
        ? html`<div class="mt-1 text-xs text-rose-700">${errors['modelo']}</div>`
        : html``}
                    </div>

                    <div class="sm:col-span-1">
                      <label class="block text-xs font-medium text-slate-700" for="ano">${this.msg.ano}</label>
                      <input
                        id="ano"
                        type="number"
                        inputmode="numeric"
                        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        .value=${this.ano ?? ('' as any)}
                        @input=${(e: Event) => {
        const v = (e.target as HTMLInputElement).value;
        this.ano = v === '' ? undefined : Number(v);
        this.formDirty = true;
      }}
                      />
                      ${errors['ano']
        ? html`<div class="mt-1 text-xs text-rose-700">${errors['ano']}</div>`
        : html``}
                    </div>

                    <div class="sm:col-span-1">
                      <label class="block text-xs font-medium text-slate-700" for="categoria">${this.msg.categoria}</label>
                      <input
                        id="categoria"
                        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        .value=${this.categoria ?? ''}
                        @input=${(e: Event) => {
        this.categoria = (e.target as HTMLInputElement).value;
        this.formDirty = true;
      }}
                      />
                      ${errors['categoria']
        ? html`<div class="mt-1 text-xs text-rose-700">${errors['categoria']}</div>`
        : html``}
                    </div>

                    <div class="sm:col-span-1">
                      <label class="block text-xs font-medium text-slate-700" for="status">${this.msg.status}</label>
                      <select
                        id="status"
                        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        .value=${this.statusVeiculo ?? ''}
                        @change=${(e: Event) => {
        this.statusVeiculo = (e.target as HTMLSelectElement).value;
        this.formDirty = true;
      }}
                      >
                        ${(this.statusVeiculoOptions ?? []).map(
        (opt) => html`<option value=${opt} ?selected=${(this.statusVeiculo ?? '') === opt}>${opt}</option>`,
      )}
                      </select>
                      ${errors['status']
        ? html`<div class="mt-1 text-xs text-rose-700">${errors['status']}</div>`
        : html``}
                    </div>

                    <div class="sm:col-span-1">
                      <label class="block text-xs font-medium text-slate-700" for="quilometragem">${this.msg.quilometragem}</label>
                      <input
                        id="quilometragem"
                        type="number"
                        inputmode="numeric"
                        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                        .value=${this.quilometragem ?? ('' as any)}
                        @input=${(e: Event) => {
        const v = (e.target as HTMLInputElement).value;
        this.quilometragem = v === '' ? undefined : Number(v);
        this.formDirty = true;
      }}
                      />
                      ${errors['quilometragem']
        ? html`<div class="mt-1 text-xs text-rose-700">${errors['quilometragem']}</div>`
        : html``}
                    </div>
                  </div>

                  <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div class="text-xs text-slate-500">
                      ${this.formDirty ? this.status : ''}
                    </div>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                      ${this.msg.save}
                    </button>
                  </div>
                </form>
              </div>
            </section>

            <aside class="lg:col-span-1">
              <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="text-sm font-semibold text-slate-900">${this.msg.status}</div>
                    <div class="mt-1 text-xs text-slate-500">${this.msg.loadingStatusVeiculoOptions}</div>
                  </div>
                </div>

                <div class="mt-4">
                  <div class="flex flex-wrap gap-2">
                    ${(this.statusVeiculoOptions ?? []).map(
          (opt) => html`
                        <button
                          type="button"
                          class=${(this.statusVeiculo ?? '') === opt
              ? 'rounded-full border border-slate-900 bg-slate-900 px-3 py-1 text-xs font-medium text-white'
              : 'rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50'}
                          @click=${() => {
              this.statusVeiculo = opt;
              this.formDirty = true;
            }}
                        >
                          ${opt}
                        </button>
                      `,
        )}
                  </div>

                  <div class="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                    <div class="text-xs font-medium text-slate-700">${this.msg.status}</div>
                    <div class="mt-1 text-sm text-slate-900">${this.statusVeiculo ?? ''}</div>
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    `;
  }
}

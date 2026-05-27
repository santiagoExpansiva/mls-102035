/// <mls fileReference="_102035_/l1/pizzaria/layer_2_controllers/cashRegister.ts" enhancement="_blank" />

import { PizzariaCaixa, PizzariaMovimentoCaixa, PizzariaUpdateCaixaParams, PizzariaUpdateMovimentoCaixaParams } from "/_102035_/l2/pizzaria/web/contracts/cashRegister.js";
import { AppError, ok, type BffHandler, type RequestContext } from "/_102034_/l1/server/layer_2_controllers/contracts.js";

async function getCaixaRepository(ctx: RequestContext) {
  return ctx.data.moduleData.getTable<PizzariaCaixa>("pizzariaCaixa");
}

async function getMovimentoCaixaRepository(ctx: RequestContext) {
  return ctx.data.moduleData.getTable<PizzariaMovimentoCaixa>("pizzariaMovimentoCaixa");
}

export async function getCaixaDia(ctx: RequestContext, input?: { data?: string }): Promise<PizzariaCaixa[]> {
  const repo = await getCaixaRepository(ctx);
  let rows = await repo.findMany();
  if (input?.data !== undefined) {
    rows = rows.filter((item: PizzariaCaixa) => item.data === input.data);
  }
  return rows;
}

export async function listMovimentosCaixaDia(ctx: RequestContext, input?: { data?: string }): Promise<PizzariaMovimentoCaixa[]> {
  const repo = await getMovimentoCaixaRepository(ctx);
  let rows = await repo.findMany();
  if (input?.data !== undefined) {
    rows = rows.filter((item: PizzariaMovimentoCaixa) => item.dataHora === input.data);
  }
  return rows;
}

export async function openState(ctx: RequestContext, input: PizzariaUpdateCaixaParams): Promise<PizzariaCaixa> {
  const repo = await getCaixaRepository(ctx);
  const existing = await repo.findOne({ where: { data: input.data } });
  if (!existing) throw new AppError("NOT_FOUND", "Caixa not found", 404);
  const merged: PizzariaCaixa = {
    ...existing,
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.valorAbertura !== undefined ? { valorAbertura: input.valorAbertura } : {}),
    ...(input.valorFechamento !== undefined ? { valorFechamento: input.valorFechamento } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function sangriaState(ctx: RequestContext, input: PizzariaUpdateMovimentoCaixaParams): Promise<PizzariaMovimentoCaixa> {
  const repo = await getMovimentoCaixaRepository(ctx);
  const existing = await repo.findOne({ where: { dataHora: input.dataHora } });
  if (!existing) throw new AppError("NOT_FOUND", "MovimentoCaixa not found", 404);
  const merged: PizzariaMovimentoCaixa = {
    ...existing,
    ...(input.tipo !== undefined ? { tipo: input.tipo } : {}),
    ...(input.valor !== undefined ? { valor: input.valor } : {}),
    ...(input.observacao !== undefined ? { observacao: input.observacao } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function closeState(ctx: RequestContext, input: PizzariaUpdateCaixaParams): Promise<PizzariaCaixa> {
  const repo = await getCaixaRepository(ctx);
  const existing = await repo.findOne({ where: { data: input.data } });
  if (!existing) throw new AppError("NOT_FOUND", "Caixa not found", 404);
  const merged: PizzariaCaixa = {
    ...existing,
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.valorAbertura !== undefined ? { valorAbertura: input.valorAbertura } : {}),
    ...(input.valorFechamento !== undefined ? { valorFechamento: input.valorFechamento } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function loadState(ctx: RequestContext, input: PizzariaUpdateCaixaParams): Promise<PizzariaCaixa> {
  const repo = await getCaixaRepository(ctx);
  const existing = await repo.findOne({ where: { data: input.data } });
  if (!existing) throw new AppError("NOT_FOUND", "Caixa not found", 404);
  const merged: PizzariaCaixa = {
    ...existing,
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.valorAbertura !== undefined ? { valorAbertura: input.valorAbertura } : {}),
    ...(input.valorFechamento !== undefined ? { valorFechamento: input.valorFechamento } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function refreshState(ctx: RequestContext, input: PizzariaUpdateCaixaParams): Promise<PizzariaCaixa> {
  const repo = await getCaixaRepository(ctx);
  const existing = await repo.findOne({ where: { data: input.data } });
  if (!existing) throw new AppError("NOT_FOUND", "Caixa not found", 404);
  const merged: PizzariaCaixa = {
    ...existing,
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.valorAbertura !== undefined ? { valorAbertura: input.valorAbertura } : {}),
    ...(input.valorFechamento !== undefined ? { valorFechamento: input.valorFechamento } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export const cashRegisterGetCaixaDiaHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await getCaixaDia(ctx, {
    data: typeof params.data === "string" ? params.data : undefined
  }));
};

export const cashRegisterListMovimentosCaixaDiaHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await listMovimentosCaixaDia(ctx, {
    data: typeof params.data === "string" ? params.data : undefined
  }));
};

export const cashRegisterOpenStateHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await openState(ctx, {
    data: typeof params.data === "string" ? params.data : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    valorAbertura: typeof params.valorAbertura === "number" ? params.valorAbertura : undefined,
    valorFechamento: typeof params.valorFechamento === "number" ? params.valorFechamento : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCaixaParams));
};

export const cashRegisterSangriaStateHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await sangriaState(ctx, {
    dataHora: typeof params.dataHora === "string" ? params.dataHora : undefined,
    tipo: typeof params.tipo === "string" ? params.tipo : undefined,
    valor: typeof params.valor === "number" ? params.valor : undefined,
    observacao: typeof params.observacao === "string" ? params.observacao : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateMovimentoCaixaParams));
};

export const cashRegisterCloseStateHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await closeState(ctx, {
    data: typeof params.data === "string" ? params.data : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    valorAbertura: typeof params.valorAbertura === "number" ? params.valorAbertura : undefined,
    valorFechamento: typeof params.valorFechamento === "number" ? params.valorFechamento : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCaixaParams));
};

export const cashRegisterLoadStateHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await loadState(ctx, {
    data: typeof params.data === "string" ? params.data : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    valorAbertura: typeof params.valorAbertura === "number" ? params.valorAbertura : undefined,
    valorFechamento: typeof params.valorFechamento === "number" ? params.valorFechamento : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCaixaParams));
};

export const cashRegisterRefreshStateHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await refreshState(ctx, {
    data: typeof params.data === "string" ? params.data : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    valorAbertura: typeof params.valorAbertura === "number" ? params.valorAbertura : undefined,
    valorFechamento: typeof params.valorFechamento === "number" ? params.valorFechamento : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCaixaParams));
};
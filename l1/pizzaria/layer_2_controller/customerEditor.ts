/// <mls fileReference="_102035_/l1/pizzaria/layer_2_controllers/customerEditor.ts" enhancement="_blank" />

import { PizzariaCustomer, PizzariaCustomerOrderHistory, PizzariaUpdateCustomerParams, PizzariaUpdateCustomerOrderHistoryParams } from "_102035_/l1/pizzaria/module.js";
import { AppError, ok, type BffHandler, type RequestContext } from "_102034_/l1/server/layer_2_controllers/contracts.js";

async function getCustomerRepository(ctx: RequestContext) {
  return ctx.data.moduleData.getTable<PizzariaCustomer>("pizzariaCustomer");
}

async function getCustomerOrderHistoryRepository(ctx: RequestContext) {
  return ctx.data.moduleData.getTable<PizzariaCustomerOrderHistory>("pizzariaCustomerOrderHistory");
}

export async function getCustomer(ctx: RequestContext, input?: { customerId?: string }): Promise<PizzariaCustomer | undefined> {
  const repo = await getCustomerRepository(ctx);
  const rows = await repo.findMany();
  let filtered = rows;
  if (input?.customerId) {
    filtered = filtered.filter((item: PizzariaCustomer) => item.customerId === input.customerId);
  }
  return filtered[0];
}

export async function viewCustomerHistory(ctx: RequestContext, input?: { customerId?: string }): Promise<PizzariaCustomerOrderHistory[]> {
  const repo = await getCustomerOrderHistoryRepository(ctx);
  const rows = await repo.findMany();
  let filtered = rows;
  if (input?.customerId) {
    filtered = filtered.filter((item: PizzariaCustomerOrderHistory) => item.customerId === input.customerId);
  }
  return filtered;
}

export async function load(ctx: RequestContext, input: PizzariaUpdateCustomerParams): Promise<PizzariaCustomer> {
  const repo = await getCustomerRepository(ctx);
  const existing = await repo.findOne({ where: { customerId: input.customerId } });
  if (!existing) throw new AppError("NOT_FOUND", "Customer not found", 404);
  const merged: PizzariaCustomer = {
    ...existing,
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.phone !== undefined ? { phone: input.phone } : {}),
    ...(input.notes !== undefined ? { notes: input.notes } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function save(ctx: RequestContext, input: PizzariaUpdateCustomerParams): Promise<PizzariaCustomer> {
  const repo = await getCustomerRepository(ctx);
  const existing = await repo.findOne({ where: { customerId: input.customerId } });
  if (!existing) throw new AppError("NOT_FOUND", "Customer not found", 404);
  const merged: PizzariaCustomer = {
    ...existing,
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.phone !== undefined ? { phone: input.phone } : {}),
    ...(input.notes !== undefined ? { notes: input.notes } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function loadHistory(ctx: RequestContext, input: PizzariaUpdateCustomerOrderHistoryParams): Promise<PizzariaCustomerOrderHistory> {
  const repo = await getCustomerOrderHistoryRepository(ctx);
  const existing = await repo.findOne({ where: { customerId: input.customerId } });
  if (!existing) throw new AppError("NOT_FOUND", "CustomerOrderHistory not found", 404);
  const merged: PizzariaCustomerOrderHistory = {
    ...existing,
    ...(input.orderId !== undefined ? { orderId: input.orderId } : {}),
    ...(input.orderDate !== undefined ? { orderDate: input.orderDate } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export const customerEditorGetCustomerHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await getCustomer(ctx, {
    customerId: typeof params.customerId === "string" ? params.customerId : undefined
  }));
};

export const customerEditorViewCustomerHistoryHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await viewCustomerHistory(ctx, {
    customerId: typeof params.customerId === "string" ? params.customerId : undefined
  }));
};

export const customerEditorLoadHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await load(ctx, {
    customerId: typeof params.customerId === "string" ? params.customerId : undefined,
    name: typeof params.name === "string" ? params.name : undefined,
    phone: typeof params.phone === "string" ? params.phone : undefined,
    notes: typeof params.notes === "string" ? params.notes : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCustomerParams));
};

export const customerEditorSaveHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await save(ctx, {
    customerId: typeof params.customerId === "string" ? params.customerId : undefined,
    name: typeof params.name === "string" ? params.name : undefined,
    phone: typeof params.phone === "string" ? params.phone : undefined,
    notes: typeof params.notes === "string" ? params.notes : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCustomerParams));
};

export const customerEditorLoadHistoryHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await loadHistory(ctx, {
    customerId: typeof params.customerId === "string" ? params.customerId : undefined,
    orderId: typeof params.orderId === "string" ? params.orderId : undefined,
    orderDate: params.orderDate !== undefined ? params.orderDate : undefined,
    author: typeof params.author === "string" ? params.author : undefined
  } as PizzariaUpdateCustomerOrderHistoryParams));
};
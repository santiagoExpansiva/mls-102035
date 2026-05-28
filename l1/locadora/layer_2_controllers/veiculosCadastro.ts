/// <mls fileReference="_102035_/l1/locadora/layer_2_controllers/veiculosCadastro.ts" enhancement="_blank" />

import { LocadoraUpdateVeiculoRequest, LocadoraVeiculoResponse } from "/_102035_/l2/locadora/web/contracts/veiculosCadastro.js";
import { AppError, ok, type BffHandler, type RequestContext } from "/_102034_/l1/server/layer_2_controllers/contracts.js";
import { USE_MOCK, getMockVeiculoRepository } from "./mock.js";

async function getVeiculoRepository(ctx: RequestContext) {
  if (USE_MOCK) return getMockVeiculoRepository();
  return ctx.data.moduleData.getTable<LocadoraVeiculoResponse>('locadoraVeiculo');
}

export async function getStatusVeiculoOptions(ctx: RequestContext, input?: {}): Promise<LocadoraVeiculoResponse[]> {
  const repo = await getVeiculoRepository(ctx);
  const rows = await repo.findMany();
  return rows;
}

export async function saveStatus(ctx: RequestContext, input: LocadoraUpdateVeiculoRequest): Promise<LocadoraVeiculoResponse> {
  const repo = await getVeiculoRepository(ctx);
  const existing = await repo.findOne({ where: { placa: input.placa } });
  if (!existing) throw new AppError('NOT_FOUND', 'Veiculo not found', 404);
  const merged: LocadoraVeiculoResponse = {
    ...existing,
    placa: input.placa,
    ...(input.modelo !== undefined ? { modelo: input.modelo } : {}),
    ...(input.ano !== undefined ? { ano: input.ano } : {}),
    ...(input.categoria !== undefined ? { categoria: input.categoria } : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.quilometragem !== undefined ? { quilometragem: input.quilometragem } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export async function loadStatusOptions(ctx: RequestContext, input: LocadoraUpdateVeiculoRequest): Promise<LocadoraVeiculoResponse> {
  const repo = await getVeiculoRepository(ctx);
  const existing = await repo.findOne({ where: { placa: input.placa } });
  if (!existing) throw new AppError('NOT_FOUND', 'Veiculo not found', 404);
  const merged: LocadoraVeiculoResponse = {
    ...existing,
    placa: input.placa,
    ...(input.modelo !== undefined ? { modelo: input.modelo } : {}),
    ...(input.ano !== undefined ? { ano: input.ano } : {}),
    ...(input.categoria !== undefined ? { categoria: input.categoria } : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.quilometragem !== undefined ? { quilometragem: input.quilometragem } : {})
  };
  await repo.upsert({ record: merged });
  return merged;
}

export const veiculosCadastroGetStatusVeiculoOptionsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await getStatusVeiculoOptions(ctx, {}));
};

export const veiculosCadastroSaveStatusHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await saveStatus(ctx, {
    placa: typeof params.placa === 'string' ? params.placa : undefined,
    modelo: typeof params.modelo === 'string' ? params.modelo : undefined,
    ano: typeof params.ano === 'number' ? params.ano : undefined,
    categoria: typeof params.categoria === 'string' ? params.categoria : undefined,
    status: typeof params.status === 'string' ? params.status : undefined,
    quilometragem: typeof params.quilometragem === 'number' ? params.quilometragem : undefined,
    author: typeof params.author === 'string' ? params.author : undefined
  } as LocadoraUpdateVeiculoRequest));
};

export const veiculosCadastroLoadStatusOptionsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await loadStatusOptions(ctx, {
    placa: typeof params.placa === 'string' ? params.placa : undefined,
    modelo: typeof params.modelo === 'string' ? params.modelo : undefined,
    ano: typeof params.ano === 'number' ? params.ano : undefined,
    categoria: typeof params.categoria === 'string' ? params.categoria : undefined,
    status: typeof params.status === 'string' ? params.status : undefined,
    quilometragem: typeof params.quilometragem === 'number' ? params.quilometragem : undefined,
    author: typeof params.author === 'string' ? params.author : undefined
  } as LocadoraUpdateVeiculoRequest));
};
/// <mls fileReference="_102035_/l2/locadora/web/contracts/veiculosCadastro.ts" enhancement="_blank" />

export interface LocadoraVeiculoResponse {
  placa: string;
  modelo: string;
  ano: number;
  categoria: string;
  status: 'disponível' | 'locado' | 'manutenção';
  quilometragem: number;
}

export interface LocadoraUpdateVeiculoRequest {
  placa: string;
  modelo?: string;
  ano?: number;
  categoria?: string;
  status?: LocadoraVeiculoResponse['status'];
  quilometragem?: number;
  author?: string;
}
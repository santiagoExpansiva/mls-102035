/// <mls fileReference="_102035_/l2/pizzaria/web/contracts/cashRegister.ts" enhancement="_blank" />

export interface PizzariaCaixa {
  data: string;
  status: string;
  valorAbertura: number;
  valorFechamento?: number;
}

export interface PizzariaMovimentoCaixa {
  dataHora: string;
  tipo: string;
  valor: number;
  observacao?: string;
}

export interface PizzariaUpdateCaixaParams {
  data: string;
  status?: PizzariaCaixa['status'];
  valorAbertura?: PizzariaCaixa['valorAbertura'];
  valorFechamento?: PizzariaCaixa['valorFechamento'];
  author?: string;
}

export interface PizzariaUpdateMovimentoCaixaParams {
  dataHora: string;
  tipo?: PizzariaMovimentoCaixa['tipo'];
  valor?: PizzariaMovimentoCaixa['valor'];
  observacao?: PizzariaMovimentoCaixa['observacao'];
  author?: string;
}
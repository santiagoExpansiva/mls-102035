/// <mls fileReference="_102035_/l1/pizzaria/layer_2_controllers/router.ts" enhancement="_blank" />
import type { BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

import {
  cashRegisterGetCaixaDiaHandler,
  cashRegisterListMovimentosCaixaDiaHandler,
} from '/_102035_/l1/pizzaria/layer_2_controllers/cashRegister.js';


export function createPizzariaRouter(): Map<string, BffHandler> {
  return new Map<string, BffHandler>([
    ['pizzaria.getCaixaDia', cashRegisterGetCaixaDiaHandler],
    ['pizzaria.listMovimentosCaixaDia', cashRegisterListMovimentosCaixaDiaHandler],
  ]);
}

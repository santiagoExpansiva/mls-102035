/// <mls fileReference="_102035_/l1/locadora/layer_2_controllers/router.ts" enhancement="_blank" />
import type { BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';


import {
  veiculosCadastroGetStatusVeiculoOptionsHandler,
  veiculosCadastroSaveHandler
} from '/_102035_/l1/locadora/layer_2_controllers/veiculosCadastro.js'; 
import {
  veiculosListaListVeiculosHandler,
} from '/_102035_/l1/locadora/layer_2_controllers/veiculosLista.js';
export function createPizzariaRouter(): Map<string, BffHandler> {
  return new Map<string, BffHandler>([
    ['locadora.veiculosCadastro.getStatusVeiculoOptions', veiculosCadastroGetStatusVeiculoOptionsHandler],
    ['locadora.veiculosCadastro.saveVeiculo', veiculosCadastroSaveHandler],
    ['locadora.veiculosLista.listVeiculos', veiculosListaListVeiculosHandler],
  ]);
}

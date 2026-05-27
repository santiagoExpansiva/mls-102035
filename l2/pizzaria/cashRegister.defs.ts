/// <mls fileReference="_102035_/l2/pizzaria/cashRegister.defs.ts"  enhancement="_blank"/>

export const definition = {
  "screenId": "cash_register",
  "pageName": "cashRegister",
  "actor": "staff",
  "purpose": "Gerenciar abertura, sangria e fechamento do caixa diário.",
  "sections": [
    {
      "sectionName": "main",
      "mode": "stack",
      "organisms": [
        {
          "organismName": "cashRegisterStatus",
          "purpose": "Exibir status atual do caixa e valores do dia.",
          "rulesApplied": [
            "rule_cash_control"
          ]
        },
        {
          "organismName": "cashRegisterOperations",
          "purpose": "Registrar abertura, sangria e fechamento.",
          "rulesApplied": [
            "rule_cash_control"
          ]
        },
        {
          "organismName": "cashRegisterHistory",
          "purpose": "Listar operações do caixa no dia.",
          "rulesApplied": [
            "rule_cash_control"
          ]
        }
      ]
    }
  ],
  "status": "draft",
  "visualStyle": "Claro e amigável."
}

export const definitionPage = {
  "pages": [
    {
      "screenId": "cash_register",
      "pageName": "cashRegister",
      "actor": "staff",
      "purpose": "Gerenciar abertura, sangria e fechamento do caixa diário.",
      "sections": [
        {
          "sectionName": "main",
          "mode": "stack",
          "organisms": [
            {
              "organismName": "cashRegisterStatus",
              "purpose": "Exibir status atual do caixa e valores do dia.",
              "rulesApplied": [
                "rule_cash_control"
              ],
              "dataShape": {
                "shape": "object",
                "stateKey": "db.caixaDia",
                "sourceRoutine": "pizzaria.getCaixaDia",
                "fields": [
                  {
                    "entityField": "data",
                    "entity": "Caixa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Identifica o dia do caixa atual."
                  },
                  {
                    "entityField": "status",
                    "entity": "Caixa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Indica se o caixa está aberto ou fechado."
                  },
                  {
                    "entityField": "valorAbertura",
                    "entity": "Caixa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Valor de abertura do caixa do dia."
                  },
                  {
                    "entityField": "valorFechamento",
                    "entity": "Caixa",
                    "priority": "optional",
                    "usage": "display",
                    "priorityReason": "Disponível após fechamento."
                  }
                ],
                "params": [
                  {
                    "paramName": "data",
                    "type": "date",
                    "source": {
                      "from": "state",
                      "stateKey": "ui.cashRegister.day"
                    }
                  }
                ]
              },
              "tempStates": [
                {
                  "stateKey": "ui.cashRegisterStatus.showDetails",
                  "type": "boolean",
                  "description": "Alterna visualização de detalhes do status do caixa.",
                  "priority": "optional",
                  "initialValue": "true"
                },
                {
                  "stateKey": "ui.cashRegisterStatus.showTotals",
                  "type": "boolean",
                  "description": "Exibe ou oculta totais do dia no cabeçalho.",
                  "priority": "optional",
                  "initialValue": "true"
                },
                {
                  "stateKey": "ui.cashRegisterStatus.highlightChanges",
                  "type": "boolean",
                  "description": "Realça alterações recentes nos valores do caixa.",
                  "priority": "optional",
                  "initialValue": "true"
                }
              ],
              "computedFields": [
                {
                  "fieldId": "saldoAtual",
                  "derivedFrom": [
                    "db.caixaDia.valorAbertura",
                    "db.movimentosCaixaDia[].tipo",
                    "db.movimentosCaixaDia[].valor"
                  ],
                  "description": "Calcula o saldo atual somando entradas e subtraindo sangrias a partir da abertura.",
                  "priority": "recommended"
                },
                {
                  "fieldId": "totalSangrias",
                  "derivedFrom": [
                    "db.movimentosCaixaDia[].tipo",
                    "db.movimentosCaixaDia[].valor"
                  ],
                  "description": "Totaliza o valor de sangrias realizadas no dia.",
                  "priority": "optional"
                },
                {
                  "fieldId": "totalEntradas",
                  "derivedFrom": [
                    "db.movimentosCaixaDia[].tipo",
                    "db.movimentosCaixaDia[].valor"
                  ],
                  "description": "Totaliza entradas manuais registradas no dia.",
                  "priority": "optional"
                },
                {
                  "fieldId": "statusLabel",
                  "derivedFrom": [
                    "db.caixaDia.status"
                  ],
                  "description": "Rótulo amigável do status do caixa (aberto/fechado).",
                  "priority": "optional"
                },
                {
                  "fieldId": "diaLabel",
                  "derivedFrom": [
                    "db.caixaDia.data"
                  ],
                  "description": "Rótulo de data para exibição no resumo do caixa.",
                  "priority": "optional"
                }
              ],
              "navigationFields": [],
              "emits": [
                {
                  "event": "refreshCaixaStatus",
                  "payload": "{data: ui.cashRegister.day}",
                  "writesState": "db.caixaDia"
                },
                {
                  "event": "toggleAutoRefresh",
                  "payload": "{autoRefresh: ui.cashRegister.autoRefresh}",
                  "writesState": "ui.cashRegister.autoRefresh"
                }
              ]
            },
            {
              "organismName": "cashRegisterOperations",
              "purpose": "Registrar abertura, sangria e fechamento.",
              "rulesApplied": [
                "rule_cash_control"
              ],
              "dataShape": {
                "shape": "fields",
                "entityFields": [
                  {
                    "entity": "Caixa",
                    "entityField": "valorAbertura",
                    "stateKey": "db.caixa.valorAbertura",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Necessário para abrir o caixa."
                  },
                  {
                    "entity": "Caixa",
                    "entityField": "valorFechamento",
                    "stateKey": "db.caixa.valorFechamento",
                    "priority": "optional",
                    "usage": "edit",
                    "priorityReason": "Informado no fechamento."
                  },
                  {
                    "entity": "MovimentoCaixa",
                    "entityField": "valor",
                    "stateKey": "db.movimentoCaixa.valor",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Valor de sangria ou entrada."
                  },
                  {
                    "entity": "MovimentoCaixa",
                    "entityField": "tipo",
                    "stateKey": "db.movimentoCaixa.tipo",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Define se é entrada ou sangria."
                  },
                  {
                    "entity": "MovimentoCaixa",
                    "entityField": "observacao",
                    "stateKey": "db.movimentoCaixa.observacao",
                    "priority": "optional",
                    "usage": "edit",
                    "priorityReason": "Justificativa breve quando necessário."
                  }
                ]
              },
              "tempStates": [
                {
                  "stateKey": "ui.cashRegister.operationMode",
                  "type": "string",
                  "description": "Modo selecionado: abrir, sangria ou fechar.",
                  "priority": "required",
                  "initialValue": "'abrir'"
                },
                {
                  "stateKey": "ui.cashRegister.confirmationOpen",
                  "type": "boolean",
                  "description": "Confirmação de abertura do caixa.",
                  "priority": "recommended",
                  "initialValue": "false"
                },
                {
                  "stateKey": "ui.cashRegister.confirmationClose",
                  "type": "boolean",
                  "description": "Confirmação de fechamento do caixa.",
                  "priority": "recommended",
                  "initialValue": "false"
                },
                {
                  "stateKey": "ui.cashRegister.observacaoSangria",
                  "type": "string",
                  "description": "Observação opcional para sangria.",
                  "priority": "optional",
                  "initialValue": "''"
                },
                {
                  "stateKey": "ui.cashRegister.valorInputValido",
                  "type": "boolean",
                  "description": "Flag de validação para valores monetários positivos.",
                  "priority": "recommended",
                  "initialValue": "false"
                },
                {
                  "stateKey": "ui.cashRegister.showConfirmationModal",
                  "type": "boolean",
                  "description": "Controle de modal de confirmação de operação.",
                  "priority": "optional",
                  "initialValue": "false"
                },
                {
                  "stateKey": "ui.cashRegister.lastOperationType",
                  "type": "string",
                  "description": "Último tipo de operação executada com sucesso.",
                  "priority": "optional",
                  "initialValue": "''"
                },
                {
                  "stateKey": "ui.cashRegister.preventDoubleSubmit",
                  "type": "boolean",
                  "description": "Evita envio duplicado enquanto há operação em andamento.",
                  "priority": "recommended",
                  "initialValue": "true"
                }
              ],
              "computedFields": [
                {
                  "fieldId": "podeAbrir",
                  "derivedFrom": [
                    "db.caixaDia.status"
                  ],
                  "description": "Permite abertura apenas se o caixa estiver fechado ou inexistente no dia.",
                  "priority": "required"
                },
                {
                  "fieldId": "podeSangria",
                  "derivedFrom": [
                    "db.caixaDia.status"
                  ],
                  "description": "Permite sangria somente com caixa aberto.",
                  "priority": "required"
                },
                {
                  "fieldId": "podeFechar",
                  "derivedFrom": [
                    "db.caixaDia.status"
                  ],
                  "description": "Permite fechamento somente com caixa aberto.",
                  "priority": "required"
                },
                {
                  "fieldId": "valorOperacaoValido",
                  "derivedFrom": [
                    "db.caixa.valorAbertura",
                    "db.caixa.valorFechamento",
                    "db.movimentoCaixa.valor",
                    "ui.cashRegister.operationMode"
                  ],
                  "description": "Indica se o valor informado está válido para o modo selecionado.",
                  "priority": "recommended"
                },
                {
                  "fieldId": "operacaoLabel",
                  "derivedFrom": [
                    "ui.cashRegister.operationMode"
                  ],
                  "description": "Rótulo amigável do modo de operação selecionado.",
                  "priority": "optional"
                },
                {
                  "fieldId": "habilitarConfirmacao",
                  "derivedFrom": [
                    "ui.cashRegister.valorInputValido",
                    "ui.cashRegister.operationMode"
                  ],
                  "description": "Habilita botão de confirmação somente quando há valor válido e modo definido.",
                  "priority": "recommended"
                }
              ],
              "navigationFields": [],
              "emits": [
                {
                  "event": "abrirCaixa",
                  "payload": "{data: ui.cashRegister.day, valorAbertura: db.caixa.valorAbertura}",
                  "writesState": "ui.cashRegister.openState"
                },
                {
                  "event": "registrarSangria",
                  "payload": "{caixaId: db.caixaDia.id, tipo: db.movimentoCaixa.tipo, valor: db.movimentoCaixa.valor, observacao: ui.cashRegister.observacaoSangria}",
                  "writesState": "ui.cashRegister.sangriaState"
                },
                {
                  "event": "fecharCaixa",
                  "payload": "{caixaId: db.caixaDia.id, valorFechamento: db.caixa.valorFechamento}",
                  "writesState": "ui.cashRegister.closeState"
                },
                {
                  "event": "resetOperationForm",
                  "payload": "{}",
                  "writesState": "db.movimentoCaixa"
                }
              ]
            },
            {
              "organismName": "cashRegisterHistory",
              "purpose": "Listar operações do caixa no dia.",
              "rulesApplied": [
                "rule_cash_control"
              ],
              "dataShape": {
                "shape": "collection",
                "stateKey": "db.movimentosCaixaDia[]",
                "sourceRoutine": "pizzaria.listMovimentosCaixaDia",
                "itemFields": [
                  {
                    "entityField": "dataHora",
                    "entity": "MovimentoCaixa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Identifica o momento da operação."
                  },
                  {
                    "entityField": "tipo",
                    "entity": "MovimentoCaixa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Distingue entrada e sangria."
                  },
                  {
                    "entityField": "valor",
                    "entity": "MovimentoCaixa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Valor movimentado."
                  },
                  {
                    "entityField": "observacao",
                    "entity": "MovimentoCaixa",
                    "priority": "optional",
                    "usage": "display"
                  }
                ],
                "params": [
                  {
                    "paramName": "data",
                    "type": "date",
                    "source": {
                      "from": "state",
                      "stateKey": "ui.cashRegister.day"
                    }
                  }
                ],
                "editable": false
              },
              "tempStates": [
                {
                  "stateKey": "ui.cashRegisterHistory.filterTipo",
                  "type": "string",
                  "description": "Filtrar operações por tipo.",
                  "priority": "optional",
                  "initialValue": "'todos'"
                },
                {
                  "stateKey": "ui.cashRegisterHistory.sortBy",
                  "type": "string",
                  "description": "Campo de ordenação da lista de operações.",
                  "priority": "optional",
                  "initialValue": "'dataHora'"
                },
                {
                  "stateKey": "ui.cashRegisterHistory.showObservacoes",
                  "type": "boolean",
                  "description": "Exibir ou ocultar coluna de observações.",
                  "priority": "optional",
                  "initialValue": "true"
                },
                {
                  "stateKey": "ui.cashRegisterHistory.compactView",
                  "type": "boolean",
                  "description": "Exibir lista em modo compacto para uso no balcão.",
                  "priority": "optional",
                  "initialValue": "false"
                }
              ],
              "computedFields": [
                {
                  "fieldId": "quantidadeOperacoes",
                  "derivedFrom": [
                    "db.movimentosCaixaDia[]"
                  ],
                  "description": "Quantidade total de operações no dia.",
                  "priority": "optional"
                },
                {
                  "fieldId": "totalPorTipo",
                  "derivedFrom": [
                    "db.movimentosCaixaDia[].tipo",
                    "db.movimentosCaixaDia[].valor"
                  ],
                  "description": "Totais agrupados por tipo (entrada/sangria).",
                  "priority": "optional"
                },
                {
                  "fieldId": "saldoMovimentado",
                  "derivedFrom": [
                    "db.movimentosCaixaDia[].tipo",
                    "db.movimentosCaixaDia[].valor"
                  ],
                  "description": "Saldo líquido das movimentações do dia.",
                  "priority": "optional"
                },
                {
                  "fieldId": "ultimaOperacaoLabel",
                  "derivedFrom": [
                    "db.movimentosCaixaDia[].dataHora"
                  ],
                  "description": "Data/hora amigável da última operação registrada.",
                  "priority": "optional"
                }
              ],
              "navigationFields": [],
              "emits": [
                {
                  "event": "refreshMovimentos",
                  "payload": "{data: ui.cashRegister.day}",
                  "writesState": "db.movimentosCaixaDia[]"
                }
              ]
            }
          ]
        }
      ],
      "actionStates": [
        {
          "stateKey": "ui.cashRegister.openState",
          "description": "Estado da abertura do caixa.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        },
        {
          "stateKey": "ui.cashRegister.sangriaState",
          "description": "Estado do registro de sangria/entrada.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        },
        {
          "stateKey": "ui.cashRegister.closeState",
          "description": "Estado do fechamento do caixa.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        },
        {
          "stateKey": "ui.cashRegister.loadState",
          "description": "Estado de carregamento do caixa e movimentos do dia.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        },
        {
          "stateKey": "ui.cashRegister.refreshState",
          "description": "Estado de atualização manual dos dados do caixa.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        }
      ],
      "tempStates": [
        {
          "stateKey": "ui.cashRegister.day",
          "type": "date",
          "description": "Dia selecionado para visualização do caixa.",
          "priority": "recommended",
          "initialValue": "context.actualDate"
        },
        {
          "stateKey": "ui.cashRegister.autoRefresh",
          "type": "boolean",
          "description": "Atualização automática dos dados do caixa.",
          "priority": "optional",
          "initialValue": "true"
        },
        {
          "stateKey": "ui.cashRegister.autoRefreshInterval",
          "type": "number",
          "description": "Intervalo em segundos para atualização automática quando ativa.",
          "priority": "optional",
          "initialValue": "60"
        },
        {
          "stateKey": "ui.cashRegister.preferredCurrency",
          "type": "string",
          "description": "Moeda padrão de exibição para valores do caixa.",
          "priority": "optional",
          "initialValue": "'BRL'"
        }
      ]
    }
  ]
}

export const contractSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/pizzaria/cashRegister.defs.ts).definitionPage]]
\`\`\`

## Ontology
\`\`\`JSON
    [[(_102035_/l1/pizzaria/module.ts)]]
\`\`\`
`

export const sharedSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/pizzaria/cashRegister.defs.ts).definitionPage]]
\`\`\`

## Ontology
\`\`\`JSON
    [[(_102035_/l1/pizzaria/module.ts)]]
\`\`\`

`

export const desktopLayoutSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/pizzaria/cashRegister.defs.ts).definitionPage]]
\`\`\`

## Base Class
\`\`\`JSON
    [[(_102035_/l2/pizzaria/web/shared/cashRegister.ts)]]
\`\`\`
`

export const materializeIndex = [
  {
    "id": "contract",
    "specVar": "contractSpec",
    "outputPath": "_102035_/l1/pizzaria/layer_2_controllers/cashRegister.ts",
    "skillPath": "_102020_/l2/agents/newModule/skills/genContract.ts",
    "agent": "agentMaterializeContract",
    "dependsOn": [],
    "specUpdatedAt": "2026-05-27T19:33:43Z"
  },
  {
    "id": "shared",
    "specVar": "sharedSpec",
    "outputPath": "cashRegister.ts",
    "agent": "agentMaterializeSharedPage",
    "dependsOn": [
      "contract"
    ],
    "specUpdatedAt": "2026-05-27T19:33:43Z"
  },
  {
    "id": "desktop",
    "specVar": "desktopLayoutSpec",
    "outputPath": "cashRegister.ts",
    "agent": "agentMaterializePageLit",
    "dependsOn": [
      "contract",
      "shared"
    ],
    "specUpdatedAt": "2026-05-27T19:33:43Z"
  }
]

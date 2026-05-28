/// <mls fileReference="_102035_/l2/locadora/veiculosLista.defs.ts"  enhancement="_blank"/>

export const definition = {
  "screenId": "veiculos-lista",
  "pageName": "veiculosLista",
  "actor": "admin",
  "purpose": "Consultar e filtrar veículos cadastrados.",
  "sections": [
    {
      "sectionName": "main",
      "mode": "stack",
      "organisms": [
        {
          "organismName": "veiculosListaFilters",
          "purpose": "Permitir filtro de veículos por status.",
          "rulesApplied": [
            "rule_papel_admin_unico",
            "rule_status_veiculo_valores",
            "rule_idioma_pt_br",
            "rule_tom_profissional_conciso"
          ]
        },
        {
          "organismName": "veiculosListaResults",
          "purpose": "Listar veículos cadastrados para consulta.",
          "rulesApplied": [
            "rule_papel_admin_unico",
            "rule_status_veiculo_valores",
            "rule_idioma_pt_br",
            "rule_tom_profissional_conciso"
          ]
        }
      ]
    }
  ],
  "status": "draft",
  "visualStyle": "Corporate & professional"
}

export const definitionPage = {
  "pages": [
    {
      "screenId": "veiculos-lista",
      "pageName": "veiculosLista",
      "actor": "admin",
      "purpose": "Consultar e filtrar veículos cadastrados.",
      "sections": [
        {
          "sectionName": "main",
          "mode": "stack",
          "organisms": [
            {
              "organismName": "veiculosListaFilters",
              "purpose": "Permitir filtro de veículos por status.",
              "rulesApplied": [
                "rule_papel_admin_unico",
                "rule_status_veiculo_valores",
                "rule_idioma_pt_br",
                "rule_tom_profissional_conciso"
              ],
              "dataShape": {
                "shape": "fields",
                "entityFields": [
                  {
                    "entity": "veiculo",
                    "entityField": "status",
                    "stateKey": "db.veiculo.status",
                    "priority": "required",
                    "usage": "filter",
                    "priorityReason": "Filtro principal conforme regra de status permitido."
                  }
                ]
              },
              "tempStates": [
                {
                  "stateKey": "ui.veiculosLista.filter.status",
                  "type": "string",
                  "description": "Status selecionado para filtrar veículos.",
                  "priority": "required",
                  "initialValue": "'todos'"
                }
              ],
              "computedFields": [
                {
                  "fieldId": "veiculosListaFilters.isFiltered",
                  "derivedFrom": [
                    "ui.veiculosLista.filter.status"
                  ],
                  "description": "Indica se há filtro ativo diferente de 'todos'.",
                  "priority": "optional"
                }
              ],
              "navigationFields": [],
              "emits": [
                {
                  "event": "veiculosLista.filterApplied",
                  "payload": "{status:ui.veiculosLista.filter.status}",
                  "writesState": "ui.veiculosLista.filter.status"
                }
              ]
            },
            {
              "organismName": "veiculosListaResults",
              "purpose": "Listar veículos cadastrados para consulta.",
              "rulesApplied": [
                "rule_papel_admin_unico",
                "rule_status_veiculo_valores",
                "rule_idioma_pt_br",
                "rule_tom_profissional_conciso"
              ],
              "dataShape": {
                "shape": "collection",
                "stateKey": "db.veiculo[]",
                "sourceRoutine": "locadora.veiculosLista.listVeiculos",
                "itemFields": [
                  {
                    "entity": "veiculo",
                    "entityField": "placa",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Identificador principal do veículo."
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "modelo",
                    "priority": "required",
                    "usage": "display"
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "ano",
                    "priority": "required",
                    "usage": "display"
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "categoria",
                    "priority": "required",
                    "usage": "display"
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "status",
                    "priority": "required",
                    "usage": "display"
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "quilometragem",
                    "priority": "required",
                    "usage": "display"
                  }
                ],
                "params": [
                  {
                    "paramName": "status",
                    "type": "string",
                    "source": {
                      "from": "state",
                      "stateKey": "ui.veiculosLista.filter.status"
                    }
                  }
                ],
                "editable": false
              },
              "tempStates": [
                {
                  "stateKey": "ui.veiculosLista.sort.by",
                  "type": "string",
                  "description": "Ordenação da lista de veículos.",
                  "priority": "optional",
                  "initialValue": "'placa'"
                }
              ],
              "computedFields": [
                {
                  "fieldId": "veiculosListaResults.totalVeiculos",
                  "derivedFrom": [
                    "db.veiculo[]"
                  ],
                  "description": "Quantidade total de veículos retornados.",
                  "priority": "recommended"
                }
              ],
              "navigationFields": [],
              "emits": [
                {
                  "event": "veiculosLista.itemSelected",
                  "payload": "{placa:item.placa}"
                }
              ]
            }
          ]
        }
      ],
      "actionStates": [
        {
          "stateKey": "ui.veiculosLista.loading",
          "description": "Carregamento da lista de veículos.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        },
        {
          "stateKey": "ui.veiculosLista.error",
          "description": "Erro ao carregar veículos.",
          "values": [
            "idle",
            "error"
          ]
        }
      ],
      "tempStates": [
        {
          "stateKey": "ui.veiculosLista.filter.status",
          "type": "string",
          "description": "Filtro global de status aplicado à lista.",
          "priority": "required",
          "initialValue": "'todos'"
        }
      ]
    }
  ]
}

export const contractSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/locadora/veiculosLista.defs.ts).definitionPage]]
\`\`\`

## Ontology
\`\`\`JSON
    [[(_102035_/l2/locadora/module.defs.ts)]]
\`\`\`
`

export const sharedSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/locadora/veiculosLista.defs.ts).definitionPage]]
\`\`\`

## Contracts
\`\`\`JSON
    [[(_102035_/l2/locadora/web/contracts/veiculosLista.ts)]]
\`\`\`

`

export const desktopLayoutSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/locadora/veiculosLista.defs.ts).definitionPage]]
\`\`\`

## Base Class
\`\`\`JSON
    [[(_102035_/l2/locadora/web/shared/veiculosLista.ts)]]
\`\`\`
`

export const materializeIndex = [
  {
    "id": "contract",
    "specVar": "contractSpec",
    "outputPath": "_102035_/l1/locadora/layer_2_controllers/veiculosLista.ts",
    "skillPath": "_102020_/l2/agents/newModule/skills/genContract.ts",
    "agent": "agentMaterializeContract",
    "dependsOn": [],
    "specUpdatedAt": "2026-05-28T17:43:25Z"
  },
  {
    "id": "shared",
    "specVar": "sharedSpec",
    "outputPath": "veiculosLista.ts",
    "agent": "agentMaterializeSharedPage",
    "dependsOn": [
      "contract"
    ],
    "specUpdatedAt": "2026-05-28T17:43:25Z"
  },
  {
    "id": "desktop",
    "specVar": "desktopLayoutSpec",
    "outputPath": "veiculosLista.ts",
    "agent": "agentMaterializePageLit",
    "dependsOn": [
      "contract",
      "shared"
    ],
    "specUpdatedAt": "2026-05-28T17:43:25Z"
  }
]

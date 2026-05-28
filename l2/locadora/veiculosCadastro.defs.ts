/// <mls fileReference="_102035_/l2/locadora/veiculosCadastro.defs.ts"  enhancement="_blank"/>

export const definition = {
  "screenId": "veiculos-cadastro",
  "pageName": "veiculosCadastro",
  "actor": "admin",
  "purpose": "Cadastrar veículo da frota com dados obrigatórios.",
  "sections": [
    {
      "sectionName": "main",
      "mode": "stack",
      "organisms": [
        {
          "organismName": "veiculosCadastroForm",
          "purpose": "Coletar dados obrigatórios do veículo para cadastro.",
          "rulesApplied": [
            "rule_papel_admin_unico",
            "rule_frota_campos_obrigatorios",
            "rule_status_veiculo_valores",
            "rule_idioma_pt_br",
            "rule_tom_profissional_conciso"
          ]
        },
        {
          "organismName": "veiculosCadastroStatusInfo",
          "purpose": "Informar valores válidos de status do veículo.",
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
      "screenId": "veiculos-cadastro",
      "pageName": "veiculosCadastro",
      "actor": "admin",
      "purpose": "Cadastrar veículo da frota com dados obrigatórios.",
      "sections": [
        {
          "sectionName": "main",
          "mode": "stack",
          "organisms": [
            {
              "organismName": "veiculosCadastroForm",
              "purpose": "Coletar dados obrigatórios do veículo para cadastro.",
              "rulesApplied": [
                "rule_papel_admin_unico",
                "rule_frota_campos_obrigatorios",
                "rule_status_veiculo_valores",
                "rule_idioma_pt_br",
                "rule_tom_profissional_conciso"
              ],
              "dataShape": {
                "shape": "fields",
                "entityFields": [
                  {
                    "entity": "veiculo",
                    "entityField": "placa",
                    "stateKey": "db.veiculo.placa",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Obrigatório para identificação única do veículo."
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "modelo",
                    "stateKey": "db.veiculo.modelo",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Obrigatório para cadastro e consulta."
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "ano",
                    "stateKey": "db.veiculo.ano",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Obrigatório para cadastro e consulta."
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "categoria",
                    "stateKey": "db.veiculo.categoria",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Obrigatório para classificação da frota."
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "status",
                    "stateKey": "db.veiculo.status",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Obrigatório e restrito aos valores válidos."
                  },
                  {
                    "entity": "veiculo",
                    "entityField": "quilometragem",
                    "stateKey": "db.veiculo.quilometragem",
                    "priority": "required",
                    "usage": "edit",
                    "priorityReason": "Obrigatório para controle de uso e manutenção."
                  }
                ]
              },
              "tempStates": [
                {
                  "stateKey": "ui.veiculosCadastro.form.errors",
                  "type": "Record<string,string>",
                  "description": "Mapa de erros de validação por campo.",
                  "priority": "recommended"
                },
                {
                  "stateKey": "ui.veiculosCadastro.form.dirty",
                  "type": "boolean",
                  "description": "Indica se o formulário foi alterado.",
                  "priority": "recommended",
                  "initialValue": "false"
                }
              ],
              "computedFields": [],
              "navigationFields": [],
              "emits": [
                {
                  "event": "veiculosCadastroForm.submit",
                  "payload": "{placa,modelo,ano,categoria,status,quilometragem}",
                  "writesState": "ui.veiculosCadastro.saveStatus"
                }
              ]
            },
            {
              "organismName": "veiculosCadastroStatusInfo",
              "purpose": "Informar valores válidos de status do veículo.",
              "rulesApplied": [
                "rule_papel_admin_unico",
                "rule_status_veiculo_valores",
                "rule_idioma_pt_br",
                "rule_tom_profissional_conciso"
              ],
              "dataShape": {
                "shape": "object",
                "stateKey": "config.locadora.statusVeiculoOptions",
                "sourceRoutine": "locadora.getStatusVeiculoOptions",
                "fields": [
                  {
                    "entity": "veiculo",
                    "entityField": "status",
                    "priority": "required",
                    "usage": "display",
                    "priorityReason": "Exibe opções válidas de status para orientação do cadastro."
                  }
                ],
                "params": []
              },
              "tempStates": [],
              "computedFields": [],
              "navigationFields": [],
              "emits": []
            }
          ]
        }
      ],
      "actionStates": [
        {
          "stateKey": "ui.veiculosCadastro.saveStatus",
          "description": "Estado da ação de salvar o cadastro de veículo.",
          "values": [
            "idle",
            "loading",
            "success",
            "error"
          ]
        },
        {
          "stateKey": "ui.veiculosCadastro.loadStatusOptions",
          "description": "Estado de carregamento das opções de status.",
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
          "stateKey": "ui.veiculosCadastro.statusOptions",
          "type": "string[]",
          "description": "Lista de opções de status disponíveis para exibição e seleção.",
          "priority": "recommended",
          "initialValue": "[\"disponível\",\"locado\",\"manutenção\"]"
        }
      ]
    }
  ]
}

export const contractSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/locadora/veiculosCadastro.defs.ts).definitionPage]]
\`\`\`

## Ontology
\`\`\`JSON
    [[(_102035_/l2/locadora/module.defs.ts)]]
\`\`\`
`

export const sharedSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/locadora/veiculosCadastro.defs.ts).definitionPage]]
\`\`\`

## Contracts
\`\`\`JSON
    [[(_102035_/l2/locadora/web/contracts/veiculosCadastro.ts)]]
\`\`\`

`

export const desktopLayoutSpec = `
## Pages spec
\`\`\`JSON
    [[(_102035_/l2/locadora/veiculosCadastro.defs.ts).definitionPage]]
\`\`\`

## Base Class
\`\`\`JSON
    [[(_102035_/l2/locadora/web/shared/veiculosCadastro.ts)]]
\`\`\`
`

export const materializeIndex = [
  {
    "id": "contract",
    "specVar": "contractSpec",
    "outputPath": "_102035_/l1/locadora/layer_2_controllers/veiculosCadastro.ts",
    "skillPath": "_102020_/l2/agents/newModule/skills/genContract.ts",
    "agent": "agentMaterializeContract",
    "dependsOn": [],
    "specUpdatedAt": "2026-05-28T17:36:28Z"
  },
  {
    "id": "shared",
    "specVar": "sharedSpec",
    "outputPath": "veiculosCadastro.ts",
    "agent": "agentMaterializeSharedPage",
    "dependsOn": [
      "contract"
    ],
    "specUpdatedAt": "2026-05-28T17:36:28Z"
  },
  {
    "id": "desktop",
    "specVar": "desktopLayoutSpec",
    "outputPath": "veiculosCadastro.ts",
    "agent": "agentMaterializePageLit",
    "dependsOn": [
      "contract",
      "shared"
    ],
    "specUpdatedAt": "2026-05-28T17:36:28Z"
  }
]

/// <mls fileReference="_102035_/l2/locadora/index.ts" enhancement="_blank" />
import { bootstrapCollabApp } from '/_102033_/l2/core/bootstrap.js';

void bootstrapCollabApp({
  projectId: '102035',
  appId: 'locadora',
  title: 'Collab Test · locadora',
  shellMode: 'spa',
  navigation: [
    { label: 'Monitor', href: '/monitor' },
    { label: 'veiculosCadastro', href: '/locadora/veiculosCadastro' },
    { label: 'veiculosLista', href: '/locadora/veiculosLista' },
  ],
  pages: [
    {
      path: '/locadora/veiculosCadastro',
      title: 'veiculosCadastro',
      tagName: 'locadora--web--desktop--page11--veiculos-cadastro-102035',
      loader: () => import('/_102035_/l2/locadora/web/desktop/page11/veiculosCadastro.js'),
    },
    {
      path: '/locadora/veiculosLista',
      title: 'veiculosLista',
      tagName: 'locadora--web--desktop--page11--veiculos-lista-102035',
      loader: () => import('/_102035_/l2/locadora/web/desktop/page11/veiculosLista.js'),
    },
  ],
});

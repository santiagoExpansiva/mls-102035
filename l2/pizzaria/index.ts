/// <mls fileReference="_102035_/l2/pizzaria/index.ts" enhancement="_blank" />
import { bootstrapCollabApp } from '/_102033_/l2/core/bootstrap.js';

void bootstrapCollabApp({
  projectId: '102035',
  appId: 'pizzaria',
  title: 'Collab Test · pizzaria',
  shellMode: 'spa',
  navigation: [
    { label: 'Monitor', href: '/monitor' },
    { label: 'cashRegister', href: '/pizzaria/cashRegister' },
  ],
  pages: [
    {
      path: '/pizzaria/cashRegister',
      title: 'cashRegister',
      tagName: 'pizzaria--web--desktop--page11--cash-register-102035',
      loader: () => import('/_102035_/l2/pizzaria/web/desktop/page11/cashRegister.js'),
    },
  ],
});

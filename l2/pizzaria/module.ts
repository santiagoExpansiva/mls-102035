/// <mls fileReference="_102035_/l2/pizzaria/module.ts" enhancement="_blank" />
import type { AuraModuleFrontendDefinition, IPaths, IGenomeConfig } from '/_102029_/l2/contracts/bootstrap.js';

export const moduleGenome: Record<string, IGenomeConfig> = {
  'web/desktop/page11': {
    designSystem: 'default',
    device: 'desktop',
    layout: 'standard',
  }
} as const;
  
export const skills: IPaths = {
  web: {
    sharedPath: '/_102035_/l2/pizzaria/web/shared',
    sharedSkill: '/_102020_/l2/agents/newModule/skills/genPageShared.ts'
  }
}

export const moduleStates = {
} as const;

export const moduleShellPreferences = {
  layout: {
    asideMode: {
      desktop: 'inline',
      mobile: 'fullscreen',
    },
  },
} as const;

export const moduleFrontendDefinition: AuraModuleFrontendDefinition = {
  pageTitle: 'pizzaria',
  device: 'desktop',
  navigation: [
    {
      id: 'cashRegister',
      label: 'cashRegister',
      href: '/pizzaria/cashRegister',
      description: 'cashRegister',
    },
  ],
  routes: [
    {
      path: '/pizzaria/cashRegister',
      aliases: [],
      entrypoint: '/_102035_/l2/pizzaria/web/desktop/page11/cashRegister.js',
      tag: 'pizzaria--web--desktop--page11--cash-register-102035',
      title: 'cashRegister',
    },
  ],
};

import type { INodeProperties } from 'n8n-workflow';

export const userAccountDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['userAccount'] },
    },
    options: [
      {
        name: 'Check User Balance',
        value: 'checkUserBalance',
        action: 'Check user balance',
      },
    ],
    default: 'checkUserBalance',
  },
];

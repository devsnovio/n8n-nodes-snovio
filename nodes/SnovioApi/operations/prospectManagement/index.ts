import type { INodeProperties } from 'n8n-workflow';
import { findProspectByIdDescription } from "./findProspectById";
import { findProspectByEmailDescription } from "./findProspectByEmail";
import { createNewProspectListDescription } from "./createNewProspectList";
import { addProspectToListDescription } from "./addProspectToList";
import { viewProspectsInListDescription } from "./viewProspectsInList";

export const prospectManagementDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['prospectManagement'] },
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: 'Add Prospect to List',
        value: 'addProspectToList',
        action: 'Add prospect to list',
      },
      {
        name: 'Find Prospect by ID',
        value: 'findProspectById',
        action: 'Find prospect by ID',
      },
      {
        name: 'Find Prospect by Email',
        value: 'findProspectByEmail',
        action: 'Find prospect by email',
      },
      {
        name: 'Find Prospect’s Custom Fields',
        value: 'findProspectsCustomFields',
        action: 'Find prospect s custom fields',
      },
      {
        name: 'See User Lists',
        value: 'seeUserLists',
        action: 'See user lists',
      },
      {
        name: 'View Prospects in List',
        value: 'viewProspectsInList',
        action: 'View prospects in list',
      },
      {
        name: 'Create New Prospect List',
        value: 'createNewProspectList',
        action: 'Create new prospect list',
      },
    ],
    default: 'addProspectToList',
  },
  ...addProspectToListDescription,
  ...findProspectByIdDescription,
  ...findProspectByEmailDescription,
  ...createNewProspectListDescription,
  ...viewProspectsInListDescription,
];

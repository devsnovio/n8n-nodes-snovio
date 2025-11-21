import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import URLS from '../../transport/urls';

const showOnlyViewProspectsInList = {
  operation: ['viewProspectsInList'],
  resource: ['prospectManagement'],
};

export const viewProspectsInListDescription: INodeProperties[] = [
  {
    displayName: 'listId',
    name: 'listId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyViewProspectsInList},
    hint: 'The list’s unique identifier.',
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    required: true,
    typeOptions: {
      minValue: 1,
    },
    displayOptions: {
      show: {
        ...showOnlyViewProspectsInList,
        returnAllPages: [false],
      }
    },
    hint: 'You can choose on which page of the list you would like to begin your search. This field is optional.',
  },
  {
    displayName: 'perPage',
    name: 'perPage',
    type: 'number',
    default: 20,
    required: true,
    typeOptions: {
      minValue: 20,
      maxValue: 5000,
    },
    displayOptions: { show: showOnlyViewProspectsInList},
    hint: 'Set the maximum number of prospects to be included in the response.',
  },
  {
    displayName: 'Return All Pages',
    name: 'returnAllPages',
    type: 'boolean',
    displayOptions: {
      show: showOnlyViewProspectsInList,
    },
    default: false,
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const listId = this.getNodeParameter('listId', index, '') as string;
  let page = this.getNodeParameter('page', index, '') as number || 1;
  const perPage = this.getNodeParameter('perPage', index, '') as number;
  const returnAllPages = this.getNodeParameter('returnAllPages', index, '') as boolean;

  if (returnAllPages) page = 1

  let responseData;

  do {
    const data =  await apiRequest.call(
      this,
      'POST',
      URLS.viewProspectsInList,
      { listId, page, perPage },
    );
    page = page + 1;
    if (!responseData) {
      responseData = data;
    } else {
      responseData.prospects.push(...data.prospects);
    }
  } while (Math.ceil(responseData.list.contacts / perPage) >= page && returnAllPages)

  return this.helpers.returnJsonArray(responseData);
}

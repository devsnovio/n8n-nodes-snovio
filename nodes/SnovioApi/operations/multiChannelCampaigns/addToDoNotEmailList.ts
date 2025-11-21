import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import {splitString} from "../../GenericFunctions";

const showOnlyAddToDoNotEmailList = {
  operation: ['addToDoNotEmailList'],
  resource: ['multiChannelCampaigns'],
};

export const addToDoNotEmailListDescription: INodeProperties[] = [
  {
    displayName: 'List ID',
    name: 'listId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyAddToDoNotEmailList },
    hint: 'The Do-not-email List identifier that emails and domains belong to.',
  },
  {
    displayName: 'Items',
    name: 'items',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyAddToDoNotEmailList },
    hint: 'Email or domain you want to add to your Do-not-email List.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const listId = this.getNodeParameter('listId', index, '') as string || '';
  const items = this.getNodeParameter('items', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.addToDoNotEmailList,
    {
      listId,
      items: splitString(items),
    },
  );

  return this.helpers.returnJsonArray(responseData);
}

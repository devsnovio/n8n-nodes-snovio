import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const createNewProspectListDescription: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createNewProspectList'],
        resource: ['prospectManagement'],
      },
    },
    hint: 'The name of the new prospect list.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const name = this.getNodeParameter('name', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.createNewProspectList,
    { name },
  );

  return this.helpers.returnJsonArray(responseData);
}

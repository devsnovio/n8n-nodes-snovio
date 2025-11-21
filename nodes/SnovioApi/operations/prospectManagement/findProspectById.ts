import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const findProspectByIdDescription: INodeProperties[] = [
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['findProspectById'],
        resource: ['prospectManagement'],
      },
    },
    hint: 'The prospect’s id. You can see it in the response when you add a prospect via Add prospect to list API method or in the URL when you view prospect’s page.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const id = this.getNodeParameter('id', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.findProspectById,
    { id }
  );

  return this.helpers.returnJsonArray(responseData);
}

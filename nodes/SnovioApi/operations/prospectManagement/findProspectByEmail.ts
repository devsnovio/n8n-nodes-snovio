import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const findProspectByEmailDescription: INodeProperties[] = [
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['findProspectByEmail'],
        resource: ['prospectManagement'],
      },
    },
    hint: 'The prospect’s email address.',
    placeholder: 'example.com',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const email = this.getNodeParameter('email', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.findProspectByEmail,
    { email }
  );

  return this.helpers.returnJsonArray(responseData);
}

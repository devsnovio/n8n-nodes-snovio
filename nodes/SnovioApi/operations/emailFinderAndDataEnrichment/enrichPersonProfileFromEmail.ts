import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const enrichPersonProfileFromEmailDescription: INodeProperties[] = [
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['enrichPersonProfileFromEmail'],
        resource: ['emailFinderAndDataEnrichment'],
      },
    },
    hint: 'The email address of the person you want to find additional information on.',
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
    URLS.enrichPersonProfileFromEmail,
    { email },
  );

  return this.helpers.returnJsonArray(responseData);
}

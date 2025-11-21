import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const startDomainSearchDescription: INodeProperties[] = [
  {
    displayName: 'Domain Name',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['startDomainSearch'],
        resource: ['emailFinderAndDataEnrichment'],
      },
    },
    hint: 'The domain name for which you want to receive company information. For example, "snov.io".',
    placeholder: 'example.com',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const domain = this.getNodeParameter('domain', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startDomainSearch,
    { domain },
  );

  return this.helpers.returnJsonArray(responseData);
}

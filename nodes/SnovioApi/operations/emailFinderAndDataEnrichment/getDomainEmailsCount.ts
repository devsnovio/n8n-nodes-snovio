import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const getDomainEmailsCountDescription: INodeProperties[] = [
  {
    displayName: 'Domain Name',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['getDomainEmailsCount'],
        resource: ['emailFinderAndDataEnrichment'],
      },
    },
    hint: 'The name of the domain for which you`d like to know the number of emails in our database.',
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
    URLS.getDomainEmailsCount,
    { domain },
  );

  return this.helpers.returnJsonArray(responseData);
}

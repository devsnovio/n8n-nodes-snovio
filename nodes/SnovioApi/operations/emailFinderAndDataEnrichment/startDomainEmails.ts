import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyStartDomainEmails = {
  operation: ['startDomainEmails'],
  resource: ['emailFinderAndDataEnrichment'],
};

export const startDomainEmailsDescription: INodeProperties[] = [
  {
    displayName: 'Domain Name',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyStartDomainEmails },
    hint: 'Company’s domain name for which you want to find domain emails. For example, "snov.io".',
    placeholder: 'example.com',
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    displayOptions: { show: showOnlyStartDomainEmails },
    placeholder: '1',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const domain = this.getNodeParameter('domain', index, '') as string || '';
  const page = this.getNodeParameter('page', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startDomainEmails,
    {},
    { domain, page },
  );

  return this.helpers.returnJsonArray(responseData);
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyStartGenericContacts = {
  operation: ['startGenericContacts'],
  resource: ['emailFinderAndDataEnrichment'],
};

export const startGenericContactsDescription: INodeProperties[] = [
  {
    displayName: 'Domain Name',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyStartGenericContacts },
    hint: 'Company’s domain name for which you want to find generic emails. For example, "snov.io".',
    placeholder: 'example.com',
  },
  {
    displayName: 'Next ID',
    name: 'next',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyStartGenericContacts },
    hint: 'ID added to the request URL to access the next page of emails in case it exists.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const domain = this.getNodeParameter('domain', index, '') as string || '';
  const next = this.getNodeParameter('next', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startGenericContacts,
    { domain, next  },
  );

  return this.helpers.returnJsonArray(responseData);
}

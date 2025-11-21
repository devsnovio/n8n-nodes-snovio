import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import { splitString } from "../../GenericFunctions";

const showOnlyStartCompanyDomainByName = {
  operation: ['startCompanyDomainByName'],
  resource: ['emailFinderAndDataEnrichment'],
};

export const startCompanyDomainByNameDescription: INodeProperties[] = [
  {
    displayName: 'Names',
    name: 'names',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyStartCompanyDomainByName },
    hint: 'An array of company names for which you want to receive the domains. To retrieve domains for multiple companies, input an array of necessary domains, separated by a comma. You can provide up to 10 company names at the same time.',
  },
  {
    displayName: 'Webhook Url',
    name: 'webhook_url',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyStartCompanyDomainByName },
    hint: 'Enter your webhook URL to receive results instantly rather than using a hash task.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const webhook_url = this.getNodeParameter('webhook_url', index, '') as string || '';
  const names = this.getNodeParameter('names', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startCompanyDomainByName,
    { webhook_url, names: splitString(names) },
  );

  return this.helpers.returnJsonArray(responseData);
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import { splitString } from "../../GenericFunctions";

const showOnlyStartLinkedInProfileInfoFromUrls = {
  operation: ['startLinkedInProfileInfoFromUrls'],
  resource: ['emailFinderAndDataEnrichment'],
};

export const startLinkedInProfileInfoFromUrlsDescription: INodeProperties[] = [
  {
    displayName: 'Urls',
    name: 'urls',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyStartLinkedInProfileInfoFromUrls},
    hint: 'An array of LinkedIn profile URLs for which you want to receive the full profile info. To retrieve profile info for multiple LinkedIn members at the same time, add each URL in a separate parameter. You can provide up to 10 LinkedIn URLs at the same time.',
  },
  {
    displayName: 'Webhook Url',
    name: 'webhook_url',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyStartLinkedInProfileInfoFromUrls },
    hint: 'Enter your webhook URL to receive results instantly rather than using a hash task.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const webhook_url = this.getNodeParameter('webhook_url', index, '') as string || '';
  const urls = this.getNodeParameter('urls', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startLinkedInProfileInfoFromUrls,
    { webhook_url, urls: splitString(urls) },
  );

  return this.helpers.returnJsonArray(responseData);
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import { splitString } from "../../GenericFunctions";

const showOnlyStartEmailVerification = {
  operation: ['startEmailVerification'],
  resource: ['emailVerifier'],
};

export const startEmailVerificationDescription: INodeProperties[] = [
  {
    displayName: 'Emails',
    name: 'emails',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyStartEmailVerification },
    hint: 'Emails you want to verify. To verify multiple emails at the same time, add each email as a separate parameter. You can check up to 10 emails at the same time.',
  },
  {
    displayName: 'Webhook Url',
    name: 'webhook_url',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyStartEmailVerification },
    hint: 'Enter your webhook URL to receive results instantly rather than using a hash task.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const webhook_url = this.getNodeParameter('webhook_url', index, '') as string || '';
  const emails = this.getNodeParameter('emails', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startEmailVerification,
    { webhook_url, emails: splitString(emails) },
  );

  return this.helpers.returnJsonArray(responseData);
}

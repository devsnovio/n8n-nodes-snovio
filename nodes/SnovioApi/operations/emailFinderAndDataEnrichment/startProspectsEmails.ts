import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const startProspectsEmailsDescription: INodeProperties[] = [
  {
    displayName: 'Prospect Hash',
    name: 'prospect_hash',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['startProspectsEmails'],
        resource: ['emailFinderAndDataEnrichment'],
      },
    },
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const prospect_hash = this.getNodeParameter('prospect_hash', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    `${URLS.startProspectsEmails}/${prospect_hash}`,
  );

  return this.helpers.returnJsonArray(responseData);
}

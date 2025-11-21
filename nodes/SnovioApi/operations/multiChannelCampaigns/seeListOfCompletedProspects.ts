import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const seeListOfCompletedProspectsDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['seeListOfCompletedProspects'],
        resource: ['multiChannelCampaigns'],
      }
    },
    hint: 'Сampaign\'s unique identifier to retrieve the prospects list.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const campaignId = this.getNodeParameter('campaignId', index, '') as string || '';

  const responseData = await apiRequest.call(
    this,
    'GET',
    URLS.seeListOfCompletedProspects,
    {},
    { campaignId }
  );

  return this.helpers.returnJsonArray(responseData);
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export const viewCampaignProgressDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaign_id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['viewCampaignProgress'],
        resource: ['multiChannelCampaigns'],
      },
    },
    hint: 'Campaign ID. You can find it in the URL when you view the campaign info.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const campaign_id = this.getNodeParameter('campaign_id', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'GET',
    URLS.viewCampaignProgress(campaign_id),
  );

  return this.helpers.returnJsonArray(responseData);
}

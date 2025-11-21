import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlySeeCampaignRepliesProspects = {
  operation: ['seeCampaignReplies'],
  resource: ['multiChannelCampaigns'],
};

export const seeCampaignRepliesDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlySeeCampaignRepliesProspects },
    hint: 'Unique identifier of the campaign you want to view replies from.',
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlySeeCampaignRepliesProspects,
        getAllResults: [false],
      }
    },
    hint: 'You can collect up to 10,000 replies per each request. If your campaign has more replies, use offset to indicate how many previous replies you want to skip. For example, if your campaign has 20,000 replies and you want to request replies 10,001- 20,000, set the offset as 10,000. If the offset is not specified, you\'ll get the last 10,000 replies received.',
  },
  {
    displayName: 'Get All Results',
    name: 'getAllResults',
    type: 'boolean',
    displayOptions: { show: showOnlySeeCampaignRepliesProspects },
    default: false,
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const campaignId = this.getNodeParameter('campaignId', index, '') as string || '';
  const offset = this.getNodeParameter('offset', index, '') as string || '';
  const getAllResults = this.getNodeParameter('getAllResults', index, '') as boolean || false;

  const responseData = [];
  let data = [];

  do {
    data =  await apiRequest.call(
      this,
      'GET',
      URLS.seeCampaignReplies,
      {},
      { campaignId, offset },
    );
    responseData.push(...data);
  } while (getAllResults && data.length >= 10000);

  return this.helpers.returnJsonArray(responseData);
}

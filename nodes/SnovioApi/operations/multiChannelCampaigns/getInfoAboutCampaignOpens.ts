import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyGetInfoAboutCampaignOpens = {
  operation: ['getInfoAboutCampaignOpens'],
  resource: ['multiChannelCampaigns'],
};

export const getInfoAboutCampaignOpensDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyGetInfoAboutCampaignOpens },
    hint: 'Unique identifier of the campaign for which you want to view information about email opens.',
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyGetInfoAboutCampaignOpens,
        getAllResults: [false],
      }
    },
    hint: 'You can collect up to 10,000 opens per each request. If your campaign has more emails opened, use offset to indicate how many previous opens you want to skip. For example, if your campaign has 20,000 opens and you want to request opens 10,001- 20,000, set the offset as 10,000. If the offset is not specified, you\'ll get the last 10,000 opened emails.',
  },
  {
    displayName: 'Get All Results',
    name: 'getAllResults',
    type: 'boolean',
    displayOptions: { show: showOnlyGetInfoAboutCampaignOpens },
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
      URLS.getInfoAboutCampaignOpens,
      {},
      { campaignId, offset },
    );
    responseData.push(...data);
  } while (getAllResults && data.length >= 10000);

  return this.helpers.returnJsonArray(responseData);
}

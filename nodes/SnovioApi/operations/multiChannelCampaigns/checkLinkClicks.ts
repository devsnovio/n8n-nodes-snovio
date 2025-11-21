import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyCheckLinkClicks = {
  operation: ['checkLinkClicks'],
  resource: ['multiChannelCampaigns'],
};

export const checkLinkClicksDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyCheckLinkClicks },
    hint: 'Unique identifier of the campaign you want to view link clicks for.',
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyCheckLinkClicks,
        getAllResults: [false],
      }
    },
    hint: 'You can collect up to 10,000 clicks per each request. If your campaign has more clicks, use offset to indicate how many previous clicks you want to skip. For example, if your campaign has 20,000 clicks and you want to request clicks 10,001- 20,000, set the offset as 10,000. If the offset is not specified, you\'ll get the last 10,000 emails that clicked a link within the campaign.',
  },
  {
    displayName: 'Get All Results',
    name: 'getAllResults',
    type: 'boolean',
    displayOptions: { show: showOnlyCheckLinkClicks },
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
      URLS.checkLinkClicks,
      {},
      { campaignId, offset },
    );
    responseData.push(...data);
  } while (getAllResults && data.length >= 10000);

  return this.helpers.returnJsonArray(responseData);
}


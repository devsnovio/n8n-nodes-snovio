import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyViewSentEmails = {
  operation: ['viewSentEmails'],
  resource: ['multiChannelCampaigns'],
};

export const viewSentEmailsDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyViewSentEmails },
    hint: 'Unique identifier of the campaign for which you want to see sent emails.',
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyViewSentEmails,
        getAllResults: [false],
      }
    },
    hint: 'You can collect up to 10,000 sent emails per each request. If your campaign sent more emails, use offset to indicate how many previous emails you want to skip. For example, if your campaign has 20,000 sent emails and you want to request emails 10,001- 20,000, set the offset as 10,000. If the offset is not specified, you\'ll get the last 10,000 emails that were sent within the campaign.',
  },
  {
    displayName: 'Get All Results',
    name: 'getAllResults',
    type: 'boolean',
    displayOptions: { show: showOnlyViewSentEmails },
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
      URLS.viewSentEmails,
      {},
      { campaignId, offset },
    );
    responseData.push(...data);
  } while (getAllResults && data.length >= 10000);

  return this.helpers.returnJsonArray(responseData);
}

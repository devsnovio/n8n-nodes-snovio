import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import { splitString } from "../../GenericFunctions";

const showOnlyGetCampaignAnalytics = {
  operation: ['getCampaignAnalytics'],
  resource: ['multiChannelCampaigns'],
};

export const getCampaignAnalyticsDescription: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaign_id',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyGetCampaignAnalytics },
    hint: 'Campaign ID. You can find it in the URL when you view the campaign info. If you leave this field empty, you’ll get data for all active campaigns within the specified time period.',
  },
  {
    displayName: 'Sender Email',
    name: 'sender_email',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyGetCampaignAnalytics },
    hint: 'Email sender account ID. You can find it in the URL when viewing or editing the email account info. To see analytics for multiple email accounts, separate IDs with commas. Alternatively, leave this parameter empty if you don’t want to apply an email account filter.',
  },
  {
    displayName: 'Sender Linkedin',
    name: 'sender_linkedin',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyGetCampaignAnalytics },
    hint: 'LinkedIn sender account ID. You can find it in the URL when viewing or editing the LinkedIn account info. To see analytics for multiple accounts, separate IDs with commas. Leave this parameter empty if you don’t want to apply a LinkedIn account filter.',
  },
  {
    displayName: 'Campaign Owner',
    name: 'campaign_owner',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyGetCampaignAnalytics },
    hint: 'To view campaign data for a specific team member, enter their email address. To filter by multiple campaign owners, list the email addresses separated by commas (no spaces).',
    placeholder: 'example1@gmail.com,example2@gmail.com',
  },
  {
    displayName: 'Date From',
    name: 'date_from',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyGetCampaignAnalytics },
    hint: 'The start date of the period for which you want to receive statistics. Format: yyyy-mm-dd. Leave empty to receive statistics for all time.',
    placeholder: 'yyyy-mm-dd',
  },
  {
    displayName: 'Date To',
    name: 'date_to',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyGetCampaignAnalytics },
    hint: 'The end date of the period for which you want to receive statistics. Format: yyyy-mm-dd. Leave empty to receive statistics for all time.',
    placeholder: 'yyyy-mm-dd',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const campaign_id = this.getNodeParameter('campaign_id', index, '') as string || '';
  const sender_email = this.getNodeParameter('sender_email', index, '') as string || '';
  const sender_linkedin = this.getNodeParameter('sender_linkedin', index, '') as string || '';
  const campaign_owner = this.getNodeParameter('campaign_owner', index, '') as string || '';
  const date_from = this.getNodeParameter('date_from', index, '') as string || '';
  const date_to = this.getNodeParameter('date_to', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'GET',
    URLS.getCampaignAnalytics,
    {},
    {
      date_from,
      date_to,
      campaign_id: splitString(campaign_id),
      sender_email: splitString(sender_email),
      sender_linkedin: splitString(sender_linkedin),
      campaign_owner: splitString(campaign_owner),
    },
  );

  return this.helpers.returnJsonArray(responseData);
}

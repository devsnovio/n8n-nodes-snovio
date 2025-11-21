import type { INodeProperties } from 'n8n-workflow';
import { getCampaignAnalyticsDescription } from "./getCampaignAnalytics";
import { viewCampaignProgressDescription } from "./viewCampaignProgress";
import { changeRecipientsStatusDescription } from "./changeRecipientsStatus";
import { seeListOfCompletedProspectsDescription } from "./seeListOfCompletedProspects";
import { seeCampaignRepliesDescription } from "./seeCampaignReplies";
import { getInfoAboutCampaignOpensDescription } from "./getInfoAboutCampaignOpens";
import { checkLinkClicksDescription } from "./checkLinkClicks";
import { viewSentEmailsDescription } from "./viewSentEmails";
import { addToDoNotEmailListDescription } from "./addToDoNotEmailList";

export const multiChannelCampaignsDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['multiChannelCampaigns'] },
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: 'Get Campaign Analytics',
        value: 'getCampaignAnalytics',
        action: 'Get campaign analytics',
      },
      {
        name: 'View Campaign Progress',
        value: 'viewCampaignProgress',
        action: 'View campaign progress',
      },
      {
        name: 'Change Recipient’s Status',
        value: 'changeRecipientsStatus',
        action: 'Change recipient s status',
      },
      {
        name: 'See List of Completed Prospects',
        value: 'seeListOfCompletedProspects',
        action: 'See list of completed prospects',
      },
      {
        name: 'See Campaign Replies',
        value: 'seeCampaignReplies',
        action: 'See campaign replies',
      },
      {
        name: 'Get Info About Campaign Opens',
        value: 'getInfoAboutCampaignOpens',
        action: 'Get info about campaign opens',
      },
      {
        name: 'Check Link Clicks',
        value: 'checkLinkClicks',
        action: 'Check link clicks',
      },
      {
        name: 'View Sent Emails',
        value: 'viewSentEmails',
        action: 'View sent emails',
      },
      {
        name: 'View All Campaigns',
        value: 'viewAllCampaigns',
        action: 'View all campaigns',
      },
      {
        name: 'Add to Do-Not-Email List',
        value: 'addToDoNotEmailList',
        action: 'Add to do not email list',
      },
    ],
    default: 'getCampaignAnalytics',
  },
  ...getCampaignAnalyticsDescription,
  ...viewCampaignProgressDescription,
  ...changeRecipientsStatusDescription,
  ...seeListOfCompletedProspectsDescription,
  ...seeCampaignRepliesDescription,
  ...getInfoAboutCampaignOpensDescription,
  ...checkLinkClicksDescription,
  ...viewSentEmailsDescription,
  ...addToDoNotEmailListDescription,
];

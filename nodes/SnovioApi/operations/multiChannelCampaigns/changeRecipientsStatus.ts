import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyChangeRecipientsStatus = {
  operation: ['changeRecipientsStatus'],
  resource: ['multiChannelCampaigns'],
};

export const changeRecipientsStatusDescription: INodeProperties[] = [
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyChangeRecipientsStatus },
    hint: 'The prospect’s email address.',
    placeholder: 'example.com',
  },
  {
    displayName: 'Campaign ID',
    name: 'campaign_id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyChangeRecipientsStatus },
    hint: 'Campaign ID. You can find it in the URL when you view the campaign info.',
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    required: true,
    displayOptions: { show: showOnlyChangeRecipientsStatus },
    hint: 'You can not change the recipients\' status if their status is Finished or Moved',
    options: [
      {
        name: 'Active',
        value: 'Active',
      },
      {
        name: 'Paused',
        value: 'Paused',
      },
      {
        name: 'Unsubscribed',
        value: 'Unsubscribed',
      },
    ],
    default: 'Active',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const campaign_id = this.getNodeParameter('campaign_id', index, '') as string || '';
  const email = this.getNodeParameter('email', index, '') as string || '';
  const status = this.getNodeParameter('status', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.changeRecipientsStatus,
    { campaign_id, email, status },
  );

  return this.helpers.returnJsonArray(responseData);
}

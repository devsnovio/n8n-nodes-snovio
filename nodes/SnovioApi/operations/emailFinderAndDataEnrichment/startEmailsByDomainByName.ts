import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyStartEmailsByDomainByName = {
  operation: ['startEmailsByDomainByName'],
  resource: ['emailFinderAndDataEnrichment'],
};

export const startEmailsByDomainByNameDescription: INodeProperties[] = [
  {
    displayName: 'Rows',
    name: 'rows',
    required: true,
    type: 'collection',
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: 'Add Row',
    },
    displayOptions: { show: showOnlyStartEmailsByDomainByName},
    default: { first_name: '', last_name: '', domain: '' },
    hint: 'An array of objects that contain prospect details (first name, last name and domain). Each request can have up to 10 objects.',
    options: [
      {
        displayName: 'First Name',
        name: 'first_name',
        type: 'string',
        default: '',
        description: 'Prospect’s first name',
      },
      {
        displayName: 'Last Name',
        name: 'last_name',
        type: 'string',
        default: '',
        description: 'Prospect’s last name',
      },
      {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        default: '',
        description: 'The domain of the company for which the prospect works',
      },
    ],
  },
  {
    displayName: 'Webhook Url',
    name: 'webhook_url',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyStartEmailsByDomainByName},
    hint: 'Enter your webhook URL to receive results instantly rather than using a hash task.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const rows = this.getNodeParameter('rows', index, '') as Array<object> || [];
  const webhook_url = this.getNodeParameter('webhook_url', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startEmailsByDomainByName,
    { rows, webhook_url },
  );

  return this.helpers.returnJsonArray(responseData);
}

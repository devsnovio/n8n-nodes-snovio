import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../../transport";

const showOnlyForRequestWithTaskHashParam = {
  operation: [
    'getDomainSearchResult',
    'getProspectProfilesResult',
    'getProspectEmailSearchResult',
    'getDomainEmailsResult',
    'getGenericContactsResult',
    'getEmailsByDomainByNameResult',
    'getCompanyDomainByNameResult',
    'getLinkedInProfileInfoFromUrls',
  ],
  resource: ['emailFinderAndDataEnrichment'],
};

export const requestsWithTaskHashParamDescription: INodeProperties[] = [
  {
    displayName: 'Task Hash',
    name: 'task_hash',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForRequestWithTaskHashParam },
    hint: 'Unique ID for the search task you started.',
  },
  {
    displayName: 'Wait Until Status Is Completed',
    name: 'waitStatusCompleted',
    type: 'hidden',
    displayOptions: { show: showOnlyForRequestWithTaskHashParam },
    default: false,
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
  endpoint: string,
  taskHashInQuery: boolean = false,
): Promise<INodeExecutionData[]> {
  const task_hash = this.getNodeParameter('task_hash', index, '') as string;
  const waitStatusCompleted = this.getNodeParameter('waitStatusCompleted', index, '') as boolean;

  const params = {
    endpoint: taskHashInQuery ? endpoint : `${endpoint}/${task_hash}`,
    task_hash: taskHashInQuery ? { task_hash } : {},
  };
  let responseData;

  do {
    responseData =  await apiRequest.call(
      this,
      'GET',
      params.endpoint,
      {},
      params.task_hash,
    );
  } while (responseData.status === 'in_progress' && waitStatusCompleted);

  return this.helpers.returnJsonArray(responseData);
}

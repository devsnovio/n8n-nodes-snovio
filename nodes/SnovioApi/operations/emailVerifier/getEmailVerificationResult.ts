import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

const showOnlyGetEmailVerificationResult = {
  operation: ['getEmailVerificationResult'],
  resource: ['emailVerifier'],
};

export const getEmailVerificationResultDescription: INodeProperties[] = [
  {
    displayName: 'Task Hash',
    name: 'task_hash',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyGetEmailVerificationResult },
    hint: 'Unique ID for the search task you started.',
  },
  {
    displayName: 'Wait Until Status Is Completed',
    name: 'waitStatusCompleted',
    type: 'hidden',
    displayOptions: { show: showOnlyGetEmailVerificationResult },
    default: false,
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const task_hash = this.getNodeParameter('task_hash', index, '') as string;
  const waitStatusCompleted = this.getNodeParameter('waitStatusCompleted', index, '') as boolean;

  let responseData;

  do {
    responseData =  await apiRequest.call(
      this,
      'GET',
      URLS.getEmailVerificationResult,
      {},
      { task_hash },
    );
  } while (responseData.status === 'in_progress' && waitStatusCompleted);

  return this.helpers.returnJsonArray(responseData);
}

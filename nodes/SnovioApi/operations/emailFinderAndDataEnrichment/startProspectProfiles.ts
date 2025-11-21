import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import { splitString } from "../../GenericFunctions";

const showOnlyStartProspectProfiles = {
  operation: ['startProspectProfiles'],
  resource: ['emailFinderAndDataEnrichment'],
};

export const startProspectsProfileDescription: INodeProperties[] = [
  {
    displayName: 'Domain Name',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyStartProspectProfiles},
    hint: 'The domain name you want to find prospect profiles for. For example, "snov.io".',
    placeholder: 'example.com',
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    required: true,
    displayOptions: { show: showOnlyStartProspectProfiles},
    hint: 'Page number that contains prospect profiles. Each page shows up to 20 profiles.',
    placeholder: '0',
  },
  {
    displayName: 'Positions',
    name: 'positions',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyStartProspectProfiles},
    hint: 'Use this parameter to filter prospects by job position, for example, "Software Developer". To filter by multiple positions, input an array of necessary positions, separated by a comma. You can filter by up to 10 positions per request.',
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const domain = this.getNodeParameter('domain', index, '') as string || '';
  const positions = this.getNodeParameter('positions', index, '') as string || '';
  const page = this.getNodeParameter('page', index, '') as string || '';

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.startProspectProfiles,
    { domain, page, positions: splitString(positions) },
  );

  return this.helpers.returnJsonArray(responseData);
}

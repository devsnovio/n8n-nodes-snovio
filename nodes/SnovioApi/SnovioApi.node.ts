import {
  IExecuteFunctions,
  INodeType,
  INodeTypeDescription,
  NodeConnectionTypes,
} from 'n8n-workflow';
import { userAccountDescription } from './operations/userAccount';
import { emailFinderAndDataEnrichmentDescription } from "./operations/emailFinderAndDataEnrichment";
import { emailVerifierDescription } from "./operations/emailVerifier";
import { multiChannelCampaignsDescription } from "./operations/multiChannelCampaigns";
import { prospectManagementDescription } from "./operations/prospectManagement";
import { router } from "./transport/router";

export class SnovioApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Snov.io API',
    name: 'snovioApi',
    group: ['sales', 'marketing'],
    version: 1,
    subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'B2B email finder, lead generation, and multi-channel outreach automation',
    defaults: {
      name: 'Snov.io API',
    },
    icon: 'file:../../icons/snovio.svg',
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    usableAsTool: true,
    credentials: [
      {
        name: 'snovioApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        required: true,
        options: [
          {
            name: 'Email Finder & Data Enrichment',
            value: 'emailFinderAndDataEnrichment',
          },
          {
            name: 'Email Verifier',
            value: 'emailVerifier',
          },
          {
            name: 'Multi-Channel Campaign',
            value: 'multiChannelCampaigns',
          },
          {
            name: 'Prospect Management',
            value: 'prospectManagement',
          },
          {
            name: 'User Account',
            value: 'userAccount',
          },
        ],
        default: 'emailFinderAndDataEnrichment',
      },
      ...emailFinderAndDataEnrichmentDescription,
      ...emailVerifierDescription,
      ...multiChannelCampaignsDescription,
      ...prospectManagementDescription,
      ...userAccountDescription,
    ],
  };
  async execute(this: IExecuteFunctions) {
    return await router.call(this);
  }
}

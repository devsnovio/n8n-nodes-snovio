import type { INodeProperties } from 'n8n-workflow';
import { requestsWithTaskHashParamDescription } from "./shared/requestsWithTaskHashParam";
import { startDomainSearchDescription } from "./startDomainSearch";
import { startDomainEmailsDescription } from "./startDomainEmails";
import { startGenericContactsDescription } from "./startGenericContacts";
import { startProspectsProfileDescription } from "./startProspectProfiles";
import { getDomainEmailsCountDescription } from "./getDomainEmailsCount";
import { startEmailsByDomainByNameDescription } from "./startEmailsByDomainByName";
import { startCompanyDomainByNameDescription } from "./startCompanyDomainByName";
import { startLinkedInProfileInfoFromUrlsDescription } from "./startLinkedInProfileInfoFromUrls";
import { enrichPersonProfileFromEmailDescription } from "./enrichPersonProfileFromEmail";
import { startProspectsEmailsDescription } from "./startProspectsEmails";

export const emailFinderAndDataEnrichmentDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['emailFinderAndDataEnrichment'],
      },
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: 'Start Domain Search',
        value: 'startDomainSearch',
        action: 'Start domain search',
      },
      {
        name: 'Get Domain Search Result',
        value: 'getDomainSearchResult',
        action: 'Get domain search result',
      },
      {
        name: 'Start Prospect Profiles',
        value: 'startProspectProfiles',
        action: 'Start prospect profiles',
      },
      {
        name: 'Get Prospect Profiles Result',
        value: 'getProspectProfilesResult',
        action: 'Get prospect profiles result',
      },
      {
        name: 'Start Prospects Emails',
        value: 'startProspectsEmails',
        action: 'Start prospects emails',
      },
      {
        name: 'Get Prospect Email Search Result',
        value: 'getProspectEmailSearchResult',
        action: 'Get prospect email search result',
      },
      {
        name: 'Start Domain Emails',
        value: 'startDomainEmails',
        action: 'Start domain emails',
      },
      {
        name: 'Get Domain Emails Result',
        value: 'getDomainEmailsResult',
        action: 'Get domain emails result',
      },
      {
        name: 'Start Generic Contacts',
        value: 'startGenericContacts',
        action: 'Start generic contacts',
      },
      {
        name: 'Get Generic Contacts Result',
        value: 'getGenericContactsResult',
        action: 'Get generic contacts result',
      },
      {
        name: 'Get Domain Emails Count',
        value: 'getDomainEmailsCount',
        action: 'Get domain emails count',
      },
      {
        name: 'Start Emails by Domain by Name',
        value: 'startEmailsByDomainByName',
        action: 'Start emails by domain by name',
      },
      {
        name: 'Get Emails by Domain by Name Result',
        value: 'getEmailsByDomainByNameResult',
        action: 'Get emails by domain by name result',
      },
      {
        name: 'Start Company Domain by Name',
        value: 'startCompanyDomainByName',
        action: 'Start company domain by name',
      },
      {
        name: 'Get Company Domain by Name Result',
        value: 'getCompanyDomainByNameResult',
        action: 'Get company domain by name result',
      },
      {
        name: 'Start LinkedIn Profile Info From URLs',
        value: 'startLinkedInProfileInfoFromUrls',
        action: 'Start linked in profile info from urls',
      },
      {
        name: 'Get LinkedIn Profile Info From URLs',
        value: 'getLinkedInProfileInfoFromUrls',
        action: 'Get linked in profile info from urls',
      },
      {
        name: 'Enrich Person Profile From Email',
        value: 'enrichPersonProfileFromEmail',
        action: 'Enrich person profile from email',
      },
    ],
    default: 'startDomainSearch',
  },
  ...requestsWithTaskHashParamDescription,
  ...startDomainSearchDescription,
  ...startDomainEmailsDescription,
  ...startGenericContactsDescription,
  ...startProspectsProfileDescription,
  ...startProspectsEmailsDescription,
  ...getDomainEmailsCountDescription,
  ...startEmailsByDomainByNameDescription,
  ...startCompanyDomainByNameDescription,
  ...startLinkedInProfileInfoFromUrlsDescription,
  ...enrichPersonProfileFromEmailDescription,
];

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";
import { splitString } from "../../GenericFunctions";

const showOnlyAddProspectToList = {
  operation: ['addProspectToList'],
  resource: ['prospectManagement'],
};

export const addProspectToListDescription: INodeProperties[] = [
  {
    displayName: 'listId',
    name: 'listId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The identifier of the list the prospect belongs to.',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s email address.',
    placeholder: 'example.com',
  },
  {
    displayName: 'fullName',
    name: 'fullName',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s full name.',
  },
  {
    displayName: 'firstName',
    name: 'firstName',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s first name.',
  },
  {
    displayName: 'lastName',
    name: 'lastName',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s last name.',
  },
  {
    displayName: 'Phones',
    name: 'phones',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'Array with prospect\'s phone numbers.',
  },
  {
    displayName: 'Country',
    name: 'country',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s country. The country names are defined <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="_blank">here</a>. Please, only use countries from this list.',
  },
  {
    displayName: 'Locality',
    name: 'locality',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s locality.',
  },
  {
    displayName: 'Position',
    name: 'position',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s job title.',
  },
  {
    displayName: 'companyName',
    name: 'companyName',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The name of the prospect’s company.',
  },
  {
    displayName: 'companySite',
    name: 'companySite',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'The prospect’s company website. Please, use the http://example.com format.',
    placeholder: 'http://example.com',
  },
  {
    displayName: 'updateContact',
    name: 'updateContact',
    type: 'boolean',
    default: false,
    displayOptions: { show: showOnlyAddProspectToList},
    hint: 'Updates an existing prospect. Can contain true , or false . If true and a prospect with this email address already exists in one of the lists, the system will update the existing profile. If false , the system will not update the existing profile.',
    placeholder: 'http://example.com',
  },
  {
    displayName: 'socialLinks',
    name: 'socialLinks',
    type: 'collection',
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: 'Add social link',
    },
    displayOptions: {
      show: showOnlyAddProspectToList,
    },
    default: { socialName: '', socialLink: '' },
    options: [
      {
        displayName: 'Name of the Social Network',
        name: 'socialName',
        type: 'string',
        default: '',
        hint: 'Specify the name of the social network (linkedIn, facebook, or X)'
      },
      {
        displayName: 'Link of the Social Network',
        name: 'socialLink',
        type: 'string',
        default: '',
        hint: 'A link to the prospect’s social media profile'
      },
    ],
  },
  {
    displayName: 'customFields',
    name: 'customFields',
    type: 'collection',
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: 'Add social custom field',
    },
    displayOptions: {
      show: showOnlyAddProspectToList,
    },
    default: { customFieldName: '', customFieldValue: '' },
    options: [
      {
        displayName: 'Name of the Custom Field',
        name: 'customFieldName',
        type: 'string',
        default: '',
        hint: 'Specify the name of the previously created custom field'
      },
      {
        displayName: 'Value of the Custom Field',
        name: 'customFieldValue',
        type: 'string',
        default: '',
        hint: 'You can add custom value into previously created custom field'
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const listId = this.getNodeParameter('listId', index, '') as string || '';
  const email = this.getNodeParameter('email', index, '') as string || '';
  const fullName = this.getNodeParameter('fullName', index, '') as string || '';
  const firstName = this.getNodeParameter('firstName', index, '') as string || '';
  const lastName = this.getNodeParameter('lastName', index, '') as string || '';
  const locality = this.getNodeParameter('locality', index, '') as string || '';
  const position = this.getNodeParameter('position', index, '') as string || '';
  const companyName = this.getNodeParameter('companyName', index, '') as string || '';
  const companySite = this.getNodeParameter('companySite', index, '') as string || '';
  const updateContact = this.getNodeParameter('updateContact', index, '') as boolean || false;
  const phones = this.getNodeParameter('phones', index, '') as string || '';
  const socialLinksArr = this.getNodeParameter('socialLinks', index, '') as Array<Record<string, string>> || [];
  const customFieldsArr = this.getNodeParameter('customFields', index, '') as Array<Record<string, string>> || [];

  const socialLinks = socialLinksArr.reduce((a, b) => ({ ...a, [b.socialName]: b.socialLink}), {});
  const customFields = customFieldsArr.reduce((a, b) => ({ ...a, [b.customFieldName]: b.customFieldValue}), {});

  const responseData =  await apiRequest.call(
    this,
    'POST',
    URLS.addProspectToList,
    {
      listId,
      email,
      fullName,
      firstName,
      lastName,
      locality,
      position,
      companyName,
      companySite,
      updateContact,
      socialLinks,
      customFields,
      phones: splitString(phones),
    },
  );

  return this.helpers.returnJsonArray(responseData);
}

import type {
  IAuthenticateGeneric,
  ICredentialDataDecryptedObject,
  ICredentialTestRequest,
  ICredentialType,
  IHttpRequestHelper,
  INodeProperties,
  Icon,
} from 'n8n-workflow';

export class SnovioApi implements ICredentialType {
  name = 'snovioApi';

  displayName = 'Snov.io API';

  documentationUrl = 'https://snov.io/api';

  icon: Icon = 'file:../icons/snovio.svg';

  properties: INodeProperties[] = [
    {
      displayName: 'Session Token',
      name: 'sessionToken',
      type: 'hidden',
      typeOptions: {
        expirable: true,
        password: true,
      },
      default: '',
    },
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'client_credentials',
    },
    {
      displayName: 'API User ID',
      name: 'clientId',
      type: 'string',
      default: '',
    },
    {
      displayName: 'API Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
    },
  ];

  async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
    const { access_token } = (await this.helpers.httpRequest({
      method: 'POST',
      baseURL: 'https://api.snov.io',
      url: '/v1/oauth/access_token',
      body: {
        grant_type: credentials.grantType,
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })) as { access_token: string };
    return { sessionToken: access_token };
  }

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.sessionToken}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.snov.io',
      url: '/v1/get-balance',
    },
  };
}

import type {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
} from 'n8n-workflow';
import URLS from '../transport/urls';

export async function apiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  query: IDataObject = {},
) {
  const options: IHttpRequestOptions = {
    headers: { 'Content-Type': 'application/json'},
    method,
    body,
    qs: query,
    baseURL: URLS.BASE_URL,
    url: endpoint,
    json: true,
  };

  Object.entries(options.body).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && !value.trim().length)) delete options.body[key];
  })

  if (!Object.keys(body as IDataObject).length) {
    delete options.body;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }

  return await this.helpers.httpRequestWithAuthentication.call(this, 'snovioApi', options);
}

import type { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { apiRequest } from "../../transport";
import URLS from "../../transport/urls";

export async function execute(
  this: IExecuteFunctions
): Promise<INodeExecutionData[]> {
  const responseData = await apiRequest.call(
    this,
    'GET',
    URLS.viewAllCampaigns,
  )

  return this.helpers.returnJsonArray(responseData);
}

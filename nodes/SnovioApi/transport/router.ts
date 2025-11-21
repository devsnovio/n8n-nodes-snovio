import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import URLS from "./urls";
import * as executeApiWithTaskHas from "../operations/emailFinderAndDataEnrichment/shared/requestsWithTaskHashParam";
import * as startDomainSearch from "../operations/emailFinderAndDataEnrichment/startDomainSearch";
import * as startProspectProfiles from "../operations/emailFinderAndDataEnrichment/startProspectProfiles";
import * as startDomainEmails from "../operations/emailFinderAndDataEnrichment/startDomainEmails";
import * as startGenericContacts from "../operations/emailFinderAndDataEnrichment/startGenericContacts";
import * as startProspectsEmails from "../operations/emailFinderAndDataEnrichment/startProspectsEmails";
import * as getDomainEmailsCount from "../operations/emailFinderAndDataEnrichment/getDomainEmailsCount";
import * as startEmailsByDomainByName from "../operations/emailFinderAndDataEnrichment/startEmailsByDomainByName";
import * as startCompanyDomainByName from "../operations/emailFinderAndDataEnrichment/startCompanyDomainByName";
import * as startLinkedInProfileInfoFromUrls from "../operations/emailFinderAndDataEnrichment/startLinkedInProfileInfoFromUrls";
import * as enrichPersonProfileFromEmail from "../operations/emailFinderAndDataEnrichment/enrichPersonProfileFromEmail";
import * as startEmailVerification from "../operations/emailVerifier/startEmailVerification";
import * as getEmailVerificationResult from "../operations/emailVerifier/getEmailVerificationResult";
import * as getCampaignAnalytics from "../operations/multiChannelCampaigns/getCampaignAnalytics";
import * as viewCampaignProgress from "../operations/multiChannelCampaigns/viewCampaignProgress";
import * as changeRecipientsStatus from "../operations/multiChannelCampaigns/changeRecipientsStatus";
import * as seeListOfCompletedProspects from "../operations/multiChannelCampaigns/seeListOfCompletedProspects";
import * as seeCampaignReplies from "../operations/multiChannelCampaigns/seeCampaignReplies";
import * as getInfoAboutCampaignOpens from "../operations/multiChannelCampaigns/getInfoAboutCampaignOpens";
import * as checkLinkClicks from "../operations/multiChannelCampaigns/checkLinkClicks";
import * as viewSentEmails from "../operations/multiChannelCampaigns/viewSentEmails";
import * as viewAllCampaigns from "../operations/multiChannelCampaigns/viewAllCampaigns";
import * as addToDoNotEmailList from "../operations/multiChannelCampaigns/addToDoNotEmailList";
import * as addProspectToList from "../operations/prospectManagement/addProspectToList";
import * as findProspectById from "../operations/prospectManagement/findProspectById";
import * as findProspectByEmail from "../operations/prospectManagement/findProspectByEmail";
import * as findProspectsCustomFields from "../operations/prospectManagement/findProspectsCustomFields";
import * as seeUserLists from "../operations/prospectManagement/seeUserLists";
import * as viewProspectsInList from "../operations/prospectManagement/viewProspectsInList";
import * as createNewProspectList from "../operations/prospectManagement/createNewProspectList";
import * as checkUserBalance from "../operations/userAccount/checkUserBalance";

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const operationResult: INodeExecutionData[] = [];
  let responseData: INodeExecutionData[] = [];

  const items = this.getInputData();
  const resource = this.getNodeParameter('resource', 0);
  const operation = this.getNodeParameter('operation', 0);


  for (let i = 0; i < items.length; i++) {
    switch (operation) {
      case 'startDomainSearch':
        responseData = await startDomainSearch.execute.call(this, i);
        break;
      case 'getDomainSearchResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getDomainSearchResult);
        break;
      case 'startProspectProfiles':
        responseData = await startProspectProfiles.execute.call(this, i);
        break;
      case 'getProspectProfilesResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getProspectProfilesResult);
        break;
      case 'startProspectsEmails':
        responseData = await startProspectsEmails.execute.call(this, i);
        break;
      case 'getProspectEmailSearchResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getProspectEmailSearchResult);
        break;
      case 'startDomainEmails':
        responseData = await startDomainEmails.execute.call(this, i);
        break;
      case 'getDomainEmailsResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getDomainEmailsResult);
        break;
      case 'startGenericContacts':
        responseData = await startGenericContacts.execute.call(this, i);
        break;
      case 'getGenericContactsResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getGenericContactsResult);
        break;
      case 'getDomainEmailsCount':
        responseData = await getDomainEmailsCount.execute.call(this, i);
        break;
      case 'startEmailsByDomainByName':
        responseData = await startEmailsByDomainByName.execute.call(this, i);
        break;
      case 'getEmailsByDomainByNameResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getEmailsByDomainByNameResult, true);
        break;
      case 'startCompanyDomainByName':
        responseData = await startCompanyDomainByName.execute.call(this, i);
        break;
      case 'getCompanyDomainByNameResult':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getCompanyDomainByNameResult, true);
        break;
      case 'startLinkedInProfileInfoFromUrls':
        responseData = await startLinkedInProfileInfoFromUrls.execute.call(this, i);
        break;
      case 'getLinkedInProfileInfoFromUrls':
        responseData = await executeApiWithTaskHas.execute.call(this, i, URLS.getLinkedInProfileInfoFromUrls, true);
        break;
      case 'enrichPersonProfileFromEmail':
        responseData = await enrichPersonProfileFromEmail.execute.call(this, i);
        break;
      case 'startEmailVerification':
        responseData = await startEmailVerification.execute.call(this, i);
        break;
      case 'getEmailVerificationResult':
        responseData = await getEmailVerificationResult.execute.call(this, i);
        break;
      case 'getCampaignAnalytics':
        responseData = await getCampaignAnalytics.execute.call(this, i);
        break;
      case 'viewCampaignProgress':
        responseData = await viewCampaignProgress.execute.call(this, i);
        break;
      case 'changeRecipientsStatus':
        responseData = await changeRecipientsStatus.execute.call(this, i);
        break;
      case 'seeListOfCompletedProspects':
        responseData = await seeListOfCompletedProspects.execute.call(this, i);
        break;
      case 'seeCampaignReplies':
        responseData = await seeCampaignReplies.execute.call(this, i);
        break;
      case 'getInfoAboutCampaignOpens':
        responseData = await getInfoAboutCampaignOpens.execute.call(this, i);
        break;
      case 'checkLinkClicks':
        responseData = await checkLinkClicks.execute.call(this, i);
        break;
      case 'viewSentEmails':
        responseData = await viewSentEmails.execute.call(this, i);
        break;
      case 'viewAllCampaigns':
        responseData = await viewAllCampaigns.execute.call(this);
        break;
      case 'addToDoNotEmailList':
        responseData = await addToDoNotEmailList.execute.call(this, i);
        break;
      case 'addProspectToList':
        responseData = await addProspectToList.execute.call(this, i);
        break;
      case 'findProspectById':
        responseData = await findProspectById.execute.call(this, i);
        break;
      case 'findProspectByEmail':
        responseData = await findProspectByEmail.execute.call(this, i);
        break;
      case 'findProspectsCustomFields':
        responseData = await findProspectsCustomFields.execute.call(this);
        break;
      case 'seeUserLists':
        responseData = await seeUserLists.execute.call(this);
        break;
      case 'viewProspectsInList':
        responseData = await viewProspectsInList.execute.call(this, i);
        break;
      case 'createNewProspectList':
        responseData = await createNewProspectList.execute.call(this, i);
        break;
      case 'checkUserBalance':
        responseData = await checkUserBalance.execute.call(this);
        break;
      default:
        throw new NodeOperationError(
          this.getNode(),
          `The resource "${resource}" is not supported!`,
        );
    }

    const executionData = this.helpers.constructExecutionMetaData(responseData, {
      itemData: { item: i },
    });

    operationResult.push(...executionData);
  }

  return [operationResult];
}

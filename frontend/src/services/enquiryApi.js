// Integration Adapter for VedicPanditji Enquiry Submissions
// Delegates directly to centralized n8n webhook service
import { submitEnquiryToWebhook } from './webhookService';

export async function submitEnquiryToServer(enquiryPayload) {
  return submitEnquiryToWebhook(enquiryPayload);
}

export { submitEnquiryToWebhook };

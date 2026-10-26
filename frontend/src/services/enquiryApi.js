// Clean Integration Layer for VedicPanditji Enquiry Submissions
// Supports future backend / WordPress / Headless CMS endpoint via VITE_ENQUIRY_API_URL.
// When no endpoint is configured, it operates honestly in local draft mode without faking server delivery.

export async function submitEnquiryToServer(enquiryPayload) {
  // Check if an external API endpoint is configured in the environment
  const apiUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_ENQUIRY_API_URL;

  // 1. If no remote endpoint is configured, return clean draft status honestly
  if (!apiUrl) {
    return {
      success: false,
      isServerConfigured: false,
      isDraftOnly: true,
      message: 'No remote enquiry server is currently configured. Enquiry has been saved to your browser session only.',
      data: null
    };
  }

  // 2. If a remote endpoint is configured, send the enquiry via POST
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(enquiryPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        isServerConfigured: true,
        isDraftOnly: true,
        error: `Server responded with status ${response.status}: ${errorText}`,
        message: 'Could not transmit enquiry to server. Saved locally as fallback.'
      };
    }

    const data = await response.json();
    return {
      success: true,
      isServerConfigured: true,
      isDraftOnly: false,
      message: 'Enquiry received by server. Panditji team will confirm availability.',
      data
    };
  } catch (error) {
    return {
      success: false,
      isServerConfigured: true,
      isDraftOnly: true,
      error: error.message,
      message: 'Network error communicating with enquiry server. Enquiry saved locally as fallback.'
    };
  }
}

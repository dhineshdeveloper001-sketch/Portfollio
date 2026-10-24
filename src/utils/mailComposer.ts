import { CONTACT_FORM_ENDPOINT, identity } from "../data/portfolioData";

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SendResult {
  success: boolean;
  type: "mailto" | "post";
  message: string;
}

/**
 * Handles sending a message through either a POST endpoint (if configured)
 * or falls back to an encoded mailto: URL.
 */
export async function sendContactMessage(data: ContactFormData): Promise<SendResult> {
  const { name, email, subject, message } = data;

  if (CONTACT_FORM_ENDPOINT) {
    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject: subject || `Portfolio Inquiry from ${name}`,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return {
        success: true,
        type: "post",
        message: "Message delivered directly to Dhinesh's inbox!",
      };
    } catch {
      // If endpoint fails, fall back to mailto
      return triggerMailto(data);
    }
  }

  // Fallback to mailto
  return triggerMailto(data);
}

function triggerMailto(data: ContactFormData): SendResult {
  const targetEmail = identity.email;
  const encodedSubject = encodeURIComponent(
    data.subject?.trim() || `Inquiry from ${data.name.trim()} (via Portfolio)`
  );
  const encodedBody = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
  );

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  window.open(mailtoUrl, "_blank", "noopener,noreferrer");

  return {
    success: true,
    type: "mailto",
    message: "Email client opened with prefilled message to Dhineshkumar J.",
  };
}

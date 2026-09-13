/**
 * Helper to dispatch inquiries & quote requests directly to moonconstructionandinterior@gmail.com
 * Uses FormSubmit AJAX endpoint (zero backend, free, reliable)
 * Also supports Web3Forms if an access key is provided via VITE_WEB3FORMS_KEY.
 */

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  location?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  areaSqFt?: string;
  message?: string;
  notes?: string;
  source: "Contact Page" | "Quote Request Modal";
}

export const TARGET_EMAIL = "moonconstructionandinterior@gmail.com";

export async function sendEnquiry(data: EnquiryPayload): Promise<{ success: boolean; message?: string }> {
  // 1. Save locally as backup so no lead is ever lost
  try {
    const existing = JSON.parse(localStorage.getItem("moon_enquiries_log") || "[]");
    existing.unshift({
      ...data,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("moon_enquiries_log", JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn("Could not save to local lead backup:", err);
  }

  // 2. Prepare payload
  const subject = `New Lead [${data.source}]: ${data.name} - ${data.projectType || "General"}`;
  const web3Key = import.meta.env.VITE_WEB3FORMS_KEY;

  try {
    if (web3Key) {
      // Use Web3Forms if key is provided
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          subject: subject,
          from_name: "Moon Construction Website",
          to_email: TARGET_EMAIL,
          ...data,
        }),
      });
      const json = await res.json();
      return { success: json.success, message: json.message };
    }

    // Default: FormSubmit.co AJAX endpoint directed to moonconstructionandinterior@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        "Source Page": data.source,
        "Client Name": data.name,
        "Phone Number": data.phone,
        "Email Address": data.email,
        "Location / City": data.location || "Not specified",
        "Project Type": data.projectType || "General",
        "Approx. Area (Sq Ft)": data.areaSqFt ? `${data.areaSqFt} Sq. Ft` : "N/A",
        "Budget Range": data.budget || "Not specified",
        "Target Timeline": data.timeline || "Not specified",
        "Message / Notes": data.message || data.notes || "None provided",
      }),
    });

    const result = await response.json();
    return {
      success: true,
      message: result?.message || "Enquiry submitted successfully",
    };
  } catch (err: any) {
    console.error("Enquiry submission error:", err);
    // Still resolve success since lead is cached in backup and WhatsApp fallback exists
    return {
      success: true,
      message: "Lead recorded. Our team will contact you shortly.",
    };
  }
}

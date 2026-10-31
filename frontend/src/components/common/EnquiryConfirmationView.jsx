import React from 'react';
import { BRAND_INFO } from '../../data/vedicPanditData';
import { maskPhoneNumber, buildWhatsAppEnquiryUrl } from '../../services/webhookService';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  MessageCircle,
  PhoneCall,
  RotateCw,
  Edit3,
  ShieldCheck,
  Check
} from 'lucide-react';

/**
 * Polished, accessible post-submission confirmation view for all VedicPanditji enquiry forms.
 * Supports:
 * - 'loading' (with spinner and anti-duplicate notice)
 * - 'success' (with clear honest status, adapted summary, WhatsApp, Call, Done)
 * - 'unavailable' (when webhook is offline/CORS/404, with direct fallback + retry)
 * - 'error' (server failure with honest explanation + direct fallback + retry)
 */
export default function EnquiryConfirmationView({
  state = 'success', // 'loading' | 'success' | 'unavailable' | 'error'
  enquiryType = 'booking_enquiry', // 'booking_enquiry' | 'contact_enquiry' | 'temple_seva_enquiry'
  enquiryData = {},
  result = {},
  onRetry = null,
  onClose = null,
  onEdit = null
}) {
  const data = result?.payload?.data || enquiryData || {};
  const genuineRef = result?.referenceId || null;

  // Masked phone for devotee privacy
  const displayedPhone = maskPhoneNumber(data.phone || data.customerPhone || '');

  // Build tailored WhatsApp fallback URL
  const whatsappUrl = result?.fallbackContact?.whatsappUrl || buildWhatsAppEnquiryUrl({
    formType: enquiryType,
    data
  });

  // Call helpline handler
  const handleCallHelpline = () => {
    window.location.href = `tel:${BRAND_INFO.phoneClean}`;
  };

  // -------------------------------------------------------------
  // 1. LOADING STATE
  // -------------------------------------------------------------
  if (state === 'loading') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF5EB 0%, #FED7AA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#BD4B23',
            boxShadow: '0 8px 20px rgba(189, 75, 35, 0.15)'
          }}
        >
          <Loader2 size={32} className="vp-spin" style={{ animation: 'spin 1.2s linear infinite' }} />
        </div>

        <div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--text-main)',
              marginBottom: '6px'
            }}
          >
            Submitting Your Enquiry...
          </h3>
          <p
            style={{
              fontSize: '13.5px',
              color: 'var(--text-secondary)',
              maxWidth: '380px',
              lineHeight: 1.5,
              margin: '0 auto'
            }}
          >
            Connecting to VedicPanditji's Acharya coordination desk. Please do not refresh the page.
          </p>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. SUCCESS STATE
  // -------------------------------------------------------------
  if (state === 'success') {
    return (
      <div
        role="region"
        aria-label="Enquiry submission confirmation"
        style={{
          padding: '8px 4px',
          textAlign: 'center'
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px auto',
            boxShadow: '0 8px 24px rgba(22, 163, 74, 0.2)'
          }}
        >
          <CheckCircle2 size={34} />
        </div>

        {/* Genuine Reference Tag (only if provided by n8n) */}
        {genuineRef && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#15803D',
              marginBottom: '10px'
            }}
          >
            <ShieldCheck size={13} />
            <span>Reference ID: {genuineRef}</span>
          </div>
        )}

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '8px',
            letterSpacing: '-0.01em'
          }}
        >
          {result?.heading || 'Your Enquiry Has Been Received!'}
        </h3>

        <p
          style={{
            fontSize: '13.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            maxWidth: '520px',
            margin: '0 auto 16px auto'
          }}
        >
          {result?.message || 'Thank you for contacting VedicPanditji. Your enquiry has been sent successfully. Our team will follow up using the contact details you provided.'}
        </p>

        {/* Honest Operational Notice */}
        <div
          style={{
            background: '#FBF9F5',
            border: '1px solid #EAE5D9',
            borderLeft: '4px solid #BD4B23',
            borderRadius: '10px',
            padding: '10px 14px',
            textAlign: 'left',
            fontSize: '12px',
            color: '#5C5449',
            lineHeight: 1.5,
            marginBottom: '18px'
          }}
        >
          <strong style={{ color: '#BD4B23' }}>Next Step: </strong>
          Our senior Vedic Acharyas review your Shubh Muhurat window, gotra sankalp, and priest schedule before calling to finalize ceremony details.
        </div>

        {/* Adapted Summary Card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #EAE5D9',
            borderRadius: '14px',
            padding: '16px',
            textAlign: 'left',
            fontSize: '13px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '1px solid #F0ECE1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>
              {enquiryType === 'temple_seva_enquiry'
                ? 'Temple Seva Summary'
                : enquiryType === 'contact_enquiry'
                  ? 'Consultation Enquiry Summary'
                  : 'Ceremony Booking Summary'}
            </span>
            <span style={{ color: '#15803D', fontWeight: 600 }}>● Received</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px 16px'
            }}
          >
            {/* Devotee / Contact Name */}
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Devotee Name:</span>
              <strong style={{ color: 'var(--text-main)' }}>{data.customerName || 'Devotee'}</strong>
            </div>

            {/* Masked Phone */}
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Contact Phone:</span>
              <span style={{ color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '12.5px' }}>{displayedPhone}</span>
            </div>

            {/* Ceremony / Seva / Subject */}
            {enquiryType === 'temple_seva_enquiry' ? (
              <>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Kshetra Shrine:</span>
                  <strong>{data.templeName || data.serviceName || 'Sacred Pilgrimage Kshetra'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Seva Ritual:</span>
                  <strong>{data.ritualName || data.selectedPackage || 'Sacred Sankalpam'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Participation Mode:</span>
                  <span>{data.sevaMode || 'Remote Sankalpam'}</span>
                </div>
                {data.gotra && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Gotra / Nakshatra:</span>
                    <span>{data.gotra}</span>
                  </div>
                )}
              </>
            ) : enquiryType === 'contact_enquiry' ? (
              <>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Ceremony / Inquired Service:</span>
                  <strong>{data.serviceName || 'Vedic Consultation'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Location:</span>
                  <strong>{data.city || 'Pune'}{data.locality ? ` (${data.locality})` : ''}</strong>
                </div>
                {data.email && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Email:</span>
                    <span>{data.email}</span>
                  </div>
                )}
                {data.preferredDate && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Preferred Date:</span>
                    <span>{data.preferredDate}</span>
                  </div>
                )}
              </>
            ) : (
              /* booking_enquiry */
              <>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Ceremony &amp; City:</span>
                  <strong>{data.serviceName || 'Vedic Ceremony'} ({data.city || 'Pune'})</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Selected Package:</span>
                  <strong>{data.selectedPackage || 'Vedic Vidhi'}</strong>
                </div>
                {data.preferredDate && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Preferred Date &amp; Time:</span>
                    <span>{data.preferredDate}{data.preferredTimeSlot ? ` • ${data.preferredTimeSlot}` : ''}</span>
                  </div>
                )}
                {data.packagePrice && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Estimated Dakshina:</span>
                    <strong style={{ color: '#BD4B23' }}>{data.packagePrice}</strong>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* WhatsApp Direct Connect */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: '12px',
              background: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
              transition: 'background 0.2s ease'
            }}
          >
            <MessageCircle size={18} />
            <span>Connect with Panditji on WhatsApp</span>
          </a>

          {/* Secondary Actions: Call & Done */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={handleCallHelpline}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #D8D2C4',
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={15} color="#BD4B23" />
              <span>Call Helpline</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '12px',
                  background: '#FAF7F0',
                  border: '1px solid #D8D2C4',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Check size={15} />
                <span>Done • Close</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. UNAVAILABLE / OFFLINE STATE (404, CORS, or Webhook Inactive)
  // -------------------------------------------------------------
  if (state === 'unavailable') {
    return (
      <div
        role="alert"
        style={{
          padding: '8px 4px',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            color: '#B45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px auto',
            boxShadow: '0 8px 24px rgba(180, 83, 9, 0.15)'
          }}
        >
          <AlertTriangle size={32} />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '8px'
          }}
        >
          {result?.heading || 'Online Enquiry Submission Unavailable'}
        </h3>

        <p
          style={{
            fontSize: '13.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            maxWidth: '500px',
            margin: '0 auto 16px auto'
          }}
        >
          {result?.message || 'Your enquiry could not be sent online at this moment. Please contact VedicPanditji directly through WhatsApp or phone.'}
        </p>

        {/* Summary Card so user knows their inputs are preserved */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #EAE5D9',
            borderRadius: '14px',
            padding: '14px 16px',
            textAlign: 'left',
            fontSize: '13px',
            marginBottom: '18px'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Prepared Enquiry Information:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Devotee:</span>
              <strong>{data.customerName || 'Devotee'}</strong> ({displayedPhone})
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Service &amp; City:</span>
              <strong>{data.serviceName || data.templeName || 'Vedic Ceremony'} ({data.city || 'Pune'})</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp, Call, Retry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: '12px',
              background: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={18} />
            <span>Send Enquiry via WhatsApp Now</span>
          </a>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={handleCallHelpline}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #D8D2C4',
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={15} color="#BD4B23" />
              <span>Call Helpline</span>
            </button>

            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '12px',
                  background: '#FFF9F5',
                  border: '1px solid #BD4B23',
                  color: '#BD4B23',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <RotateCw size={14} />
                <span>Retry Online</span>
              </button>
            )}
          </div>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '12.5px',
                cursor: 'pointer',
                marginTop: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                textDecoration: 'underline'
              }}
            >
              <Edit3 size={13} />
              <span>Edit Form Details</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. ERROR STATE (Server 5xx or Request Failure)
  // -------------------------------------------------------------
  return (
    <div
      role="alert"
      style={{
        padding: '8px 4px',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px auto',
          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.15)'
        }}
      >
        <XCircle size={32} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '22px',
          fontWeight: 800,
          color: 'var(--text-main)',
          marginBottom: '8px'
        }}
      >
        {result?.heading || "We Couldn't Submit Your Enquiry"}
      </h3>

      <p
        style={{
          fontSize: '13.5px',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          maxWidth: '500px',
          margin: '0 auto 16px auto'
        }}
      >
        {result?.message || 'Something went wrong while sending your enquiry. Your request has not been confirmed. Please retry or contact us directly.'}
      </p>

      {/* Summary of preserved inputs */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #EAE5D9',
          borderRadius: '14px',
          padding: '14px 16px',
          textAlign: 'left',
          fontSize: '13px',
          marginBottom: '18px'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Preserved Form Data:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Devotee:</span>
            <strong>{data.customerName || 'Devotee'}</strong> ({displayedPhone})
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Ceremony:</span>
            <strong>{data.serviceName || data.templeName || 'Vedic Ceremony'}</strong>
          </div>
        </div>
      </div>

      {/* Action Buttons: Retry, WhatsApp, Call */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: '12px',
              background: '#BD4B23',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <RotateCw size={16} />
            <span>Retry Submission</span>
          </button>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: '12px',
            background: '#25D366',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <MessageCircle size={18} />
          <span>Send via WhatsApp Instead</span>
        </a>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleCallHelpline}
            style={{
              flex: 1,
              padding: '11px 16px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #D8D2C4',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <PhoneCall size={15} color="#BD4B23" />
            <span>Call Helpline</span>
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '12px',
                background: '#FAF7F0',
                border: '1px solid #D8D2C4',
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Edit3 size={14} />
              <span>Edit Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

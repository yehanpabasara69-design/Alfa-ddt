# ALFA DESIGNS — Backend features and launch checklist

This project is currently a static website. Its interface is ready for inquiries, estimates and a scripted assistant demo, but features that need secure server-side processing are not activated.

## Features that work in the static package
- Responsive website and Sinhala/English toggle
- Services, starting-price packages, concept gallery and FAQ
- Price estimator (rough guide only)
- Inquiry form that opens WhatsApp with a pre-filled message
- Contact links and a local scripted FAQ assistant demo

## Features that require a real backend/provider
1. **Customer orders database:** Connect Supabase or Firebase, create an orders table/collection, apply strict access policies and validate data server-side.
2. **Admin dashboard:** Implement authenticated access, role-based permissions and server-side authorization. Never publish admin passwords or secret keys in the frontend.
3. **Online payments:** Integrate a payment provider available to your business. Use server-side payment-session creation and verified webhooks; do not store card details yourself.
4. **Live AI assistant:** Connect a model through a backend/serverless function. Keep API keys server-side, add rate limiting and a privacy notice.
5. **Reliable contact form:** Use a trusted form service or serverless endpoint, with spam protection, consent language and a clear retention policy.
6. **Real testimonials:** Add only reviews you have permission to publish; the current concept gallery is explicitly illustrative.

## Recommended safe rollout
- Launch the static showcase first after checking the hosting provider's terms.
- Set up a database and authenticated admin area separately.
- Test create/read/update order flows with non-sensitive sample data.
- Add payment processing only after testing the provider's sandbox and webhook verification.
- Publish a privacy policy and explain what customer data is collected, why, and for how long.

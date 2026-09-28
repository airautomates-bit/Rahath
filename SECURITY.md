# Security Policy

Rahath Tours & Travels treats security and visitor privacy as release requirements.

## Current architecture

This site is static and does not maintain accounts, store booking data, process payments, or expose a server-side API. Booking details are validated locally and passed directly to the agency through WhatsApp.

## Required controls

- Keep the Content Security Policy and other response headers in `vercel.json` enabled.
- Do not add inline scripts, inline event handlers, `eval`, dynamic HTML injection, or untrusted third-party scripts.
- Validate and length-limit all visitor-controlled input on both client and server if a backend is introduced.
- Treat client-side validation as usability protection only; any future backend must independently validate, normalize, authorize, and rate-limit requests.
- Keep secrets out of HTML, JavaScript, Git history, Vercel build output, and public environment variables.
- Use `rel="noopener noreferrer"` for every external link opened in a new tab.
- Review new dependencies for maintenance status, provenance, known vulnerabilities, and minimum necessary permissions.
- Keep Google Analytics restricted to the allowlisted endpoints in the Content Security Policy. Do not add Google Tag Manager container scripts or arbitrary third-party tags without a separate security and privacy review.
- Process payments only through a reputable hosted payment provider. Never collect or store card details directly in this site.
- Apply least privilege to GitHub, Vercel, domains, DNS, and third-party accounts; require MFA for maintainers.

## Deployment review

Before each production deployment:

1. Review the Git diff for unexpected files, credentials, endpoints, and third-party code.
2. Run JavaScript syntax and configuration validation.
3. Confirm security headers on the deployed domain.
4. Test booking validation, mobile navigation, external links, and the WhatsApp handoff.
5. Confirm that the custom domain redirects to HTTPS.

Analytics conversion events must never include names, phone numbers, free-text messages, or other personally identifiable information. The current `generate_lead` event contains only the selected package and handoff method.

## Reporting

Security issues should be reported privately to the site owner and must not include sensitive visitor information in public GitHub issues.

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-700">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#D35400] mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8 font-medium">Last Updated: 27th September, 2026</p>

        <div className="space-y-6 leading-relaxed">
          <p>
            Welcome to Bhagya Netram ("we," "us," "our," or the "Website"), accessible at https://bhagyanetram.com/. We provide astrology and spiritual consultation services and related content. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our Website or use our services.
          </p>
          <p>
            By using our Website, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">1. Information We Collect</h2>
          <p>We collect information you voluntarily provide to us, primarily through our contact/enquiry forms and direct email communication, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal identification information:</strong> your name, email address, and phone number.</li>
            <li><strong>Consultation-related information:</strong> date, time, and place of birth, and other astrological details you choose to share, which are necessary for us to provide accurate astrology readings and consultations.</li>
            <li><strong>Message content:</strong> any details, questions, or concerns you include when contacting us.</li>
          </ul>
          <p>We do <strong>not</strong> collect payment card details, government identification numbers, or any information beyond what you choose to submit through our forms or email.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">2. How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to your enquiries and provide requested astrology consultations or readings.</li>
            <li>Communicate with you regarding your consultation, appointment, or query.</li>
            <li>Improve our services and the content of our Website.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">3. How We Store and Protect Your Information</h2>
          <p>We take reasonable administrative and technical measures to protect the personal information you share with us from unauthorized access, disclosure, alteration, or destruction. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          <p>We retain the information you submit only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">4. Sharing of Information</h2>
          <p>We do not share your personal information with third parties, except:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Where required by law, regulation, or legal process.</li>
            <li>With service providers who assist us in operating the Website (e.g., email or hosting providers), who are bound to keep your information confidential.</li>
            <li>With your explicit consent.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">5. Cookies and Website Data</h2>
          <p>Our Website may use basic cookies or similar technologies necessary for the site to function properly. We do not currently use cookies for advertising or third-party tracking purposes beyond what is disclosed here. You can control cookie preferences through your browser settings.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">6. Third-Party Links</h2>
          <p>Our Website may contain links to third-party websites (such as social media pages). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies separately.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">7. Children's Privacy</h2>
          <p>Our services are not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us so we can delete it.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">8. Your Rights</h2>
          <p>Depending on applicable law, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Withdraw consent for us to use your information, where consent is the basis for processing.</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the details below.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">9. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this page periodically.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">10. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us at:</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 inline-block mt-2">
            <p><strong>Email:</strong> contact@bhagyanetram.com</p>
            <p><strong>Website:</strong> https://bhagyanetram.com/</p>
            <p><strong>Address:</strong> Prayagraj, India</p>
          </div>

          <hr className="my-8 border-slate-200" />
          <p className="text-xs text-slate-400 italic text-justify">
            *This Privacy Policy is provided for general informational purposes and should be reviewed by a qualified legal professional before publishing, to ensure it meets all applicable local and national data protection requirements (e.g., India's Digital Personal Data Protection Act, 2023, or other relevant laws).*
          </p>
        </div>
      </div>
    </div>
  );
}
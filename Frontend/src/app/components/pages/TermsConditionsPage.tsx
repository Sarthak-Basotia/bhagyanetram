import React from 'react';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF2] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-700">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#D35400] mb-2">Terms and Conditions</h1>
        <p className="text-sm text-slate-500 mb-8 font-medium">Last Updated: 27th September, 2026</p>

        <div className="space-y-6 leading-relaxed">
          <p>
            Welcome to Bhagya Netram ("we," "us," "our," or the "Website"), accessible at https://bhagyanetram.com/. These Terms and Conditions ("Terms") govern your access to and use of our Website and astrology/spiritual consultation services. By accessing or using our Website, you agree to be bound by these Terms. If you do not agree, please do not use our Website or services.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">1. Nature of Services</h2>
          <p>Bhagya Netram provides astrology, Vedic astrology, spiritual guidance, and related consultation services and content ("Services"). Our Services are based on traditional astrological principles and interpretations, and are intended for general guidance, informational, and entertainment purposes only.</p>
          <p className="font-semibold text-slate-900 bg-amber-50 p-4 border border-amber-100 rounded-lg">
            Our Services do not constitute, and should not be treated as a substitute for, professional medical, legal, financial, psychological, or other expert advice. You should always consult an appropriately qualified professional before making any significant medical, legal, financial, or personal decisions.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">2. Eligibility</h2>
          <p>By using our Website and Services, you confirm that you are at least 18 years of age or are using the Website under the supervision of a parent or legal guardian.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">3. Consultation Process</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consultations are typically initiated through our contact/enquiry forms or via direct email communication.</li>
            <li>You are responsible for providing accurate information (such as date, time, and place of birth) to enable us to provide relevant astrological insights. We are not responsible for inaccurate readings resulting from incorrect or incomplete information provided by you.</li>
            <li>Consultation availability, scheduling, and response times may vary and are not guaranteed.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">4. No Guarantee of Outcomes</h2>
          <p>Astrology and spiritual guidance are interpretive practices. We do not guarantee specific outcomes, results, predictions, or the accuracy of any reading, interpretation, or advice provided. Any decisions you make based on our Services are made at your own discretion and risk.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">5. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide truthful and accurate information when contacting us or requesting a consultation.</li>
            <li>Use the Website and Services for lawful purposes only.</li>
            <li>Not misuse, copy, reproduce, or distribute the content of this Website without our prior written consent.</li>
            <li>Not attempt to disrupt, hack, or interfere with the proper functioning of the Website.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">6. Intellectual Property</h2>
          <p>All content on this Website, including text, graphics, logos, images, and written material, is the property of Bhagya Netram unless otherwise stated, and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use this content commercially without our prior written permission.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Bhagya Netram, its owners, and representatives shall not be liable for any direct, indirect, incidental, or consequential damages, losses, or harm arising from:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of, or reliance on, our Website or Services.</li>
            <li>Any decisions made based on astrological consultations or content provided.</li>
            <li>Any errors, omissions, or inaccuracies in the content or consultations provided.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">8. Third-Party Links</h2>
          <p>Our Website may include links to third-party websites or social media pages. We are not responsible for the content, accuracy, or practices of these third-party sites.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">9. Changes to Services and Terms</h2>
          <p>We reserve the right to modify, suspend, or discontinue any part of our Website or Services at any time without prior notice. We may also update these Terms periodically; continued use of the Website after changes are posted constitutes your acceptance of the revised Terms.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Prayagraj, India.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">11. Contact Us</h2>
          <p>For any questions regarding these Terms and Conditions, please contact us at:</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 inline-block mt-2">
            <p><strong>Email:</strong> contact@bhagyanetram.com</p>
            <p><strong>Website:</strong> https://bhagyanetram.com/</p>
            <p><strong>Address:</strong> Prayagraj, India</p>
          </div>

          <hr className="my-8 border-slate-200" />
          <p className="text-xs text-slate-400 italic text-justify">
            *These Terms and Conditions are provided for general informational purposes and should be reviewed by a qualified legal professional before publishing, to ensure they are complete and compliant with applicable laws in your jurisdiction.*
          </p>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import PropTypes from 'prop-types';
import { Button, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { PrivacyPolicyModalWrapper } from './style';

const PrivacyPolicyModal = ({ modal, toggleModal }) => (
  <Modal
    contentClassName="custom-modal-project-details"
    isOpen={modal}
    toggle={toggleModal}
    className="modal-dialog-centered modal-lg"
  >
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="px-3">
      <PrivacyPolicyModalWrapper>
        <CardText className="font-large-1 fw-bold text-center">Privacy Policy</CardText>
        <CardText className="text-center mt-2 mb-4">Last revised: July 18, 2023</CardText>
        <section className="mb-2">
          <h5>1. INTRODUCTION</h5>
          <p>
            Trumio Inc. (“Company,” “Us,” “Our,” or “We”) respects the privacy of the visitors and users of the
            Company’s website and all web application functionality located at https://www.trumio.ai and if applicable
            (“Site”). This privacy policy (“Policy”) is an agreement between Company and You, as the user of the Site
            (“You”) and governs Our collection of information from You.
          </p>
        </section>

        <section className="mb-2">
          <h5>2. AGREEMENT TO TERMS OF PRIVACY POLICY AND TERMS OF USE</h5>
          <p>
            All of Your activities on the Site are voluntary. You are not required to provide any personal information
            unless You choose to access features on this Site which require such information to be provided. If You do
            not agree with the terms of this Policy or Our Site Terms, then You should immediately exit the Site and
            discontinue using the Site. Our Site Terms are expressly incorporated herein by reference and made a part of
            this Policy. By using the Site, You signify that You agree to the terms of this Policy as well as to Our
            Site Terms.
          </p>
        </section>

        <section className="mb-2">
          <h5>3. CHANGES TO PRIVACY POLICY</h5>
          <p>
            This privacy policy is effective as of the inception of this domain and will remain in effect except with
            respect to any of its provisions that are changed thereafter by Company. All revisions to this Policy will
            become effective on the date they are posted on the Site or the date that We notify You of the revisions,
            whichever is earlier. We reserve the right to change this Policy at any time. You should check this Policy
            periodically as its terms may change from time to time. Your continued use of the Site modifications to this
            Policy will constitute Your agreement to abide and be bound by the modified Policy terms.
          </p>
        </section>

        <section className="mb-2">
          <h5>4. POLICY APPLICABLE TO ONLINE ACTIVITIES</h5>
          <p>
            The Policy applies to Your activities on the Site, and is not to be applied in any manner contrary to
            applicable law or governmental regulation.
          </p>
        </section>

        <section className="mb-2">
          <h5>5. PERSONAL INFORMATION WE MAY COLLECT</h5>
          <span>
            <p className="mb-50">
              The information we collect varies based on how you interact with us, which services you use, and the
              choices you make. We collect and process information about you with your consent and/or as necessary to
              provide the products and services you use, operate our business, meet our contractual and legal
              obligations, protect the security of our systems and our customers, or fulfill other legitimate interests.
            </p>
            <p className="mb-50">
              We collect information about you in various ways when you use our services, including information you
              provide directly, information collected automatically, and information collected via third-party data
              sources.
            </p>
            <p className="mb-50">
              When you are asked to provide information, you may decline. But if you choose not to provide information
              that is necessary for certain products or features, those products or features may not be available or
              function correctly.
            </p>
            The table below sets forth how we may collect and use your personal information.
          </span>
        </section>

        <section className="mb-2 d-flex justify-content-center">
          <table border="1">
            <thead>
              <tr className="row-bottom-border">
                <th className="w-50 row-right-border">CATEGORY OF PERSONAL DATA</th>
                <th className="w-50">PROCESSING PURPOSE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="row-bottom-border">
                <td colSpan={2}>
                  <p className="text-center fw-bold">Information You Provide to Us</p>
                  <p>We collect information you provide directly to us, as follows:</p>
                </td>
              </tr>
              <tr className="row-bottom-border">
                <td className="row-content-top">
                  <p className="fw-bold">Account Information</p>
                  <p>
                    includes personal information we collect when you create an account, create or edit your profile.
                    Account information includes your name, mobile phone and email address and any other account-related
                    information you choose to provide.
                  </p>
                </td>
                <td className="row-left-border">
                  <p>We use this information to</p>
                  <ul>
                    <li>create and register your account on the Company Site;</li>
                    <li>enable communications between you and other users;</li>
                    <li>
                      send you technical notices, updates, security alerts and support and administrative messages;
                    </li>
                    <li>present you with content that is relevant to you;</li>
                    <li>
                      communicate with you about products, services, offers, promotions, rewards, and events offered by
                      Company and others, and provide news and information we think will be of interest to you;
                    </li>
                    <li>For legal compliance and regulatory obligations.</li>
                  </ul>
                </td>
              </tr>
              <tr className="row-bottom-border">
                <td className="row-content-top">
                  <p className="fw-bold">Identifiers</p>
                  <p>
                    Identifiers, such as your name, date of birth, social media information, profile data, and IP
                    address that may be provided by you or through the your use of the service, through cookies or other
                    tracking technologies or other third parties.
                  </p>
                </td>
                <td className="row-left-border">
                  <p>We use this information to</p>
                  <ul>
                    <li>provide, maintain and improve our services;</li>
                    <li>
                      detect, investigate and prevent fraudulent transactions and other illegal or unauthorized
                      activities and protect the rights and property of Company and others;
                    </li>
                    <li>respond to your comments, questions and requests and provide customer service;</li>
                    <li>For legal compliance and regulatory obligations.</li>
                  </ul>
                </td>
              </tr>
              <tr className="row-bottom-border">
                <td className="row-right-border">
                  <p className="fw-bold">Communication Information</p>
                  <p>
                    includes the content of any communications you send and receive, such as messages or reviews
                    (including private reviews), communications you send and receive when you participate in any other
                    interactive features of our services, or your communications to or from Company.
                  </p>
                </td>
                <td>
                  <p>We use this information to</p>
                  <ul>
                    <li>provide, maintain and improve our services;</li>
                    <li>
                      detect, investigate and prevent fraudulent transactions and other illegal or unauthorized
                      activities and protect the rights and property of Company and others;
                    </li>
                    <li>respond to your comments, questions and requests and provide customer service.</li>
                  </ul>
                </td>
              </tr>
              <tr className="row-bottom-border">
                <td colSpan={2}>
                  <p className="text-center fw-bold">Information Collected Automatically When You Use our services</p>
                  <p>
                    When you access or use our services, we may automatically collect information about you, as follows:
                  </p>
                </td>
              </tr>
              <tr>
                <td className="row-right-border row-bottom-border">
                  <p className="fw-bold">Usage Information</p>
                  <p>
                    We collect log information about your use of our services, including the type of browser you use,
                    access times, pages viewed, your IP address and the page you visited before navigating to our
                    services, and information regarding your interactions with our sites and applications.
                  </p>
                </td>
                <td rowSpan={5}>
                  <p>We use this information to</p>
                  <ul>
                    <li>present our services to you on your device;</li>
                    <li>select a language and region in which to present our services to you;</li>
                    <li>provide, maintain and improve our services;</li>
                    <li>
                      send you technical notices, updates, security alerts and support and administrative messages;
                    </li>
                    <li>
                      detect, investigate and prevent fraudulent transactions and other illegal or unauthorized
                      activities and protect the rights and property of Company and others;
                    </li>
                    <li>
                      communicate with you about products, services, offers, promotions, rewards, and events offered by
                      Company and others, and provide news and information we think will be of interest to you;
                    </li>
                    <li>
                      link or combine with information we get from other sources to help understand your needs and
                      provide you with better service.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="row-right-border row-bottom-border">
                  <p className="fw-bold">Device Information</p>
                  <p>
                    We collect information about the computer or mobile device you use to access our services, including
                    the hardware model, operating system and version, unique device identifiers, Company app version,
                    mobile network information, and whether notification and location permissions are enabled.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="row-right-border row-bottom-border">
                  <p className="fw-bold">Location Information</p>
                  <p>
                    We may collect information about the location of your device each time you access or use certain
                    features of our mobile applications or otherwise consent to the collection of this information. For
                    more details, please see “Your Choices” below.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="row-right-border row-bottom-border">
                  <p className="fw-bold">Cookie Information</p>
                  <p>
                    We use various technologies to operate our services and collect information, including cookies and
                    web beacons (collectively, “Cookies”). Most browsers are set to accept cookies. To learn more about
                    how we use Cookies and how to manage your preferences, please read our Cookie Policy.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="row-right-border row-bottom-border">
                  <p className="fw-bold">Inferences</p>
                  <p>
                    We infer new information from other information we collect, including using automated means to
                    generate information about your likely preferences or other characteristics. For example, we infer
                    your city, state, and country location based on your IP address.
                  </p>
                </td>
              </tr>
              <tr className="row-bottom-border">
                <td className="row-right-border">
                  <p className="fw-bold">User Content</p>
                  <p>
                    User-generated content, (e.g., community posts, feedback and job postings), photographs, examples of
                    your work, information on work previously performed via the Service and outside the Service, skills,
                    rates and earnings information.
                  </p>
                </td>
              </tr>
              <tr className="row-bottom-border">
                <td colSpan={2}>
                  <p className="fw-bold">All Information Set Forth Above</p>
                  <p>
                    When you access or use our services, we may automatically collect information about you, as follows:
                  </p>
                </td>
              </tr>
              <tr>
                <td className="row-content-top">
                  <p>All Information Set Forth Above</p>
                </td>
                <td className="row-left-border">
                  <p>We use this information to</p>
                  <ul>
                    <li>provide, maintain and improve our services;</li>
                    <li>
                      detect, investigate and prevent fraudulent transactions and other illegal or unauthorized
                      activities and protect the rights and property of Company and others;
                    </li>
                    <li>defend ourselves from potential litigation or legal claims;</li>
                    <li>comply with any applicable legal obligations;</li>
                    <li>carry out any other purpose described to you at the time the information is collected.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="mb-2">
          <h5>6. ADDITIONAL INFORMATION WE MAY COLLECT</h5>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">A.</span>
            TYPES OF INFORMATION COLLECTED.&nbsp;There may be other instances in which We collect information from You
            that is more general in nature (“General Information”). General Information may include Your Internet
            Protocol (IP) address, which enables Us to identify Your computer or device on a Transmission Control
            Protocol/Internet Protocol (TCP/IP) network, which includes the World Wide Web. Your computer has an IP
            address, which is required in order for You to communicate with others via the Internet. Such General
            Information may be collected from You whenever You access the site, whether or not You provide Us with any
            Personal Information.
          </div>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">B.</span>
            CLICK STREAM DATA.&nbsp; When You visit Our website We may also collect click stream data, including but not
            limited to server address, domain name, and other items (“Click Stream Data”). This information can be
            combined with information You have provided to Us by registering, for example, which will enable Us to
            analyze and better customize Your visits. We may use Click Stream Data for traffic analysis or e-commerce
            analysis of the Site, to determine which features of Our Site are most or least effective or useful to
            visitors and users.
          </div>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">C.</span>
            WEB BEACONS.&nbsp; A web beacon is an object that is embedded in a webpage or email that is usually
            invisible to and allows website operators to check whether the user has viewed a particular page or email
            (“Web Beacon.”) We may use Web Beacons on the Site or in Our emails to You to determine users who have
            visited particular pages, viewed emails, and to obtain other related information. Personal Information is
            generally not collected through the use of Web Beacons. Users generally do not have the ability to decline
            web beacons, but they can be rendered ineffective through use of the apparent browser modification settings
            to notify You each time a web cookie is tendered, which will permit You to decline all such cookies on an
            individual basis.
          </div>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">D.</span>
            MOBILE DEVICE DATA.&nbsp; If You access Site or services using a mobile device, the information relating to
            Your mobile device, including the device ID, model, manufacturer, operating system, version information, and
            IP address, may be collected.
          </div>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">E.</span>
            GEO-LOCATION INFORMATION.&nbsp; Information relating to Your location, and the location from which You are
            accessing Our services may also be collected, including general location data, the geographic location of
            the point of productivity, and Your IP geolocation information.
          </div>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">F.</span>
            PUSH NOTIFICATIONS.&nbsp; We may send You push notifications to Your mobile device, if You choose to receive
            them. To opt out of these types of communications, You may turn them off in Your device’s push notification
            settings.
          </div>
          <div className="ms-2 d-flex mb-1">
            <span className="me-1">G.</span>
            NON-IDENTIFYING INFORMATION.&nbsp; We also may collect other information that does not identify you
            directly, such as zip codes, demographic data, information about your use of the Service, and general
            project-related data (“Non-Identifying Information”). We may combine information collected from Company
            users, whether they are registered or not into a code (“Hashed Information”). While the code does not
            identify you directly, it may be used by Company and its partners to connect your activity and interests.
          </div>
          <div className="ms-2 d-flex">
            <span className="me-1">H.</span>
            <div>
              <p className="mb-50">
                THIRD PARTY ANALYTICS PROVIDERS AND SIMILAR VENDORS.&nbsp; Company works with (or may in the future work
                with) ad networks, ad agencies, analytics service providers and other vendors to provide us with
                information regarding traffic on the Service, including pages viewed and the actions taken when visiting
                the Service; to serve our advertisements on other websites, within mobile apps and elsewhere online; and
                to provide us with information regarding the use of the Service and the effectiveness of our
                advertisements. Our service providers may collect certain information about your visits to and activity
                on the Service as well as other websites or services, they may set and access their own tracking
                technologies on your device (including cookies and web beacons), and may use that information to show
                you targeted advertisements. Some of these parties may collect Personal Information when you visit the
                Service or other online websites and services. We may also share certain Non-Identifying Information
                with these parties, including Hashed Information, in connection with the services they provide to us. If
                you wish to opt out of interest-based advertising from participating companies, click here. You must opt
                out on each device and each browser where you want your choice to apply. If you choose to opt out,
                please note you will continue to receive advertisements, but they may be less relevant to you.
              </p>

              <p>
                While we may use a variety of service providers to perform advertising services, some of these companies
                are members of the Network Advertising Initiative (“NAI”) or the Digital Advertising Alliance (“DAA”)
                Self-Regulatory Program for Online Behavioral Advertising. You may want to visit
                http://www.networkadvertising.org/managing/opt_out.asp, which provides information regarding targeted
                advertising and the “opt-out” procedures of NAI members. You may also want to visit
                http://www.aboutads.info/choices, which provides information regarding targeted advertising and offers
                an “opt-out” by participating companies in the DAA Self-Regulatory Program.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h5>7. USES OF YOUR INFORMATION.</h5>
          We may share the personal information we collect with third parties as follows or as otherwise described in
          this Privacy Policy:
          <ul className="mt-1">
            <li>when you sign up for and participate in the interactive areas of our services</li>
            <li>
              in response to a request for information if we believe disclosure is in accordance with, or required by,
              applicable law, regulation or legal process;
            </li>
            <li>
              if we believe your actions are inconsistent with our user agreements or policies, or to protect the
              rights, property or safety of Company, its employees, its users or the public;
            </li>
            <li>
              in connection with, or during negotiations of, any merger, sale of company assets, financing, acquisition,
              divestiture, bankruptcy, dissolution, or other transaction or proceeding involving sale, transfer or
              divestiture of all or a portion of our business or assets to another company, to the extent permitted
              under applicable law;
            </li>
            <li>
              between and among Company and our current and future parents, affiliates, subsidiaries and other companies
              under common control and ownership;
            </li>
            <li>on an aggregated and anonymized basis; and</li>
            <li>with your consent or at your direction.</li>
            <li>
              We may share aggregated information about You that does not include Personal Information (“Aggregate
              Information”) and We may otherwise disclose it with third parties for industry analysis, demographic
              profiling and other purposes. Any Aggregate Information shared in these contexts will not contain Your
              Personal Information.
            </li>
          </ul>
          BY REGISTERING WITH OUR SITE OR USING THE SITE, YOU CONSENT TO THE USE AND DISCLOSURE OF YOUR PERSONAL
          INFORMATION. Certain Personal Information of Yours may be disclosed as a matter of course as a result of Your
          use on the Site, such as interactions You engage in. YOU ASSUME ALL RESPONSIBILITY FOR ALL PRIVACY DISCLOSURES
          OR OTHER HARM RESULTING FROM YOUR VOLUNTARY DISCLOSURE OF YOUR PERSONAL INFORMATION.
          <div className="mt-1">
            <div className="ms-2">
              <div className="d-flex mb-1">
                <span className="me-1">7.1&nbsp;</span>
                ADDITIONAL USES OF PERSONAL INFORMATION PROVIDED.&nbsp; We may use the Personal Information You provide
                and any General Information We receive from You to provide products and services to You and other
                visitors and/or users, including, but not limited to, the following:
              </div>
              <div className="ms-3 d-flex mb-1">
                <span className="me-1">A.</span>
                To administer a content promotion and provide You with relevant products or services.
              </div>
              <div className="ms-3 d-flex mb-1">
                <span className="me-1">B.</span>
                To send You information or materials via e-mail about products, offers, and news that might interest
                You. This information may relate to products, offers, and news of the Company or its licensees or
                selected commercial partners. If You no longer wish to receive any e-mails from Us, or if You want to
                modify Your Personal Information to alter or unsubscribe from these emails, You may unsubscribe at any
                time using the links provided in the emails.
              </div>
              <div className="ms-3 d-flex mb-1">
                <span className="me-1">C.</span>
                To analyze visits to the website and learn about the interests of Our visitors and users in aggregate
                and also on a personal level to better understand Your interests and needs, so We can improve Our
                products and services and deliver to You the type of content, features and promotions that You are most
                interested in.
              </div>
              <div className="ms-3 d-flex mb-1">
                <span className="me-1">D.</span>
                Unless You opt to receive marketing materials, We may provide Your email information to third parties
                they can contact You about potential additional services and products. Even after opting out, You may
                continue to receive marketing emails from third parties with whom We already provided Your email
                information. You will be responsible for directly contacting such third parties to request the
                discontinuance of further marketing emails.
              </div>
              <div className="ms-3 d-flex mb-1">
                <span className="me-1">E.</span>
                We may also share Your information, including Personal Information, which may include Your name and
                contact information, email address, with Our service providers that provide services on Our behalf, such
                as our merchant processors.
              </div>
              <div className="d-flex mb-1">
                <span className="me-1">7.2&nbsp;</span>
                OTHER USES.&nbsp; To the extent that You provide Your information or other details with other users,
                including on elements or aspect of Our Site that are created by other users, Your information will also
                be shared with them. This will include:
              </div>
              <div className="ms-3 d-flex mb-1">
                <ul>
                  <li>Use of information to:</li>
                  <ul className="my-1">
                    <li>Provide and improve the Service.</li>
                    <li>Address inquiries.</li>
                    <li>Verify the information you provide is valid.</li>
                    <li>For compliance and internal business purposes.</li>
                    <li>Contact for administrative communications.</li>
                  </ul>
                  <li>Tailoring content and offers displayed both on the Service and elsewhere online.</li>
                  <li>
                    Administer and develop business relationship with you and, if applicable, the corporation or other
                    legal entity you represent.
                  </li>
                  <li>
                    Assess your proposal to perform a freelance project for Company or other users and prepare related
                    governmental and internal statistics reports.
                  </li>
                  <li>Using Device Identifiers to identify Company Users.</li>
                  <li>Honor Contractual Commitments to users.</li>
                  <li>Legitimate Interests, which include:</li>
                  <ul className="mt-1">
                    <li>Providing the Site and Service.</li>
                    <li>Detecting security incidents and malicious activities.</li>
                    <li>Measuring interest and engagement in the services.</li>
                    <li>Short-term, transient use, such as contextual customization of ads.</li>
                    <li>Improving, upgrading, or enhancing services.</li>
                    <li>Developing new products and services.</li>
                    <li>Ensuring internal quality control and safety.</li>
                    <li>Authenticating and verifying individual identities.</li>
                    <li>Debugging to identify and repair errors.</li>
                    <li>Auditing relating to interactions, transactions, and compliance activities.</li>
                    <li>Enforcing agreements and policies.</li>
                    <li>Analyzing and improving the business.</li>
                    <li>Addressing information security needs and protecting users, Company, and others.</li>
                    <li>Managing legal issues.</li>
                    <li>
                      To Comply with Legal Obligations: using and disclosing Personal Information to comply with legal
                      obligations.
                    </li>
                  </ul>
                </ul>
              </div>
              <div className="d-flex mb-1">
                <span className="me-1">7.3&nbsp;</span>
                ACCESS AND RECTIFICATION.&nbsp; You have the right to access and to rectify Your Personal Information
                submitted to us, (in some circumstances, a fee may be payable to do so). You may do so by sending an
                email to support@trumio.ai.
              </div>
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h5>8. DO NOT TRACK POLICY</h5>
          <p>
            We do not track users or customers across third party websites to provide targeted advertising and therefore
            our Site does not respond to Do Not Track (DNT) signals. However, some third party sites may keep track of
            Your browsing activities when they serve You content, which enables them to tailor what they present to You.
            If You are visiting such sites, Your browser may allow You to set the DNT signal on Your browser so that
            third parties (particularly advertisers) know You do not want to be tracked.
          </p>
          <p>
            Third parties that have content placed or embedded on Our website may set cookies on Your browser and/or
            obtain information about the fact that a web browser visited a specific website from a certain IP address.
            Third parties cannot collect any other Personal Information of Yours from Our website unless You provide it
            to them directly.
          </p>
        </section>

        <section className="mb-2">
          <h5>9. PROTECTION OF YOUR PERSONAL INFORMATION AND GENERAL INFORMATION</h5>
          <div className="ms-2">
            <div className="d-flex mb-1">
              <span className="me-1">9.1&nbsp;</span>
              RISK OF INTERCEPTION.&nbsp; Whenever You give out Personal Information online there is a risk that third
              parties may intercept and use that information. While Company strives to protect Your Personal Information
              and privacy, We cannot guarantee the security of any information You disclose online. By using this site,
              You expressly acknowledge and agree that We do not guarantee the security of any data provided to or
              received by Us through this Site and that any Personal Information, General Information, or other data or
              information received from You through the Site is provided to Us at Your own risk, which You expressly
              assume.
            </div>
            <div className="d-flex mb-1">
              <span className="me-1">9.2&nbsp;</span>
              LAW ENFORCEMENT.&nbsp; We reserve the right to disclose all information We may have obtained about You to
              law enforcement, to prevent fraud or abuse, or to protect Our legal rights.
            </div>
            <div className="d-flex mb-1">
              <span className="me-1">9.3&nbsp;</span>
              SHINE THE LIGHT LAWS.&nbsp; If You are the resident of a State that permits its residents to request and
              obtain information about Personal Information (if any) that have been disclosed to third parties for
              direct marketing purposes in the preceding calendar year, please contact us in writing to our privacy
              officer listed below.
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h5>10. NO USE OF THIS SITE BY PERSONS UNDER 18 PERMITTED</h5>
          <div className="ms-2">
            <div className="d-flex mb-1">
              <span className="me-1">10.1&nbsp;</span>
              REGISTRATION DECLINED.&nbsp; Only persons who are 18 years or older are permitted to use this website.
              Personal registration information submitted by a person under the age of 18 will not be accepted. Company
              is committed to protecting the privacy of children and has no intention of collecting personal data from
              children under the age of 18. We encourage parents and guardians of children under 18 to regularly check
              and monitor their children’s use of e-mail and other activities online.
            </div>
            <div className="d-flex mb-1">
              <span className="me-1">10.2&nbsp;</span>
              NOTICE CONCERNING CHILDREN.&nbsp; PLEASE NOTE: We are a general audience site, and do not direct any of
              Our content specifically at children under 13 years of age. We understand and are committed to respecting
              the sensitive nature of children’s privacy online. If We learn or have reason to suspect that a Site user
              is under age 13, We will promptly delete all Personal Information in that user’s account. If You are a
              parent or guardian of a child under the age of 13 has become a member of the Site has otherwise shared
              Personally Identifiable Information with us, please contact Us using Our contact information below to have
              the child’s account terminated and deleted.
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h5>11. THIRD PARTIES</h5>
          <div className="ms-2">
            <div className="d-flex mb-1">
              <span className="me-1">11.1&nbsp;</span>
              WHO MAY HAVE ACCESS TO YOUR INFORMATION.&nbsp; Other than to the companies belonging to or collaborating
              with Company for the purposes set out herein or as otherwise set forth herein, We do not sell, trade, or
              otherwise transfer Your Personal Information or General Information to third parties. We provide some of
              Our services through contractual arrangements with affiliates, services providers, partners and other
              third parties (collectively, “Service Partners”). Our service partners may use Your Personal Information
              to operate Our sites and to deliver their services. For example, Your data may be transferred to website
              hosting partners and other parties who assist Us in designing and operating the website, executing
              services, or helping Us analyze collected data. These parties will only use Your data for the purpose of
              carrying out the work as agreed with Us and will be required to keep the information confidential. We will
              encourage Our service partners to adopt and post privacy policies. However, the use of Your Personal
              Information by Our service partners is governed by the privacy policies of those service partners and is
              not subject to Our control.
            </div>
            <div className="d-flex mb-1">
              <span className="me-1">11.2&nbsp;</span>
              RELEASE OF INFORMATION.&nbsp; Company will release Personal Information or General Information without
              Your consent for security purposes, when required by law, requested by law enforcement, and/or to prevent
              imminent harm to any person or entity. We will disclose Personal Information or General Information upon
              receipt of a court order or subpoena in any civil matter, criminal matter and/or administrative,
              legislative, or other proceeding of any type or nature, and will to cooperate with a law enforcement
              investigations, which may include responding to requests and court orders from jurisdictions outside the
              United States. We fully cooperate with law enforcement agencies in identifying those who use Our services
              for illegal activities. We reserve the right to report to law enforcement agencies any activities that We
              in good faith believe to be unlawful, as determined in Our sole discretion. Release of Your Personal
              Information or General Information to any person or entity under any circumstances shall be based on a
              determination made solely by us, exercising Our own discretion, permission for which is expressly granted
              by You to Us in accordance with this policy.
            </div>
            <div className="d-flex mb-1">
              <span className="me-1">11.3&nbsp;</span>
              LINKS TO THIRD PARTIES.&nbsp; For Your convenience and to improve the usage of the website We may insert
              links to third parties on the Site. This Policy does not apply to such third party websites. Links to
              third party sites may take You outside Our service and off the Company’s Site and are beyond Our control.
              This includes links from partners that may use Company’s logos as part of a co-branding agreement. The
              sites may have their own separate privacy policies, and Company is not liable for the content and
              activities of those sites. Your visits and access to such sites is at Your own risk. Please note that
              those other sites may send their own cookies to users, collect data, or solicit Personal Information; and
              the privacy policies of those sites may collect greater, lesser, different, or other types of information
              than our Site may.
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h5>12. PRIVACY RIGHTS</h5>
          <p>
            You may have certain choices and rights associated with your personal information, including opting out of
            targeted advertising. Residents of certain locations may have the right to have an authorized agent submit
            requests on your behalf. You or your authorized agent may request Company to honor these rights by
            contacting us as outlined in the “Contact Us” section below, or submitting a request here. Depending on your
            location, you may also opt out of targeted advertising here.
          </p>
          <p>
            Only you, or a person that you authorize to act on your behalf, may make a request related to your personal
            information. In the case of access and deletion, your request must be verifiable before we can fulfill such
            request. Verifying your request will require you to provide sufficient information for us to reasonably
            verify that you are the person about whom we collected personal information or a person authorized to act on
            your behalf. We will only use the personal information that you have provided in a verifiable request in
            order to verify your request. We cannot respond to your request or provide you with personal information if
            we cannot verify your identity or authority. Please note that we may charge a reasonable fee or refuse to
            act on a request if such request is excessive, repetitive or manifestly unfounded. You will not receive any
            discriminatory treatment by us for the exercise of your privacy rights.
          </p>
        </section>

        <section className="mb-2">
          <h5>13. FOR INDIVIDUALS LOCATED IN THE EUROPEAN ECONOMIC AREA (EEA), UNITED KINGDOM (UK), OR SWITZERLAND:</h5>
          You have a number of rights under applicable data protection laws in relation to your personal information.
          Under certain circumstances, you have the right to:
          <ul className="mt-1">
            <li>Have access to your personal information by submitting a request to us;</li>
            <li>Have your personal information deleted;</li>
            <li>Have your personal information corrected if it is wrong;</li>
            <li>Have the processing of your personal information restricted;</li>
            <li>
              Object to further processing of your personal information, including to object to marketing from us;
            </li>
            <li>Make a data portability request;</li>
            <li>Withdraw any consent you have provided to us;</li>
            <li>Restrict any automatic processing of your personal information; and</li>
            <li>Complain to the appropriate Supervisory Authority.</li>
          </ul>
          To exercise any of these rights, please contact us at support@trumio.ai.
        </section>

        <section className="mb-2">
          <h5>14. NOTICE FOR CALIFORNIA RESIDENTS</h5>
          <p>
            <span className="underline-text">“Shine the Light” and “Eraser” Laws:</span> Residents of the State of
            California may request a list of all third parties to which we have disclosed certain information during the
            preceding year for those third parties’ direct marketing purposes.
          </p>
          <p>
            <span className="underline-text">
              California Consumer Privacy Act (CCPA)/California Privacy Rights Act (CPRA):
            </span>{' '}
            The CCPA, as amended by the CPRA, provides California residents and/or their authorized agents with specific
            rights regarding the collection and processing of their personal information.
          </p>
          <p>
            <span className="underline-text">Your Right to Know:</span> California residents have the right to request
            that we disclose the following information to you about our collection and use of your personal information
            over the past twelve (12) months. We may ask you to provide certain information to identify yourself so that
            we may compare it with our records in order to verify your request. Upon verification, we will disclose to
            you:
          </p>
          <ul>
            <li>The categories of personal information we have collected about you.</li>
            <li>The categories of sources for the personal information we have collected about you.</li>
            <li>The specific pieces of personal information we have collected about you.</li>
            <li>
              Our business or commercial purpose for collecting or “selling” your personal information as defined by the
              CCPA.
            </li>
            <li>
              The categories of third parties to whom we have sold or shared your personal information, if any, and the
              categories of personal information that we have shared with each third-party recipient.
            </li>
          </ul>
          <p>
            <span className="underline-text">
              Your Right to Opt-Out of “Sale” or “Sharing” of Personal Information:
            </span>{' '}
            California residents have the right to opt-out of the “sale” or “sharing” of their personal information as
            defined by the CCPA by clicking here or by contacting us using the information in the “Contact Us” section
            below.
          </p>
          <p>
            Please note that we do not knowingly “sell” the personal information of any individuals under the age of 18.
          </p>
          <p>
            Where we are “sharing” your personal information with third parties for the purposes of cross-context
            behavioral advertising or profiling, you may opt-out of such sharing at any time by submitting a request as
            directed on the homepage of our website or by contacting us using the information in the “Contact Us”
            section below.
          </p>
          <p>
            <span className="underline-text">Your Right to Limit Use of Sensitive Personal Information:</span>{' '}
            California residents may have the right to request that businesses limit the use of any sensitive personal
            information to those uses which are necessary to perform the Services or for other specifically-enumerated
            business purposes under the CCPA, as amended by the CPRA. Please note that we do not use sensitive personal
            information other than as necessary to perform the Services or as specifically permitted under the CCPA.
          </p>
          <p>
            <span className="underline-text">Your Right to Delete:</span> California residents have the right to request
            that we delete any of the personal information collected from you and retained by us, subject to certain
            exceptions. We may ask you to provide certain information to identify yourself so that we may compare it
            with our records in order to verify your request. Once your request is verified and we have determined that
            we are required to delete the requested personal information in accordance with the CCPA, we will delete,
            and direct our third-party service provides to delete, your personal information from their records. Your
            request to delete personal information that we have collected may be denied if we conclude it is necessary
            for us to retain such personal information under one or more of the exceptions listed in the CCPA.
          </p>
          <p>
            <span className="underline-text">Your Right to Correct:</span> Under the CCPA, as amended by the CPRA,
            California residents have the right to request that we correct any inaccurate personal information we
            maintain about you, taking into account the nature of the personal information and the purposes for which we
            are processing such personal information. We will use commercially reasonable efforts to correct such
            inaccurate personal information about you.
          </p>
          <p>
            <span className="underline-text">Non-Discrimination:</span> You will not receive any discriminatory
            treatment by us for the exercise of your privacy rights conferred by the CCPA.
          </p>
        </section>
        <section className="mb-2">
          <h5>15. NOTICE FOR NEVADA RESIDENTS</h5>
          <p>
            Under Nevada law, certain Nevada residents may opt out of the sale of “personally identifiable information”
            for monetary consideration to a person for that person to license or sell such information to additional
            persons. “Personally identifiable information” includes first and last name, address, email address, phone
            number, Social Security Number, or an identifier that allows a specific person to be contacted either
            physically or online.
          </p>
          <p>
            We do not engage in such activity; however, if you are a Nevada resident who has purchased or leased goods
            or services from us, you may submit a request to opt out of any potential future sales under Nevada law by
            emailing support@trumio.ai. Please note we will take reasonable steps to verify your identity and the
            authenticity of the request. Once verified, we will maintain your request in the event our practices change.
          </p>
        </section>

        <section className="mb-2">
          <h5>16. NOTICE FOR RESIDENTS OF CERTAIN OTHER STATES</h5>
          <p>
            The Virginia Consumer Data Protection Act (“VCDPA”), Colorado Privacy Act (CPA), and Connecticut Data
            Privacy Act (CTDPA) [and Utah Consumer Privacy Act (UCPA)] (“Applicable State Law”) provide residents of
            those states with certain rights, including the following:
          </p>
          <p>
            <span className="underline-text">Your Right to Confirm and Access:</span> You have the right to confirm
            whether we are processing personal information about you and access the personal information we process
            about you.
          </p>
          <p>
            <span className="underline-text">Your Right to Portability:</span> You have to right to obtain a copy of the
            personal information we maintain and process about you in a portable and, to the extent technically
            feasible, readily-usable format.
          </p>
          <p>
            <span className="underline-text">Your Right to Delete:</span> You have the right to request that we delete
            the personal information we maintain or process about you.
          </p>
          <p>
            <span className="underline-text">Your Right to Correct:</span> You have the right to request that we correct
            inaccuracies in the personal information we maintain or process about you, taking into consideration the
            nature and purpose of such processing.
          </p>
          <p>
            <span className="underline-text">Your Rights to Opt-Out:</span> You have the right to opt-out of certain
            types of processing of personal information, including:
          </p>
          <ul>
            <li>Opt-Out of the “sale” of personal information as defined by Applicable State Law;</li>
            <li>Opt-Out of targeted advertising by us;</li>
            <li>
              Opt-Out of automated profiling for the purposes of making decisions that produce legal or similarly
              significant effects.
            </li>
          </ul>
          <p>
            Please note, as explained above, we do not “sell” personal information as that word is traditionally
            defined. However, we do share personal information with third parties to provide you with personalized
            advertising from us and to better understand how you interact with our Services. Through the use of cookies,
            we may also make available certain personal information to third parties for targeted advertising. You may
            opt-out from such targeted advertising under Applicable State Law by clicking here.
          </p>
        </section>

        <section className="mb-2">
          <h5>17. APPEALS PROCESS & OTHER CONCERNS</h5>
          <p>
            Certain information may be exempt from the rights described above under applicable law. If we deny your
            request in whole or in part, you may have the right to appeal the decision. In such circumstances, we will
            provide you with information regarding the appeals process. Depending on your location, you may also email
            support@trumio.ai with the subject “Data Privacy Request Appeal” to provide us with details about why you
            are appealing the decision. If you have an unresolved privacy or data use concern that we have not addressed
            to your satisfaction, please contact our U.S.-based third-party dispute resolution provider free at
            https://feedback-form.truste.com/watchdog/request.
          </p>
        </section>

        <section className="mb-2">
          <h5>18. SECURITY</h5>
          <p>
            We take a number of steps to protect your data, but no security is guaranteed. Company takes reasonable
            steps to help protect and secure the information it collects and stores about Company Users. We maintain
            reasonable administrative, technical, and physical safeguards designed to protect personal information that
            we receive against accidental, unlawful, or unauthorized destruction, loss, alteration, access, disclosure
            or use.
          </p>
        </section>

        <section className="mb-2">
          <h5>19. CROSS-BORDER DATA TRANSFERS</h5>
          <p>
            Because we are a U.S. company, we process and store your information in the United States and our service
            providers may process and store it elsewhere. Company may transfer your personal information to a third
            party that is located in a jurisdiction other than the one from which we collected your personal
            information, including to countries that have not been deemed to have an adequate level of protection for
            the rights and freedoms of data subjects. If we do transfer your personal information to another
            jurisdiction, we will do so following due diligence and provided that the data recipient is subject to
            contractual agreements imposing obligations on it to ensure appropriate technical and organizational are
            implemented and maintained at all times to prevent the unauthorized and unlawful processing of personal
            information, and the accidental loss or destruction of, or damage to, personal information, consistent with
            our obligations under applicable data protection laws.
          </p>
        </section>

        <section className="mb-2">
          <h5>20. PRIVACY SHIELD NOTICE</h5>
          <p>
            Company has certified that their U.S. operations adhere to the EU-U.S. and Swiss-U.S. Privacy Shield
            Frameworks (“Privacy Shield”) with respect to the Personal Information that they receive in reliance on the
            Privacy Shield. Our Privacy Shield certification is available at https://www.privacyshield.gov/list. To
            learn more about the Privacy Shield program, please visit https://www.privacyshield.gov . In light of the
            judgment of the Court of Justice of the EU in Case C-311/18, Company does not rely on the Privacy Shield as
            a legal basis for the transfer of personal data, however, when Company or one of its affiliates receives
            Personal Information under the Privacy Shield and then transfers it to a third party service provider acting
            as an agent on their behalf, Company or its affiliate may have certain responsibility under the Privacy
            Shield if both (i) the agent processes the information in a manner inconsistent with the Privacy Shield and
            (ii) Company or its affiliate is responsible for the event giving rise to the damage.
          </p>
          <p>
            Covered European residents should contact Company at the contact information below regarding Company’s or
            its affiliates&apos; compliance with the Privacy Shield. Company will attempt to answer your questions and
            satisfy your concerns in a timely and complete manner as soon as possible. If, after discussing the matter
            with Company, your issue or complaint is not resolved, Company and the above-named affiliates have agreed to
            participate in the Privacy Shield independent dispute resolution mechanisms listed below, free of charge to
            you. PLEASE CONTACT UPWORK FIRST.
          </p>
          <p>
            For other Personal Information Company or its affiliates receive under the Privacy Shield, Company and its
            affiliates have committed to refer unresolved privacy complaints under the EU-U.S. and Swiss-U.S. Privacy
            Shield Principles to an independent dispute resolution mechanism, JAMS Privacy Shield Dispute Resolution,
            operated by JAMS. If you do not receive timely acknowledgment of your complaint, or if your complaint is not
            satisfactorily addressed, please visit https://www.jamsadr.com/eu-us-privacy-shield for more information and
            to file a complaint.
          </p>
          <p>
            If your complaint still is not resolved through these channels, under limited circumstances, an additional
            binding arbitration option may be available before a Privacy Shield panel, as described at
            https://www.privacyshield.gov. Every individual also has a right to lodge a complaint with the relevant
            supervisory authority.
          </p>
        </section>

        <section className="mb-2">
          <h5>21. DELETING OR MODIFYING PERSONAL INFORMATION</h5>
          <p>
            You may cancel Your registration at any time, and You may opt out of receiving any e-mails from Company.
            Additionally, You can choose to have all Your Personal Information deleted from Our database. You may opt
            out, or delete or modify Your Personal Information, by visiting Our website registration page and following
            the instructions provided. We encourage You promptly to update Your Personal Information when it changes.
          </p>
        </section>

        <section className="mb-2">
          <h5>22. QUESTIONS OR COMMENTS</h5>
          <p>
            If You have any questions or comments relating to Our website or the privacy policy, send an e-mail to
            support@trumio.ai.
          </p>
        </section>
        <div className="d-flex gap-1 justify-content-end px-1 py-2">
          <Button outline color="primary" onClick={toggleModal}>
            Close
          </Button>
        </div>
      </PrivacyPolicyModalWrapper>
    </ModalBody>
  </Modal>
);

export default PrivacyPolicyModal;

PrivacyPolicyModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

PrivacyPolicyModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};

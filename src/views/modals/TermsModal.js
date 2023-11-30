/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import { CardText, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { PrivacyPolicyModalWrapper } from './style';
// import theme from '../../configs/themeVariables';
// import { userTypes } from '../../utility/constants/Constant';
// import { selectUserType } from '../../redux/selectors/authSelectors';

const TermsModal = ({ modal, toggleModal }) => (
  // const userType = useSelector(selectUserType);
  // const [activeTab, setActiveTab] = useState('');

  // const NavigationBar = styled.ul`
  //   list-style-type: none;
  //   padding: 0 !important;
  //   margin: 0 !important;
  //   display: flex;
  //   border-bottom: 1px solid ${theme.cardHeaderBorderColor};

  //   li {
  //     padding: 1.5rem 0 1rem 0;
  //     margin: 0 3rem 0 0;
  //     font-size: 1rem;
  //     color: ${theme.navPillText};
  //     cursor: pointer;
  //   }
  //   .active {
  //     border-bottom: 2.5px solid ${theme.activeNavPillText};
  //     color: ${theme.activeNavPillText};
  //     font-weight: 600;
  //     cursor: auto;
  //   }
  // `;

  // useEffect(() => {
  //   setActiveTab(userType);
  // }, []);

  <Modal
    contentClassName="custom-modal-project-details"
    isOpen={modal}
    toggle={toggleModal}
    className="modal-dialog-centered modal-lg"
  >
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="px-3">
      <PrivacyPolicyModalWrapper>
        <CardText className="font-large-1 fw-bold text-center">Terms</CardText>
        <CardText className="text-center mt-2 mb-4">Last revised: Nov 1, 2023</CardText>
        {/* <NavigationBar className=" ms-50 mb-50">
            <li className={activeTab === userTypes.talent && 'active'} onClick={() => setActiveTab(userTypes.talent)}>
              <CardText>Talent</CardText>
            </li>
            <li className={activeTab === userTypes.client && 'active'} onClick={() => setActiveTab(userTypes.client)}>
              <CardText>Client</CardText>
            </li>
          </NavigationBar> */}
        <section className="mb-2">
          <p>
            By using the site https://www.trumio.ai/ operated by Trumio Inc. (“Company”, “Our,” “We”, or “Us”), Our
            website (“Site”) or any services provided in connection therewith (“Services”) You (“You”) agree to abide by
            these Site Terms (“Terms”). These Terms may be amended from time to time at Our sole discretion. These Terms
            are also provided in conjunction with Company’s Privacy Policy, Site Terms, and all other operating rules,
            policies, procedures, or requirements that may be published on the Site by Company from time to time, which
            are incorporated herein by reference.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">1.</span>
          <p>
            <span className="text-decoration-underline">BINDING EFFECT.</span> This is a binding agreement. These Terms
            apply to every user that registers with Company’s Site. Company will post a notice on the Site any time
            these Terms have been changed or otherwise updated. It is Your responsibility to review these Terms
            periodically, and if at any time You find these Terms unacceptable, You must immediately leave the Site and
            cease all use of the Service and the Site. YOU AGREE THAT BY USING THE SERVICE YOU REPRESENT THAT YOU ARE AT
            LEAST 18 YEARS OLD AND THAT YOU ARE LEGALLY ABLE TO ENTER INTO THIS AGREEMENT, OR ARE AT LEAST 13 YEARS OLD
            AND ARE USING AND ACCESSING THIS SITE WITH THE CONSENT OF YOUR PARENTS AND/OR LEGAL GUARDIANS. We reserve
            the right to refuse use of the Site to anyone and to reject, cancel, interrupt, remove or suspend the
            availability of the Site at any time for any reason without liability
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">2.</span>
          <p>
            <span className="text-decoration-underline">ELIGIBILITY.</span> You agree that You are not (a) a citizen or
            resident of a country in which use or participation is prohibited by law, decree, regulation, treaty or
            administrative act; (b) a citizen or resident of, or located in, a country or region that is subject to U.S.
            or other sovereign country sanctions or embargoes pursuant to embargoes by the Office of Foreign Assets
            Control or otherwise; or (c) an individual or an individual employed by or associated with an entity
            identified on the U.S. Department of Commerce's Denied Persons or Entity List, the U.S. Department of
            Treasury's Specially Designated Nationals or Blocked Persons Lists, or the Department of State's Debarred
            Parties List or otherwise ineligible to receive items subject to U.S. export control laws and regulations,
            including the U.S. Export Administration Act, or other economic sanction rules of any sovereign nation. If
            not, You are not permitted to use this Site in any respect.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">3.</span>
          <p>
            <span className="text-decoration-underline">PRIVACY POLICY.</span> Company respects Your privacy and permits
            You to control the treatment of Your personal information. A complete statement of Company’s current privacy
            policy can be found on Company’s website. Company’s privacy policy is expressly incorporated into this
            Agreement by this reference. By using the Site, You agree to Company’s privacy policy as well as these
            terms.
          </p>
        </section>
        <section className="mb-2">
          <div className="d-flex justify-content-start">
            <span className="me-2">4.</span>
            <p>
              <span className="text-decoration-underline">USE OF SITE AND SERVICE.</span> You are granted a limited,
              non-exclusive, non-transferrable, non-assignable, non-sublicensable, and revocable license to use the Site
              and Services by Company except where prohibited by applicable laws. Company does not transfer either the
              title or the intellectual property rights of the Sites to You in any respect. All trademarks, trade names,
              marks, brands, logos, and other intellectual property are owned by Company or its licensors and You may
              not copy or use them in any manner except as otherwise specifically authorized.
            </p>
          </div>

          <section className="ms-3 d-flex justify-content-start">
            <span className="me-2">4.1</span>
            <p>
              <span className="text-decoration-underline">Client and Talent Accounts.</span> Company provides its
              platform and Site to permit clients (“Clients”) who are seeking talent to connect with the talent
              (“Talent”) to provide services as requested by the Client. The Site is a work marketplace where Clients
              and Talent can identify each other and advertise, buy, and sell Services online. Subject to the Terms of
              Service, Company provides the Services to Users, including hosting and maintaining the Site and
              facilitating the formation of Service Contracts between Clients and Talent. When a User enters a Service
              Contract, the User agrees to use the Services exclusively to invoice, receive, and pay any amounts owed
              under the Service Contract. In registering as a Client or Talent, you represent that you are fully
              responsible and liable for what the your user account (“Account”) does and does not do, including with
              respect to making payments and entering into Service Contracts and our Terms of Service.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-start">
            <span className="me-2">4.2</span>
            <p>
              <span className="text-decoration-underline">Verification of Accounts.</span> Your Account will be subject
              to verification, including but not limited to validation against third-party databases or the verification
              of one or more official government or legal documents that confirm your identity, your location, and your
              ability to act on behalf of your business on Company. You authorize Company, directly or through third
              parties, to make any inquiries necessary to validate your identity, your location, and confirm your
              ownership of your business, email address or financial accounts, subject to applicable law. When
              requested, you must timely provide us with complete information about yourself and your business, which
              includes providing official government or legal documents, and cooperating with other reasonable requests
              we make to verify your identity. During verification some Account features may be temporarily limited but
              will be restored if verification is successfully completed
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-start">
            <span className="me-2">4.3</span>
            <p>
              <span className="text-decoration-underline">User Accounts.</span> Each person who uses our Services must
              register for their own Account with a username and password. You are responsible for safeguarding and
              maintaining the confidentiality of your username and password, and agree not to share your username or
              password with anyone. You are responsible for safeguarding your username and password and for any use of
              our Services with your username and password. You agree to notify us immediately if you suspect or become
              aware of any unauthorized use of your Account or any unauthorized access to your password. You further
              agree not to use the Account or log in with the username and password of another User.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-start">
            <span className="me-2">4.4</span>
            <p>
              <span className="text-decoration-underline">Platform Only.</span> We offer a work marketplace: an online
              platform for Users to find and connect with each other. We are not involved directly in your negotiations
              or the delivery of Services and are not a party to any agreements you may make with other Users. You are
              solely responsible for your content published to the Site and for your agreements with other Users,
              including vetting each other and performance under the agreements. <br /> <br /> We neither perform nor
              employ individuals to perform the Services. You acknowledge and agree that Company does not supervise,
              direct, control, or monitor Users in the performance of any contractual obligations they may have under a
              Service Contract and agree that: (a) Company is not responsible for ensuring the accuracy or legality of
              any User Content, for which Users are solely responsible; (b) Company is not responsible for the offering,
              performance, or procurement of Services, (c) Company does not make any representations about or guarantee
              any particular User’s offered services, and (d) nothing will create an employment, agency, or joint
              venture relationship between Company and any User offering services. While Company may provide certain
              badges on User profiles, such badges are not guarantees, including of quality or ability or willingness of
              the badged Talent or Client to complete a Service Contract. <br /> <br /> You further acknowledge and
              agree that Users, and not Company, are solely responsible for (a) evaluating and determining the
              suitability of any Project, Client, or Talent; (b) assessing whether to enter into a Service Contract with
              another User and for verifying any information about another User; (c) deciding whether to enter into a
              Service Contract as well as the contract terms, and (d) negotiating, agreeing to, and executing any terms
              or conditions of the contracts and for performing and monitoring performance under them. All Services
              between Users are directly between the Users; and Company is not a party to those contracts.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-start">
            <span className="me-2">4.5</span>
            <p>
              <span className="text-decoration-underline">Prohibited Uses.</span> You are prohibited from violating or
              attempting to violate any security features of the Site, including, without limitation: <br />
              <br />
              <span className="me-2">a)</span>copying, renting, leasing, selling, redistributing, reproducing, the Site,
              nor any component thereof; <br /> <br />
              <span className="me-2">b)</span>accessing content or data not intended for You, or logging onto a server
              or account that You are not authorized to access; <br /> <br />
              <span className="me-2">c)</span>attempting to probe, scan, or test the vulnerability of the Service, the
              Site, or any associated system or network, or to breach security or authentication measures without proper
              authorization; <br /> <br />
              <span className="me-2">d)</span>interfering or attempting to interfere with service to any user, host, or
              network, including, without limitation, by means of submitting a virus to the Site, overloading,
              “flooding,” “spamming,” “mail bombing,” or “crashing;” <br />
              <br />
              <span className="me-2">e)</span>cusing the Site to send unsolicited e-mail, including, without limitation,
              promotions, or advertisements for products or services;
              <br />
              <br />
              <span className="me-2">f)</span>forging any TCP/IP packet header or any part of the header information in
              any e-mail or in any posting using the Service; or
              <br />
              <br />
              <span className="me-2">g)</span>attempting to modify, reverse-engineer, decompile, disassemble, or
              otherwise reduce, underlying ideas, or algorithms, or attempt to reduce to a human-perceivable form any of
              the source code used by Company in providing the Site; <br />
              <br />
              <span className="me-2">h)</span>taking any action that imposes or may impose (as determined by the Company
              in its sole discretion) an unreasonable or disproportionately large load on the Company’s or its
              third-party providers’ infrastructure;
              <br />
              <br />
              <span className="me-2">i)</span>interfering or attempt to interfere with the proper working of the Service
              or any activities conducted on the Service;
              <br />
              <br />
              <span className="me-2">j)</span>bypassing any measures the Company may use to prevent or restrict access
              to the Service or other accounts, computer systems, or networks connected to the Service); <br /> <br />
              <span className="me-2">k)</span>running Mail-list, Listserv, or any form of auto-responder or "spam" on
              the Service;
              <br />
              <br />
              <span className="me-2">l)</span>using manual or automated software, devices, or other processes to "crawl"
              or "spider" any page of the Site; and/or
              <br />
              <br />
              <span className="me-1">m)</span>collecting Participants’ personal, contact, demographic, or other
              information <br />
              <br />
              Any violation of system or network security may subject You to civil and/or criminal liability.
            </p>
          </section>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">5.</span>
          <p>
            <span className="text-decoration-underline">TAXES.</span> If you register for a Talent account, you
            acknowledge that as Talent you are is solely responsible for: (a) all tax liability associated with payments
            received from Clients and through Company; (b) obtaining any liability, health, workers’ compensation,
            disability, unemployment, or other insurance needed or required by law, and that is not covered by or
            eligible for any insurance from Company; (c) determining and fulfilling Your obligations under applicable
            laws and regulations with respect to invoicing and reporting, collecting, or remitting any applicable taxes
            or charges; and (d) if outside of the United States, determining if Company is required by applicable law to
            withhold any amount of the fees and notifying Company of any such requirement and indemnifying Company for
            any requirement to pay any withholding amount to the appropriate authorities (including penalties and
            interest). In the event of an audit of Company, agrees to promptly cooperate with Company and provide copies
            of Your tax returns and other documents as may be reasonably requested for purposes of such audit, including
            but not limited to records showing is engaging in an independent business as represented to Company.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">6.</span>
          <p>
            <span className="text-decoration-underline">SERVICE CONTRACT BETWEEN TALENT AND CLIENTS.</span> If a Client
            and Talent decide to enter into a Service Contract, the contract is a contractual relationship directly
            between the Client and the Talent; Company is not responsible for and is not a party to any Service Contract
            and under no circumstances will any such contract create an employment or any service relationship between
            Company and any User. <br /> <br />
            With respect to any Service Contract, Clients and Talents may enter into any agreements that they deem
            appropriate (e.g., confidentiality agreements, invention assignment agreements, assignment of rights, etc.),
            provided that those agreements do not conflict with, narrow, or expand Company’s rights and obligations
            under the Terms of Service. <br />
            <br />
            The parties to a Service Contract can, if the parties prefer, agree to the Optional Service Contract Terms
            in whole or in part, in addition to or instead of other such agreements. The parties to a Service Contract
            expressly agree that the Optional Service Contract Terms will and do apply to their contract to the extent
            that they have not agreed to other terms or agreements that conflict with the Optional Service Contract
            Terms. Users are solely responsible for deciding whether to use the Optional Service Contract Terms, and
            Company does not assume any responsibility for any consequence of using the Optional Service Contract Terms,
            which are provided as a sample only and may not be appropriate for all contracts. The Optional Service
            Contract Terms are not intended to and do not (a) constitute legal advice, (b) create an attorney-client
            relationship, or (c) constitute advertising or a solicitation of any type. You should seek legal advice from
            a licensed attorney for your particular needs.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">7.</span>
          <p>
            <span className="text-decoration-underline">TALENT CLASSIFICATION.</span> Client is solely responsible for
            and assumes all liability for determining whether Talents should be engaged as independent contractors or
            employees and engaging them accordingly. Client warrants its decisions regarding classification are correct
            and its manner of engaging Talent complies with applicable laws, regulations, and rules. Company is not
            responsible for worker classification as between Client and Talent, and nothing in this Agreement is
            intended to or should be construed to create a partnership, joint venture, franchisor/franchisee or
            employer-employee relationship between Company and a User.
          </p>
        </section>
        <section className="mb-2">
          <div className="d-flex justify-content-start">
            <span className="me-2">8.</span>
            <p>
              <span className="text-decoration-underline">FEES.</span> Company charges a service fee to the value of the
              Service Contract between Talent and Client (“Service Fee”) and pricing/fee disclosures are accessible at
              www,trumio.ai. Talent and Client hereby irrevocably authorize and instruct Company to deduct the Service
              Fee the funds deposited for the payment of Talent, as well as all administrative, payment processing, and
              other fees and expenses that may be incurred during the course of the transactions. The Company’s Service
              Fee is exclusive of taxes. Company may be required by applicable law to collect certain taxes or levies,
              including income tax or VAT (which some jurisdictions refer to as GST or local sales taxes). These
              collection requirements and rates may change based on changes to the law in your area. Any amounts Company
              is required to collect or withhold for the payment of any such taxes shall be collected in addition to the
              fees owed to Company under the Terms of Service.
            </p>
          </div>
          <section className="ms-3 d-flex justify-content-start">
            <span className="me-2">8.1</span>
            <p>
              <span className="text-decoration-underline">Payment Methods.</span> In order to use certain Site Services,
              Client must provide account information for at least one valid Payment Method. <br />
              <br />
              Client hereby authorizes Company to run credit card authorizations on all credit cards provided by Client,
              to store credit card and banking or other financial details as Client’s method of payment consistent with
              our Privacy Policy, and to charge Client’s credit card (or any other Payment Method) for the Talent Fees,
              Service Fees, and any other amounts owed under the Terms of Service. To the extent permitted by applicable
              law and subject to our Privacy Policy, you acknowledge and agree that we may use certain third-party
              vendors and service providers to process payments and manage your Payment Method information. <br />
              <br />
              By providing Payment Method information through the Site or by authorizing payments with the Payment
              Method, Client represents that: (a) Client is legally authorized to provide such information; (b) Client
              is legally authorized to make payments using the Payment Method(s); (c) if Client is an employee or agent
              of a company or person that owns the Payment Method, that Client is authorized by the company or person to
              use the Payment Method to make payments on Company; and (d) such actions do not violate the terms and
              conditions applicable to Client’s use of such Payment Method(s) or applicable law. <br />
              <br />
              When Client authorizes a payment using a Payment Method via the Site, Client represents that there are
              sufficient funds or credit available to complete the payment using the designated Payment Method. To the
              extent that any amounts owed under this Agreement or the other Terms of Service cannot be collected from
              Client’s Payment Method(s), Client is solely responsible for paying such amounts by other means. Company
              is not liable to any User if Company does not complete a transaction as a result of any limit by
              applicable law or your financial institution, or if a financial institution fails to honor any credit or
              debit to or from an account associated with such Payment Method. Company will make commercially reasonable
              efforts to work with any such affected Users to resolve such transactions in a manner consistent with this
              Agreement. <br />
              <br />
              All payments shall be settled in US Dollars and all foreign currency conversions shall take place at the
              rates in effect at the time of the transaction.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">8.2</span>
            <p>
              <span className="text-decoration-underline">Authorization For ACH Transactions.</span> If you elect to pay
              Talent Fees or any other amounts owed under the Terms of Service via ACH transfers from your designated
              bank account, you hereby authorize us to electronically debit and, if necessary, electronically credit
              your designated bank account via ACH for such amounts pursuant to the Terms of Service, and you agree to
              comply with the ACH rules issued by the National Automated Clearing House (“NACHA”) and all applicable
              laws, including, but not limited to, the federal Bank Secrecy Act, the U.S.A. Patriot Act, and economic
              sanctions overseen by the Office of Foreign Assets Control (OFAC). Your authorization for ACH transfers
              contained in this Section will remain in full force and effect until you notify us that you wish to revoke
              your authorization by removing your bank account information from your User Account
            </p>
          </section>
        </section>
        <section className="mb-2 d-flex justify-content-center">
          <span className="me-2">9.</span>
          <p>
            <span className="text-decoration-underline">NON-CIRCUMVENTION.</span> You agree to communicate through the
            Site and make and receive payments only through the Site for two years from the date you first identify or
            meet your Client or Talent on the Site. Violations of this Section constitute a serious breach and may
            result in permanent suspension of your Account.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">10.</span>
          <p>
            <span className="text-decoration-underline">LAW ENFORCEMENT.</span> Company intends to cooperate fully with
            any law enforcement officials or agencies in the investigation of any violation of these Terms or of any
            applicable laws. We will cooperate with law enforcement authorities as required by law. We will cooperate
            with law enforcement agencies in any investigation of alleged illegal activity regarding the use of the
            Service or the Site when requested.
          </p>
        </section>
        <section className="mb-2">
          <div className="d-flex justify-content-start">
            <span className="me-2">11.</span>
            <p>
              <span className="text-decoration-underline">DMCA and COPYRIGHT INFRINGEMENT. </span>
            </p>
          </div>

          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">11.1</span>
            <p>
              <span className="text-decoration-underline">ALLEGED VIOLATIONS.</span> Company has in place certain
              legally mandated procedures regarding allegations of copyright infringement occurring on the Site or with
              the Service. Company has adopted a policy that provides for the immediate suspension and/or termination of
              any Site user who is found to have infringed on the rights of Company or of a third party, or otherwise
              violated any intellectual property laws or regulations. Company’s policy is to investigate any allegations
              of copyright infringement brought to its attention <br />
              <br />
              If You have evidence, know, or have a good faith belief that Your rights or the rights of a third party
              have been violated and You want Company to delete, edit, or disable the material in question, whether in
              connection with the Digital Millennium Copyright Act of 1998 (DMCA), You must provide Company with all of
              the following information: (a) a physical or electronic signature of a person authorized to act on behalf
              of the owner of the exclusive right that is allegedly infringed; (b) identification of the copyrighted
              work claimed to have been infringed, or, if multiple copyrighted works are covered by a single
              notification, a representative list of such works; (c) identification of the material that is claimed to
              be infringed or to be the subject of infringing activity and that is to be removed or access to which is
              to be disabled, and information reasonably sufficient to permit Company to locate the material; (d)
              information reasonably sufficient to permit Company to contact You, such as an address, telephone number,
              and if available, an electronic mail address at which You may be contacted; (e) a statement that You have
              a good faith belief that use of the material in the manner complained of is not authorized by the
              copyright owner, its agent, or the law; and (f) a statement that the information in the notification is
              accurate, and under penalty of perjury, that You are authorized to act on behalf of the owner of an
              exclusive right that is allegedly infringed. For this notification to be effective, You must provide it to
              Company’s designated agent by mail and email at: support@trumio.ai. <br />
              <br /> UNDER FEDERAL LAW, IF YOU KNOWINGLY MISREPRESENT THAT ONLINE MATERIAL IS INFRINGING, YOU MAY BE
              SUBJECT TO CRIMINAL PROSECUTION FOR PERJURY AND CIVIL PENALTIES, INCLUDING MONETARY DAMAGES, COURT COSTS,
              AND ATTORNEYS' FEES.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">11.2</span>
            <p>
              <span className="text-decoration-underline">COUNTER-NOTICE.</span>If You believe that Your material has
              been removed or disabled by mistake or misidentification, You may file a written counter-notice with the
              Designated Agent, including the following information <b> ("Counter-Notice") </b>within 5 business days
              from Your receipt of Our notice of infringement: a) a physical or electronic signature of the owner or
              authorized user of material; b) identification of the material that has been removed or to which access
              has been disabled and the location at which the material appeared before it was removed or access to it
              was disabled; c) a statement made under penalty of perjury that You have a good faith belief that the
              material was removed or disabled as a result of mistake or misidentification of the material; and d) Your
              name, address, telephone number, and a statement that You consent to the jurisdiction of the Federal
              District Court for the judicial district in which the address is located, or if Your address is outside of
              the United States, and that You will accept service of process from the Complainant or an agent of such
              person. If You fail to provide required information or follow this process, You may waive Your rights. If
              You have any questions regarding Your legal rights and legal obligations, You should consult with an
              attorney.
            </p>
          </section>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">12.</span>
          <p>
            <span className="text-decoration-underline">ALLEGED VIOLATIONS.</span> Company reserves the right to
            terminate Your use of the Service and/or the Site. To ensure that Company provides a high quality experience
            for You and for other users of the Site and the Service, You agree that Company or its representatives may
            access Your account and records on a case-by-case basis to investigate complaints or allegations of abuse,
            infringement of third party rights, or other unauthorized uses of the Site or the Service. Company reserves
            the right to terminate Your access to the Site immediately, with or without notice to You, and without
            liability to You, if Company believes that You have violated any of the Terms of Use, furnished Company with
            false or misleading information, or interfered with use of the Site or the Service by others.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">13.</span>
          <p>
            <span className="text-decoration-underline">NO WARRANTIES.</span>{' '}
            <b className="text-decoration-underline "> COMPANY HEREBY DISCLAIMS ALL WARRANTIES. </b>
            COMPANY IS MAKING THE SITE AND SERVICE AVAILABLE “AS IS” WITHOUT WARRANTY OF ANY KIND. YOU ASSUME THE RISK
            OF ANY AND ALL DAMAGE OR LOSS FROM USE OF, OR INABILITY TO USE, THE SITE OR THE SERVICE. TO THE MAXIMUM
            EXTENT PERMITTED BY LAW, COMPANY EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, EXPRESS OR IMPLIED, REGARDING
            THE SITE, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, OR NONINFRINGEMENT. COMPANY DOES NOT WARRANT THAT THE SITE OR THE SERVICE WILL MEET YOUR
            REQUIREMENTS OR THAT THE OPERATION OF THE SITE OR THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE. The
            Company, and its directors, officers, members, managers, employees, agents, suppliers, partners, and content
            providers do not warrant that: (a) the Site will be secure or available at any particular time or location;
            (b) any defects or errors will be corrected; (c) any content or software available at or through the Site is
            free of viruses or other harmful components; or (d) the results of using the Site will meet Your
            requirements. Your use of the Site is solely at Your own risk. The Company makes no guaranty of
            confidentiality or privacy of any communication or information transmitted on the Site or any website linked
            to the Site. The Company will not be liable for the privacy of email addresses, registration and
            identification information, disk space, communications, confidential or trade-secret information, or any
            other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or
            otherwise connected with Your use of the Site. <br />
            <br />
            YOU ACKNOWLEDGE THAT YOUR USE OF THE SITE AND SERVICES ARE AT YOUR OWN RISK. WE SPECIFICALLY DO NOT WARRANT
            THAT THE CONTENT ON THE SITE IS ACCURATE, RELIABLE OR CORRECT. YOU EXPRESSLY WAIVE AND RELEASE US FROM ANY
            AND ALL LIABILITY, CLAIMS, OR DAMAGES YOU ENCOUNTER THROUGH USE OF THE SITE, SERVICES OR APPLICATIONS. WE
            DISCLAIM ALL LIABILITY AND ASSUMES NO RESPONSIBILITY OR LIABILITY FOR ACTS WHICH CAUSE PERSONAL INJURY,
            PROPERTY DAMAGE, DEATH, THEFT, DEFAMATION, DISPARAGEMENT, DISCRIMINATION, BREACH OR INTERFERENCE WITH A
            THIRD-PARTY CONTRACT, OR MISREPRESENTATION. YOU ACKNOWLEDGE THAT WE OWE NO DUTY OF CARE TO YOU AND WE
            DISCLAIM ANY AND ASSUMES NO RESPONSIBILITY OR LIABILITY FOR BREACH OF SUCH A DUTY. <br />
            <br />
            WE EXERCISE NO CONTROL OVER USER CONTENT AND WE SHALL NOT BE LIABLE TO YOU FOR ANY LOSSES OR DAMAGES THAT
            MAY RESULT FROM THE ACTS OR OMISSIONS OF US OR ANY THIRD PARTIES. WE DISCLAIM ALL LIABILITIES AND ASSUME NO
            RESPONSIBILITY OR LIABILITY FOR LOSSES OR DAMAGES RESULTING FROM DISCLOSURE OF YOUR PERSONAL OR CONFIDENTIAL
            INFORMATION WHETHER BY US OR ANY THIRD PARTIES. WE DISCLAIM ALL LIABILITIES ARISING OUT OF ANY THIRD PARTY’S
            ACTS OR OMISSIONS, OF EVERY KIND AND NATURE, WHETHER FORSEEABLE OR NOT.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">14.</span>
          <p>
            <span className="text-decoration-underline">LIMITED LIABILITY.</span>{' '}
            <b className="text-decoration-underline "> COMPANY’S LIABILITY TO YOU IS LIMITED. </b>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY BE LIABLE FOR DAMAGES OF ANY KIND
            (INCLUDING, BUT NOT LIMITED TO, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, LOST PROFITS, OR LOST DATA,
            REGARDLESS OF THE FORESEEABILITY OF THOSE DAMAGES) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE
            OR ANY OTHER SERVICES PROVIDED TO YOU BY OR THROUGH COMPANY, exceeding ten dollars ($10.00.) This limitation
            shall apply regardless of whether the damages arise out of breach of contract, tort, or any other legal
            theory or form of action.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">15.</span>
          <p>
            <span className="text-decoration-underline">RELEASE.</span> IN CONSIDERATION OF BEING PERMITTED TO ACCESS
            AND USE THE SITE AND SERVICE, YOU HEREBY AGREE TO RELEASE COMPANY, AND ITS AFFILIATES, AND EACH OF ITS AND
            THEIR RESPECTIVE SUCCESSORS, ASSIGNS, OFFICERS, DIRECTORS, MANAGERS, MEMBERS, AGENTS, CO-BRANDERS, OTHER
            PARTNERS, EMPLOYEES, AND ALL LICENSEES AND DESIGNEES OF COMPANY FROM ALL DAMAGES (WHETHER DIRECT, INDIRECT,
            INCIDENTAL, CONSEQUENTIAL OR OTHERWISE), LOSSES, LIABILITIES, COSTS AND EXPENSES OF EVERY KIND AND NATURE,
            KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE SERVICES, YOUR ACCESS AND USE OF THE
            SERVICES, OR ALL CONTENT PROVIDED RELATING THERETO. <br />
            <br />{' '}
            <b>
              IN CONNECTION WITH THE FOREGOING RELEASE, YOU HEREBY WAIVE CIVIL CODE 1542 AND ANY OTHER SIMILAR LAW OR
              STATUTE OF ANY OTHER STATE, WHICH SAYS, IN SUBSTANCE:
            </b>{' '}
            <br />
            <br />
            <b>
              "A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS
              FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM MUST HAVE MATERIALLY AFFECTED HIS
              SETTLEMENT WITH THE DEBTOR."
            </b>
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">16.</span>
          <p>
            <span className="text-decoration-underline">ECPA NOTICE.</span> Pursuant to the Electronic Communications
            Privacy Act (18 U.S.C. §§ 2701-2711): THE COMPANY MAKES NO GUARANTEE OF CONFIDENTIALITY OR PRIVACY OF ANY
            COMMUNICATION OR INFORMATION TRANSMITTED ON THE SITE OR ANY WEBSITE LINKED TO THE SITE. The Company will not
            be liable for the privacy of email addresses, registration and identification information, disk space,
            communications, confidential or trade-secret information, or any other content stored on the Company’s
            equipment, transmitted over networks accessed by the Site, or otherwise connected with Your use of the
            Service
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">17.</span>
          <p>
            <span className="text-decoration-underline">AFFILIATED SITES.</span> Company has no control over, and no
            liability for any third party websites or materials. Company works with a number of partners and affiliates
            whose websites may be linked with the Site. Because neither Company nor the Site has control over the
            content and performance of these partner and affiliate sites, Company makes no guarantees about the
            accuracy, currency, content, or quality of the information provided by such sites, and Company assumes no
            responsibility for unintended, objectionable, inaccurate, misleading, or unlawful content that may reside on
            those sites. Similarly, from time to time in connection with Your use of the Site, You may have access to
            content items (including, but not limited to, websites) that are owned by third parties. You acknowledge and
            agree that Company makes no guarantees about, and assumes no responsibility for, the accuracy, currency,
            content, or quality of this third party content, and that, unless expressly provided otherwise, these Terms
            shall govern Your use of any and all third party content in connection with, arising out of, or relating to
            the Site.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">18.</span>
          <p>
            <span className="text-decoration-underline">INDEMNITY.</span> You agree to indemnify Company for certain of
            Your acts and omissions. You agree to indemnify, defend, and hold harmless Company, its affiliates,
            officers, directors, employees, consultants, agents, and representatives from any and all third party
            claims, losses, liability, damages, and/or costs (including reasonable attorney fees and costs) arising from
            Your access to or use of the Site, Your violation of these Terms, or Your infringement of any intellectual
            property or other right of any person or entity and all violations of state, federal, local, or foreign law
            caused by or arising out of Your acts or omissions. Company will notify You promptly of any such claim,
            loss, liability, or demand, and will provide You with reasonable cooperation, at Your expense, in defending
            any such claim, loss, liability, damage, or cost.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">19.</span>
          <p>
            <span className="text-decoration-underline">COPYRIGHT.</span> All contents of Site are copyrighted to
            Company. All rights are reserved.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">20.</span>
          <p>
            <span className="text-decoration-underline">TRADEMARKS.</span> The trademarks, service marks, and logos of
            Company (the "Company Trademarks") used and displayed in connection with the Services are registered and
            unregistered trademarks or service marks of Company. Other company, product, and service names used in
            connection with the Services may be trademarks or service marks owned by third parties (the "Third Party
            Trademarks", and, collectively with Company Trademarks, the "Trademarks"). The offering of the Services
            shall not be construed as granting, by implication, estoppel, or otherwise, any license or right to use any
            Trademark displayed in connection with the Services without the prior written consent of Company specific
            for each such use. The Trademarks may not be used to disparage Company, any third party or Company’s or
            third party's products or services, or in any manner (in Company’s sole judgment) that may damage any
            goodwill in the Trademarks. Use of any Trademarks as part of a link to or from any site is prohibited unless
            Company approves the establishment of such a link by prior written consent specific for each such link. All
            goodwill generated from the use of any Company Trademark shall inure to Company’s benefit.
          </p>
        </section>
        <section className="mb-2">
          <div className="d-flex justify-content-start">
            <span className="me-2">21.</span>
            <p>
              <span className="text-decoration-underline">ARBITRATION.</span> If a dispute arises between you and
              Company or our Affiliates, our goal is to resolve the dispute quickly and cost-effectively. Accordingly,
              unless you opt out as provided below, you, Company, and our Affiliates agree to resolve any and all
              claims, disputes, or controversies that arise out of or relate to this Agreement, the other Terms of
              Service, your relationship with Company (including without limitation any claimed employment with Company
              or one of our Affiliates or successors), the termination of your relationship with Company, or the
              Services (each a “Claim” and collectively, “Claims”) through binding arbitration on an individual basis in
              accordance with this Section (sometimes referred to as the “Arbitration Provision”). <br />
              <br />
              Claims that may not be subject to predispute arbitration agreement as provided by the Dodd-Frank Wall
              Street Reform and Consumer Protection Act (Public Law 111-203), Ending Forced Arbitration of Sexual
              Assault and Sexual Harassment Act (Public Law 117-90), or by generally applicable law are excluded from
              the coverage of this Arbitration Provision. <br />
              <br />
              By agreeing to arbitrate disputes under this Agreement, THE PARTIES ARE EXPRESSLY GIVING UP ANY AND ALL
              RIGHTS TO A JURY TRIAL OR COURT TRIAL BEFORE A JUDGE. The parties instead elect to have Claims resolved by
              arbitration. The arbitrator’s decision shall be final and binding on the parties, subject to review on the
              grounds set forth in the Federal Arbitration Act (“FAA”).
            </p>
          </div>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.1</span>
            <p>
              <span className="text-decoration-underline">Choice Of Law.</span> All Claims arising out of or relating to
              the Site will be governed by and construed in accordance with the laws of the State of California, without
              regard to its conflict of law provisions; provided, however, that any Claims made by any Talent located
              within the United States will be governed by the law of the state in which such Talent resided at the time
              the dispute arose. <br />
              <br />
              However, notwithstanding the foregoing sentence, this Arbitration Provision is governed by the Federal
              Arbitration Act (9 U.S.C. §§ 1 et seq.).
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.2</span>
            <p>
              <span className="text-decoration-underline">Informal Dispute Resolution.</span> Before serving a demand
              for arbitration of a Claim, you and Company agree to first notify each other of the Claim. You agree to
              notify Company of the Claim by email to support@trumio.ai, and Company agrees to provide to you a notice
              at your email address on file (in each case, a “Notice”). You and Company then will seek informal
              voluntary resolution of the Claim. Any Notice must include pertinent account information, a brief
              description of the Claim, and contact information, so that you or Company, as applicable, may evaluate the
              Claim and attempt to informally resolve it. Both you and Company will have 60 days from the date of the
              receipt of the Notice to informally resolve the other party’s Claim and avoid the need for further action.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.3</span>
            <p>
              <span className="text-decoration-underline">
                Binding Arbitration And Class Action/Jury Trial Waiver (Does Not Apply To Users Located Outside The
                United States And Its Territories).
              </span>{' '}
              This Arbitration Provision applies to all Users located in or who reside in the United States and its
              territories. In the unlikely event the parties are unable to resolve a Claim within 60 days of the receipt
              of the applicable Notice, you, Company, and our Affiliates agree to resolve the Claim by final and binding
              individual arbitration before an arbitrator from JAMS, instead of a court or jury. JAMS may be contacted
              at www.jamsadr.com.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.4</span>
            <p>
              <span className="text-decoration-underline">
                Scope Of Arbitration Agreement And Conduct Of Arbitration.
              </span>{' '}
              This Arbitration Provision applies to any Claim (defined above) the parties may have, whether based on
              past, present, or future events, and includes all claims and disputes that arose between the parties
              before the effective date of this Agreement, and survives after your relationship with Company ends. For
              the avoidance of doubt, Claims covered by this Arbitration Provision include, but are not limited to, all
              claims, disputes or controversies arising out of or relating to this Agreement, the Terms of Service,
              Service Contracts or in any way relating to the Site. This Arbitration Provision is intended to apply to
              the resolution of disputes that otherwise would be resolved in a court of law or before a forum other than
              arbitration. If for any reason JAMS will not administer the arbitration, either party may apply to a court
              of competent jurisdiction with authority over the location where the arbitration will be conducted for
              appointment of a neutral arbitrator <br />
              <br />
              Except as otherwise provided in this Agreement, arbitration will be conducted in Santa Clara County,
              California in accordance with the JAMS Comprehensive Arbitration Rules and Procedures’ Optional Expedited
              Arbitration Procedures then in effect. Arbitration of disputes brought by a User that allege a violation
              of a consumer protection statute also will be subject to the JAMS Consumer Arbitration Minimum Standards,
              and such arbitrations will be conducted in the same state and within 25 miles of where the User is
              located. Claims by Talents that allege employment or worker classification disputes will be conducted in
              the state and within 25 miles of where Talent is located in accordance with the JAMS Employment
              Arbitration Rules and Procedures then in effect. The applicable JAMS arbitration rules may be found at
              www.jamsadr.com or by searching online for “JAMS Comprehensive Arbitration Rules and Procedures,” “JAMS
              Employment Arbitration Rules,” or “JAMS Consumer Arbitration Minimum Standards.” Any dispute regarding the
              applicability of a particular set of JAMS rules shall be resolved exclusively by the arbitrator. Any party
              will have the right to appear at the arbitration by telephone and/or video rather than in person. <br />
              <br />
              You and Company will follow the applicable JAMS rules with respect to filing or initial appearance and
              arbitration fees. The arbitrator shall follow applicable law and may award only those remedies that would
              have applied had the matter been heard in court. Judgment may be entered on the arbitrator’s decision in
              any court having jurisdiction. <br />
              <br />
              This Arbitration Provision does not apply to litigation between Company and you that is or was already
              pending in a state or federal court or arbitration before the expiration of the opt-out period set forth
              below. Notwithstanding any other provision of this Agreement, no amendment to this Arbitration Provision
              will apply to any matter pending in an arbitration proceeding brought under this Section unless all
              parties to that arbitration consent in writing to that amendment. <br />
              <br />
              This Arbitration Provision also does not apply to claims for workers compensation, state disability
              insurance, or unemployment insurance benefits. <br />
              <br />
              Nothing in this Arbitration Provision prevents you from making a report to or filing a claim or charge
              with a government agency, including without limitation the Equal Employment Opportunity Commission, U.S.
              Department of Labor, U.S. Securities and Exchange Commission, National Labor Relations Board, or Office of
              Federal Contract Compliance Programs. Nothing in this Arbitration Provision prevents the investigation by
              a government agency of any report, claim or charge otherwise covered by this Arbitration Provision. This
              Arbitration Provision also does not prevent federal administrative agencies from adjudicating claims and
              awarding remedies based on those claims, even if the claims would otherwise be covered by this Arbitration
              Provision. Nothing in this Arbitration Provision prevents or excuses a party from satisfying any
              conditions precedent or exhausting administrative remedies under applicable law before bringing a claim in
              arbitration. Company will not retaliate against you for filing a claim with an administrative agency or
              for exercising rights (individually or in concert with others) under Section 7 of the National Labor
              Relations Act.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.5</span>
            <p>
              <span className="text-decoration-underline">
                Interpretation And Enforcement Of This Arbitration Provision.
              </span>{' '}
              This Arbitration Provision is the full and complete agreement relating to the formal resolution of Claims.
              The arbitrator shall have exclusive jurisdiction to decide all disputes arising out of or relating to the
              arbitrability of a Claim or the interpretation, enforcement, or application of this Arbitration Provision,
              including the enforceability, revocability, scope, breach, or validity of the Arbitration Provision or any
              portion of the Arbitration Provision, except as expressly provided below. All such matters shall be
              decided by an arbitrator and not by a court. The parties expressly agree that, except as provided by the
              Class and Collective Waiver section below, the arbitrator and not a court will decide any question of
              whether the parties agreed to arbitrate, including but not limited to any claim that all or part of this
              Arbitration Provision, this Agreement, or any other part of the Terms of Service is void or voidable.{' '}
              <br />
              <br />
              In the event any portion of this Arbitration Provision is deemed unenforceable, the remainder of this
              Arbitration Provision will be enforceable, except as set forth below.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.6</span>
            <p>
              <span className="text-decoration-underline">Class And Collective Waiver.</span> Private attorney general
              representative actions under the California Labor Code are not arbitrable, not within the scope of this
              Arbitration Provision and may be maintained in a court of law. However, this Arbitration Provision affects
              your ability to participate in class or collective actions. Both you and Company agree to bring any
              dispute in arbitration on an individual basis only, and not on a class or collective basis on behalf of
              others. There will be no right or authority for any dispute to be brought, heard or arbitrated as a class
              or collective action, or as a member in any such class or collective proceeding (“Class Action Waiver”).
              Notwithstanding any other provision of this Agreement or the JAMS rules, disputes regarding the
              enforceability, revocability, scope, validity, or breach of the Class Action Waiver may be resolved only
              by a civil court of competent jurisdiction and not by an arbitrator. If there is a final judicial
              determination that all or part of the Class Action Waiver is unenforceable or that an arbitration can
              proceed on a class basis, then the arbitration provision herein shall be considered null and void in its
              entirety and the class or collective action to that extent must be litigated in a civil court of competent
              jurisdiction. No arbitration or proceeding will be combined with another without the prior written consent
              of all parties to all affected arbitrations or proceedings. You and Company agree that you will not be
              retaliated against as a result of your filing or participating in a class or collective action in any
              forum. However, Company may lawfully seek enforcement of this Arbitration Provision and the Class Action
              Waiver under the Federal Arbitration Act and seek dismissal of such class or collective actions or claims.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.7</span>
            <p>
              <span className="text-decoration-underline">Right To Opt Out Of The Arbitration Provision.</span> You may
              opt out of the Arbitration Provision contained in this Section by notifying Company in writing within 30
              days of the date you first registered for the Site. To opt out, you must send a written notification to
              Company at Attn: Tumio Support - Arbitration Opt Out that includes (a) your Account username, (b) your
              name, (c) your address, (d) your telephone number, (e) your email address, and (f) a statement indicating
              that you wish to opt out of the Arbitration Provision. Alternatively, you may send this written
              notification to support@trumio.ai. <br />
              <br />
              Opting out of this Arbitration Provision will not affect any other terms of this Agreement. <br />
              <br />
              If you do not opt out as provided in this Section, continuing your relationship with Company constitutes
              mutual acceptance of the terms of this Arbitration Provision by you and Company. You have the right to
              consult with counsel of your choice concerning this Agreement and the Arbitration Provision.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">21.8</span>
            <p>
              <span className="text-decoration-underline">Enforcement of this Arbitration Provision.</span> This
              Arbitration Provision replaces all prior agreements regarding the arbitration of disputes and is the full
              and complete agreement relating to the formal resolution of disputes covered by this Arbitration
              Provision. In the event any portion of this Arbitration Provision is deemed unenforceable, the remainder
              of this Arbitration Provision will be enforceable.
            </p>
          </section>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">22.</span>
          <p>
            <span className="text-decoration-underline">NOTIFICATION.</span> You agree that We may provide notifications
            to You via email, written or hard copy notice, or through conspicuous posting of such notice on Our Site.
            You may opt out of certain means of notification or to receive certain notifications.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">23.</span>
          <p>
            <span className="text-decoration-underline">JURISDICTION.</span> By using this Site, and/or registering with
            the Site, You consent to the personal jurisdiction over You by the State of California and waive all
            defenses asserting improper service, lack of personal jurisdiction, forum non conveniens, or any similar
            defense that challenges the personal jurisdiction of the State of California over You.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">24.</span>
          <p>
            <span className="text-decoration-underline">CHOICE OF LAW.</span> These Terms shall be construed in
            accordance with and governed by the laws of the United States and the State of California, without reference
            to their rules regarding conflicts of law. You hereby irrevocably consent to the exclusive jurisdiction of
            the State of California in all disputes arising out of or related to the use of the Site.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">25.</span>
          <p>
            <span className="text-decoration-underline">SEVERABILITY; WAIVER.</span> If, for whatever reason, a court of
            competent jurisdiction finds any term or condition in these Terms to be unenforceable, all other terms and
            conditions will remain unaffected and in full force and effect. No waiver of any breach of any provision of
            these Terms of Use shall constitute a waiver of any prior, concurrent, or subsequent breach of the same or
            any other provisions hereof, and no waiver shall be effective unless made in writing and signed by an
            authorized representative of the waiving party
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">26.</span>
          <p>
            <span className="text-decoration-underline">NO LICENSE.</span> Nothing contained on the Site should be
            understood as granting You a license to use any of the trademarks, service marks, or logos owned by Company
            or by any third party.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">27.</span>
          <p>
            <span className="text-decoration-underline">JURISDICTIONAL LIMITATIONS.</span> Company makes no
            representation that any of the materials or the services to which You have been given access are available
            or appropriate for use in other locations. Your use of or access to the Site should not be construed as
            Company’s purposefully availing itself of the benefits or privilege of doing business in any state or
            jurisdiction.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">28.</span>
          <p>
            <span className="text-decoration-underline">MODIFICATIONS.</span> Company may, in its sole discretion and
            without prior notice, (a) revise these Terms of Use; (b) modify the Site and/or the Service; and (c)
            discontinue the Site at any time. Company shall post any revision to these Terms of Use to the Site, and the
            revision shall be effective immediately on such posting. You agree to review these Terms of Use and other
            online policies posted on the Site periodically to be aware of any revisions. You agree that, by continuing
            to use or access the Site following notice of any revision, You shall abide by any such revisions.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">29.</span>
          <p>
            <span className="text-decoration-underline">ACKNOWLEDGEMENT.</span> BY USING THE SERVICE OR ACCESSING THE
            SITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE AND AGREE TO BE BOUND BY THEM.
          </p>
        </section>
        <CardText className="text-center fw-bolder mt-2 mb-2">TALENT ADDITIONAL TERMS OF SERVICE</CardText>
        <section className="mb-2">
          <p>
            By using the site https://www.trumio.ai/ operated by Trumio Inc. (“Client”, “Our,” “We”, or “Us”), Our
            website (“Site”) or any services provided in connection therewith (“Services”) Talent (“Talent” or “You”)
            agree to abide by these Additional Terms (“Terms”) applicable to Talent. These Terms may be amended from
            time to time at Our sole discretion. These Terms are also provided in conjunction with and in addition to
            Client’s Privacy Policy, Site Terms, User Terms of Service and all other operating rules, policies,
            procedures, or requirements that may be published on the Site by Client from time to time, which are
            incorporated herein by reference, and do not supersede any provisions in the aforementioned documents.
          </p>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">1.</span>
          <div>
            <span className="fw-bolder">ENGAGEMENT.</span> <br />{' '}
            <p className="mt-2">
              By engaging with a Client under a Service Contract, Talent will be agreeing to provide the services
              requested by Client subject to the details of the engagement. Talent agrees to perform faithfully,
              industriously, and to the best of their ability, experience, and talents, all of the duties that may be
              required.
            </p>
          </div>
        </section>
        <section className="mb-2">
          <div className=" d-flex justify-content-start">
            <span className="me-2">2.</span>
            <div>
              <span className="fw-bolder">INDEPENDENT CONTRACTOR STATUS.</span> <br />{' '}
              <p className="mt-2">
                Talent’s relationship with the Client is that of an independent contractor, and nothing in this
                Agreement is intended to, or should be construed to create an employee relationship, partnership,
                agency, joint venture or employment relationship between Client and Talent or any of Talent Staff. No
                part of Talent’s compensation will be subject to withholding by the Client for the payment of any social
                security, federal, state or any other employee payroll taxes unless otherwise arranged in writing
                between the Client and Talent. The Client will regularly report amounts paid to Talent by filing Form
                1099-MISC with the Internal Revenue Service as required by law. Talent has no legal relationship with
                Company and is not an independent contractor or employee of Company.
              </p>
            </div>
          </div>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">A.</span>
            <p>
              <span className="text-decoration-underline">Indemnification.</span> Company has made its Site available to
              Talent in reliance on information provided by Talent, including Talent’s express representation that
              Talent is an independent contractor and in compliance with all applicable laws related to work as an
              independent contractor. If any regulatory body or court of competent jurisdiction finds that Talent are
              not independent contractors and/or are not in compliance with applicable laws related to work as
              independent contractors, based on Talent’s own actions, Talent shall assume full responsibility and
              liability for all taxes, assessments, and penalties imposed against Talent and/or the Company or Client
              resulting from such contrary interpretation, including but not limited to taxes, assessments, and
              penalties that would have been deducted from Talent’s earnings had Talent been on the Client’s payroll and
              employed as an employee of the Client.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">B.</span>
            <p>
              <span className="text-decoration-underline">Claims and Release.</span> Neither Talent nor any of its
              agents, representatives, members, managers, directors, officers, assigns, contractors, or employees shall
              assert, claim, allege, or otherwise initiate any legal proceeding of any kind or nature, whether civil,
              administrative or otherwise, asserting that they are or have been anything other than an contractor to
              Client. In this respect, Talent and each of them agree and acknowledge that Client shall neither have nor
              exercise any control or direction over the methods by which Talent provide Talent’s services or perform
              Talent’s duties, work, functions, or other activities. Talent specifically agree that Talent shall take
              all reasonable steps and cooperate with Client to disavow Talent’s status as anything other than an
              independent contractor, in each and every instance where they and/or any other third person might allege
              otherwise. In the event any governmental entity, including without limitation state labor agencies and/or
              state or federal taxing authorities, should question or challenge the independent contractor status of
              Talent, Talent shall in all cases affirm and ratify that Talent was at all times an independent
              contractor. In the event Talent’s relationship is legally determined or deemed or alleged to be anything
              other than an independent contractor, Talent waive, release, and discharge Company and Client and each
              parties officers, members, managers, employees, agents, contractors, sublicensees, affiliates,
              subsidiaries, successors, and assigns from all claims pursuant to state or federal law that may have
              accrued from the inception of the parties’ relationship and including all prospective and unknown claims,
              including specifically claims asserting misclassification, overtime, missed meal/rest breaks, minimum
              wage, and any claims for associated penalties, statutory penalties, attorneys’ fees, interest, and
              otherwise, whether pursuant to any individual action or private attorney general action. In making this
              release, Talent acknowledges that Talent have reviewed California Civil Code Section 1542 which provides
              as follows: <br />
              <br />
              “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS
              OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER, MUST HAVE MATERIALLY
              AFFECTED HIS SETTLEMENT WITH THE DEBTOR.” <br />
              <br />
              Being aware of said code section, Talent hereby expressly waives any rights Talent may have against
              Company and Client, as well as under any other statute or common law principles of similar effect insofar
              as those rights pertain to the matters released herein.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">C.</span>
            <p>
              <span className="text-decoration-underline">Representations and Warranties.</span> Talent represents and
              warrant that: <br />
              <br />
              <span className="me-2">1)</span>Talent has the sole right to control and direct the means, details,
              manner, and method by which Talent Services required by this Agreement will be performed. <br /> <br />
              <span className="me-2">2)</span>The Talent Services required by this Agreement shall be performed by
              Talent, and the Client shall not be required to hire, supervise, or pay any assistants to help Talent
              perform such Services. <br /> <br />
              <span className="me-2">3)</span>Talent is responsible for paying all ordinary and necessary expenses of
              all of its employees, staff, members, or other contractors
              <br /> <br />
            </p>
          </section>
        </section>
        <section className="mb-2">
          <div className=" d-flex justify-content-start">
            <span className="me-2">3.</span>
            <div>
              <span className="fw-bolder">LOYALTY AND CONFIDENTIALITY COVENANTS.</span> <br />{' '}
            </div>
          </div>
          <section className="ms-3 d-flex justify-content-center mt-2">
            <span className="me-2">A.</span>
            <p>
              <span className="text-decoration-underline">Duty of Loyalty and Lawful Conduct.</span> Talent agrees to
              perform loyally and conscientiously Talent’s duties under this Agreement. Talent shall not perform
              Talent’s duties, or take any action or omission that in any way violates federal, state, or municipal
              laws, regulations, statutes, or ordinances, or violates the rights of Client, Client’s other employees, or
              third parties.
            </p>
          </section>
          <section className="ms-3 d-flex justify-content-center">
            <span className="me-2">B.</span>
            <p>
              <span className="text-decoration-underline">Non-Competition During Relationship with Client.</span> Talent
              agree that, during Talent’s relationship with Client, Talent will not establish or act, directly or
              indirectly, by way of ownership, management or otherwise, whether or not for compensation, as a
              consultant, employer, employee, agent, principal, partner, stockholder (other than ownership of less than
              5% of the outstanding capital stock of a publicly-traded corporation), officer, director or in any other
              representative or individual capacity for, any business that (i) is similar to, (ii) is directly
              competitive with, or (iii) provides goods or services to any aspect of the business in which the Client is
              engaged or contemplates engaging. During Talent’s relationship with Client, Talent will not undertake any
              planning for any outside business competitive with the Client.
            </p>
          </section>
        </section>
        <section className="mb-2">
          <div className=" d-flex justify-content-start">
            <span className="me-2">4.</span>
            <div>
              <span className="fw-bolder">INVENTIONS & INTELLECTUAL PROPERTY.</span> <br />{' '}
            </div>
          </div>
          <section className="ms-3 d-flex justify-content-center mt-2">
            <span className="me-2">A.</span>
            <p>
              <span className="text-decoration-underline">Ownership / Work for Hire.</span> All Inventions and
              Intellectual Property (as hereinafter defined) which Talent creates pursuant to Talent’s services for
              Client shall belong to and are the ownership of Client. “Inventions and Intellectual Property” means any
              and all inventions, discoveries, conceptual designs, creative endeavors, designs, developmental designs,
              utility designs, all creative works of authorship, including technological designs, source code, work
              product, video, audio, written works, photographs, electronic, music, print, hard-copy, audiovisual works
              of any kind or nature, or any other work of authorship fixed in a tangible or intangible form of
              expression, developments, improvements, formulas, techniques, concepts, data and ideas (whether or not
              patentable or registrable under copyright or similar statute) made, conceived, reduced to practice, or
              learned by Talent, either alone or jointly with others, that (a) result from work performed by Talent for
              the Client, (b) utilize Client’s equipment, supplies, facilities, or Confidential Information, (c) are
              made, conceived or completed during the course of working for, on behalf of, or at the direction of
              Client, or (d) are related to the business or the actual or demonstrably anticipated research or
              development of the (altogether collectively “Works for Hire”); in perpetuity, throughout the world, free
              of any claim whatsoever by Talent or by any persons deriving any rights or interests from Talent. Client
              (and its licensees) shall have the sole and exclusive right to use the Works for Hire throughout the world
              or any part thereof in any manner. Talent irrevocably and unconditionally waiveS any and all “moral
              rights” and similar laws and principles throughout the world that Talent have or may have in the Works for
              Hire and hereby agrees not to make any claim against Client and/or its licensees or distributors based on
              any such rights. To the extent, if any, that Talent is ever deemed an “author” of any Works for Hire,
              Talent grant to Client a power of attorney, irrevocable and coupled with interest, on Client’s behalf and
              in Client’s name, to apply for and obtain, and on obtaining the same, to assign to Client, all such
              copyrights and renewals, and extensions thereof. Talent agrees that all such work is considered a “work
              made for hire,” as that term is defined by 17 U.S.C. Section 101. Whenever requested by the Client, both
              during and after the term of this Agreement, Talent will assist the Client, at the Client’s expense, in
              obtaining, maintaining, defending, registering and from time to time enforcing, in any and all countries,
              the Client’s rights to the Works for Hire. Talent warrant and represent that none of its services or
              content provided to Client shall infringe any copyright, patent, trade secret, or other proprietary right
              held by any third party; and shall indemnify, defend and hold the Client, its successors, officers,
              directors, agents and employees harmless from any and all actions, causes of action, claims, demands,
              cost, liabilities, expenses and damages (including attorneys’ fees) arising out of or in connection with
              any breach under this Agreement by Talent, or any act or omission by Talent resulting in the infringement
              of any third party’s rights. Talent acknowledges the Client’s right, title, and interest in and to all
              service marks, trademarks, and trade names used by the Client and agrees not to engage in any activities
              or commit any acts, directly or indirectly, that may contest, dispute, or otherwise impair the Client’s
              right, title, and interest therein, nor shall Talent cause diminishment of value of said trademarks or
              trade names through any act or representation. Talent shall not apply for, acquire, or claim any right,
              title, or interest in or to any such service marks, trademarks, or trade names, or others that may be
              confusingly similar to any of them, through advertising or otherwise.
            </p>
          </section>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">5.</span>
          <div>
            <span className="fw-bolder"> OTHER ACTIVITIES.</span> <br />{' '}
            <p className="mt-2">
              This Agreement is not an exclusive agreement, and Talent is free to engage in other independent contractor
              activities unrelated to Talent Services provided, provided that Talent’s other activities do not cause a
              breach of a provision in this Agreement.
            </p>
          </div>
        </section>
        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">6.</span>
          <div>
            <span className="fw-bolder">INDEMNITY.</span> <br />{' '}
            <p className="mt-2">
              Talent shall indemnify and hold harmless the Company and Client and each party’s officers, members,
              managers, employees, agents, contractors, sublicensees, affiliates, subsidiaries, successors, and assigns
              from and against any and all damages, liabilities, costs, expenses, claims, and/or judgments, including,
              without limitation, reasonable attorneys’ fees and disbursements (collectively, the “Claims”) that any of
              them may suffer from or incur and that arise or result primarily from (i) any negligence, willful
              misconduct, and/or negligent acts of Talent arising from, arising out of, connected with, or relating to
              its Services, Talent services and/or relationship with Client, or (ii) Talent’s breach of any of its
              obligations, agreements, or duties under this Agreement. Nothing herein shall be construed to require
              Talent to indemnify Company or Client for Company or Client’s own negligence, willful misconduct, or
              intentional acts
            </p>
          </div>
        </section>

        <section className="mb-2 d-flex justify-content-start">
          <span className="me-2">7.</span>
          <div>
            <span className="fw-bolder">TAX FORMS AND WITHHOLDINGS..</span> <br />{' '}
            <p className="mt-2">
              All Talent located outside of the United States agree to cooperate with Company and Client in compliance
              of all tax obligations involving the payments made to Talent, The W-8BEN and W-8BEN-E are U.S. tax forms
              for non-U.S. Persons. Company and the IRS use them to determine whether you live in the U.S. and what
              taxes, if any, we need to collect from your earnings on Upwork. You must have this form on file before you
              can withdraw earnings from Company. <br /> <br />
              Without these forms as proof that you are a non-U.S. Person, Company will be required to withhold up to
              30% of your future earnings on Company and send that withholding tax to the IRS. As long as a new
              W-8BEN/W-8BEN-E form is filled out completely and validly, we are not required to withhold U.S. income
              tax.
            </p>
          </div>
        </section>

        {/* <section className="d-flex justify-content-start mt-5">
            {activeTab === userTypes.talent && (
              <CardText className="font-large-1 fw-bold text-center">Coming Soon</CardText>
            )}
            {activeTab === userTypes.client && (
              <CardText className="font-large-1 fw-bold text-center">Coming Soon</CardText>
            )}
          </section> */}
        {/* <div className="d-flex gap-1 justify-content-end px-1 py-2">
            <Button outline color="primary" onClick={toggleModal}>
              Close
            </Button>
          </div> */}
      </PrivacyPolicyModalWrapper>
    </ModalBody>
  </Modal>
);
export default TermsModal;

TermsModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

TermsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};

import Link from "next/link"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
export function Privacypolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1B2430] text-white">
      <Navbar />
      <main className="flex-1 bg-[#1B2430] py-24 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
              <p className="mt-2 text-gray-400">Last updated: May 13, 2024</p>
            </div>
            <div className="space-y-6 text-gray-300">
              <div>
                <h2 className="text-2xl font-bold">Data Collection</h2>
                <p className="mt-2">
                  Resumake collects certain personal information from users, including your name, email address, and
                  details about your resume. This information is collected directly through user input when you create
                  an account or use our resume builder.
                </p>
                <p className="mt-2">
                  We also use cookies and web analytics tools to collect information about how you use our website, such
                  as the pages you visit and the features you interact with. This helps us improve the user experience
                  and ensure our service is functioning properly.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Data Usage</h2>
                <p className="mt-2">
                  Resumake uses the personal information we collect solely for the purpose of providing our resume
                  building and management service. We do not share or sell your data to any third parties.
                </p>
                <p className="mt-2">
                  Your resume details and other personal information are stored securely in our encrypted database and
                  are only accessible to authorized Resumake employees who need the information to maintain and improve
                  our service.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Data Security</h2>
                <p className="mt-2">
                  Resumake takes the security of your personal information very seriously. We use industry-standard
                  encryption and security protocols to protect your data from unauthorized access, modification, or
                  disclosure.
                </p>
                <p className="mt-2">
                  In the event of a data breach, we will promptly notify affected users and take all necessary steps to
                  investigate the incident and mitigate any potential harm.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Cookies and Analytics</h2>
                <p className="mt-2">
                  Resumake uses cookies and web analytics tools to collect information about how you use our website.
                  This data helps us improve the user experience and ensure our service is functioning properly.
                </p>
                <p className="mt-2">
                  You can manage your cookie preferences by adjusting your browser settings. However, please note that
                  disabling cookies may affect the functionality of our website.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Data Retention</h2>
                <p className="mt-2">
                  Resumake retains user data for as long as necessary to provide our service and comply with legal and
                  regulatory requirements. We will delete or anonymize your personal information upon your request, or
                  when it is no longer needed for the purposes it was collected.
                </p>
              </div>
              {/* <div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="mt-2">
                  If you have any questions or concerns about our privacy practices, please don&apos;t hesitate to contact us
                  at:
                </p>
                <p className="mt-2">
                  Resumake, Inc.
                  <br />
                  123 Main Street
                  <br />
                  Anytown, USA 12345
                  <br />
                  privacy@resumake.com
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

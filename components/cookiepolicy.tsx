import Link from "next/link"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
export function Cookiepolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1B2430] text-white">
      <Navbar />
      <main className="flex-1 bg-[#1B2430] py-24 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Cookie Policy</h1>
              <p className="mt-2 text-gray-400">Last updated: May 13, 2024</p>
            </div>
            <div className="space-y-6 text-gray-300">
              <div>
                <h2 className="text-2xl font-bold">Cookies and Data Security</h2>
                <p className="mt-2">
                  At Resumake, we take the security and privacy of your personal information very seriously. To ensure a
                  seamless and personalized user experience, we utilize cookies and other web analytics tools to collect
                  information about how you interact with our website.
                </p>
                <p className="mt-2">
                  Cookies are small text files that are stored on your device when you visit our website. These cookies
                  help us to remember your preferences, track your usage patterns, and improve the overall functionality
                  of our service.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Types of Cookies Used</h2>
                <p className="mt-2">Resumake uses the following types of cookies:</p>
                <ul className="mt-2 list-disc pl-6 space-y-2">
                  <li>
                    <strong>Strictly Necessary Cookies:</strong>
                    These cookies are essential for the proper functioning of our website, such as enabling you to log
                    in, navigate between pages, and access secure areas.{"\n                              "}
                  </li>
                  <li>
                    <strong>Functional Cookies:</strong>
                    These cookies allow us to remember your preferences and customize your experience, such as your
                    language or location settings.{"\n                              "}
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong>
                    These cookies help us understand how visitors interact with our website, which pages are most
                    popular, and where we can improve the user experience.{"\n                              "}
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Data Usage and Security</h2>
                <p className="mt-2">
                  The information collected through cookies is used solely for the purpose of enhancing your user
                  experience and improving our service. We do not share or sell this data to any third parties.
                </p>
                <p className="mt-2">
                  Resumake takes extensive measures to protect your personal information, including the use of
                  industry-standard encryption and security protocols. Your data is stored securely in our encrypted
                  database, and access is limited to authorized Resumake employees who need the information to maintain
                  and improve our service.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Managing Cookies</h2>
                <p className="mt-2">
                  You can manage your cookie preferences by adjusting your browser settings. However, please note that
                  disabling cookies may affect the functionality of our website and prevent you from accessing certain
                  features.
                </p>
                {/* <p className="mt-2">
                  If you have any questions or concerns about our use of cookies or data privacy, please don&apos;t hesitate
                  to contact us at:
                </p>
                <p className="mt-2">
                  Resumake, Inc.
                  <br />
                  123 Main Street
                  <br />
                  Anytown, USA 12345
                  <br />
                  privacy@resumake.com
                </p> */}
              </div>
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

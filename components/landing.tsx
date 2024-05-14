import { Navbar } from "./navbar"
import { Footer } from "./footer"
import Image from 'next/image'
import { signOut, useSession } from "next-auth/react"
import { StepForward } from 'lucide-react';
import { Pen } from 'lucide-react';
import Link from "next/link";
export function Landing(props: any) {
  const { data: session } = useSession();
  // const user: User = session?.user as User;
  console.log(session?.user.resumeDetails);
  return (
    <div className="flex  flex-col min-h-[100dvh] bg-gray-950 text-gray-50">
      <Navbar signInWithGoogle={props.signInWithGoogle} />
      <main className="flex-1">
        <section className="w-full h-screen py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 sm:items-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-emerald-500 mt-5">
                    Create a Professional Resume in Minutes
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl dark:text-gray-400">
                    Resumake is the easiest way to build a stunning resume using your personal data. Sign in with Google
                    and let us handle the rest.
                  </p>
                  {!session ? <button className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-slate-200 dark:hover:border-slate-500 hover:text-white dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={props.signInWithGoogle}>
                    <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" width="20" height="20" />
                    <span>Sign up with Google</span>
                  </button> : <>
                    <Link href="/profile">
                      <button className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150">
                        <StepForward className="text-emerald-400" />
                        <span>Continue Session</span>
                      </button>
                    </Link>

                    <button className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150 " >
                      <Pen className="text-emerald-400" /><span>Create new Resume</span>
                    </button>
                  </>}

                </div>
              </div>
              <div className=" hidden lg:block relative  w-full h-full">
                <div className="hover:border-white hover:shadow-white">
                  <Image
                    alt="Hero"
                    className="absolute  inset-0 mx-auto aspect-video overflow-hidden rounded-xl lg:aspect-square z-0 scale-x-75  lg:mt-20 lg:mr-20 "
                    height="550"
                    src="/home.jpg"
                    width="550"
                    style={{ zIndex: 1 }}
                  />
                </div>
                {/* <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
                  height="550"
                  src="/home1.jpg"
                  width="550"
                /> */}
                <Image
                  alt="Hero"
                  className="mx-auto  inset-0 aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last z-1 lg:aspect-square scale-x-75 hover:border-white hover:shadow-white"
                  height="550"
                  src="/home2.jpg"
                  width="550"
                  style={{ zIndex: 0 }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/home3.png"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-emerald-500 px-3 py-1 text-sm">Key Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-emerald-500">
                    Effortless Resume Building
                  </h2>
                  <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Resumake takes the hassle out of creating a professional resume. Simply sign in with Google and let
                    our platform generate a stunning resume tailored to your experience.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    Automatically populate your resume with your Google account data
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    Choose from a variety of modern, customizable templates
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    Download your resume in PDF format
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-emerald-500 px-3 py-1 text-sm">Benefits</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-emerald-500">
                    Stand Out from the Crowd
                  </h2>
                  <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Resumake helps you create a professional, visually appealing resume that showcases your skills and
                    experience. Impress potential employers and land your dream job.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    Customizable templates to match your personal style
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    Easily highlight your key achievements and qualifications
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    Optimized for both digital and print formats
                  </li>
                </ul>

              </div>
              <Image
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="1200"
                src="/3293513.jpg"
                width="700"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div >
  )
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function ChromeIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
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

import { Navbar } from "./navbar"
import { Footer } from "./footer"
import Image from 'next/image'
import { useSession } from "next-auth/react"
import { Check, StepForward } from 'lucide-react';
import { Pen } from 'lucide-react';
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from 'js-cookie';

export function Landing(props: any) {

  const { data: session } = useSession();
  const router = useRouter();


  const continueSessionClick = () => {
    router.push('/profile');
  }

  const newResumeClick = async () => {
    try {

      const response = await axios.delete('/api/resume')
      if (response) {

      }

    } catch (error) {

    } finally {
      Cookies.remove('profileData');
      Cookies.remove('educationData');
      Cookies.remove('workData');
      Cookies.remove('skillsData');
      Cookies.remove('projectData');
      Cookies.remove('awardsData');
      router.push('/resumeTemplates')
    }
  }
  return (

    <div className="flex  flex-col min-h-[100dvh] bg-gray-950 text-gray-50">

      <Navbar signInWithGoogle={props.signInWithGoogle} />

      <main className="flex-1">

        <section className="w-full py-12 md:py-24 lg:py-28 lg:pb-128 relative">

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
                  {!session ?
                    <Button
                      className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-slate-200 dark:hover:border-slate-500 hover:text-white dark:hover:text-slate-300 hover:shadow transition duration-150"
                      onClick={props.signInWithGoogle}
                    >
                      <FcGoogle className="h-7 w-7" />
                      <span>Sign up with Google</span>
                    </Button>
                    :
                    <>
                      {Boolean(Cookies.get('profileData') || Cookies.get('educationData') || Cookies.get('workData') || Cookies.get('skillsData') || Cookies.get('projectData') || Cookies.get('awardsData')) &&
                        <Button
                          className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150"
                          onClick={continueSessionClick}
                        >
                          <StepForward className="text-emerald-400" />
                          <span>Continue Session</span>
                        </Button>
                      }
                      <Button
                        className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150 "
                        onClick={newResumeClick}
                      >
                        <Pen className="text-emerald-400" /><span>Create new Resume</span>
                      </Button>
                    </>
                  }
                </div>
              </div>
              <div className="lg:block flex flex-col justify-center space-y-4 px-5 py-5">
                <div className="relative flex justify-center items-center" style={{ paddingTop: '100%' }}>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      alt="Hero"
                      className="aspect-video overflow-hidden rounded-xl object-contain h-5/6 w-2/3"
                      src="/home2.jpg"
                      style={{ zIndex: 0 }}
                      width={325}
                      height={500}
                    />
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      alt="Hero"
                      className="aspect-video overflow-hidden rounded-xl object-contain h-5/6 w-2/3 mt-20 mr-20"
                      src="/home.jpg"
                      style={{ zIndex: 1 }}
                      width={325}
                      height={500}
                    />
                  </div>
                </div>
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
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    Automatically populate your resume with your Google account data
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    Choose from a variety of modern, customizable templates
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
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
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    Customizable templates to match your personal style
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    Easily highlight your key achievements and qualifications
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
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
        <section className="w-full bg-gray-950 py-12 md:py-16 lg:py-20">
          <div className="container flex flex-col items-center gap-6 px-4 md:px-6">
            <div className="space-y-4 text-center">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                Contribute
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-50 sm:text-4xl md:text-5xl">
                Join Us on GitHub
              </h2>
              <p className="text-gray-400 md:text-xl">
                Resumake is an open-source project, and we welcome contributions from the community. If you&apos;d like to get
                involved, check out our GitHub repository.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-900 dark:hover:bg-emerald-800 dark:focus:ring-emerald-700"
                href="https://github.com/Ad-30/resumemaker" target="blank"
              >
                <GithubIcon className="mr-2 h-5 w-5" />
                GitHub Repository
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-600 bg-transparent px-6 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-emerald-900 dark:text-emerald-900 dark:hover:bg-emerald-900 dark:hover:text-gray-50 dark:focus:ring-emerald-700"
                href="https://buymeacoffee.com/ad30" target="blank"
              >
                <CoffeeIcon className="mr-2 h-5 w-5" />
                Buy Us a Coffee
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

    </div >
  )
}

function CoffeeIcon(props: any) {
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
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  )
}


function GithubIcon(props: any) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


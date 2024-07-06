import { Navbar } from "./navbar"
import { Footer } from "./footer"
import Image from 'next/image'
import { useSession } from "next-auth/react"
import { Check, Coffee, CoffeeIcon, StepForward } from 'lucide-react';
import { Pen } from 'lucide-react';
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";
import axios from "axios";
import Cookies from 'js-cookie';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { deleteFile } from "@/actions/upload";
import { ProfileData } from "@/app/interfaces";

export function Landing(props: any) {

  const { data: session } = useSession();
  const router = useRouter();

  const savedProfileData = Cookies.get('profileData');
  const savedEducationData = Cookies.get('educationData');
  const savedWorkData = Cookies.get('workData');
  const savedSkillsData = Cookies.get('skillsData');
  const savedProjectData = Cookies.get('projectData');
  const savedAwardsData = Cookies.get('awardsData');

  const profileData: { profile: ProfileData } = savedProfileData ? JSON.parse(savedProfileData) : { profile: { fullName: "", email: "", phoneNumber: "", location: "", link: "", profilePicture: "", fileName: "" } };

  const continueSessionClick = () => {
    router.push('/profile');
  }

  const newResumeClick = async () => {
    try {

      Cookies.remove('profileData');
      Cookies.remove('educationData');
      Cookies.remove('workData');
      Cookies.remove('skillsData');
      Cookies.remove('projectData');
      Cookies.remove('awardsData');
      Cookies.remove('templateData');

      profileData.profile.profilePicture ? await deleteFile(profileData.profile.profilePicture) : null;

      const response = await axios.delete('/api/resume')
      console.log(response);

    } catch (error) {

    } finally {
      router.push('/resumeTemplates')
    }
  }
  return (

    <div className="flex  flex-col min-h-[100dvh] bg-gray-950 text-gray-50">

      <Navbar signInWithGoogle={props.signInWithGoogle} />

      <main className="flex-1">

        <section className="flex items-center justify-center w-full min-h-screen py-12 md:py-24 lg:py-28 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4 sm:items-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-emerald-500 mt-5">
                    Create a Professional Resume in Minutes
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl dark:text-gray-400">
                    Resumake makes it incredibly simple to create a stunning, professional resume using your personal information effortlessly.
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
                      {(Boolean(session?.user.resumeDetails) || Boolean(savedProfileData) || Boolean(savedEducationData) || Boolean(savedWorkData) || Boolean(savedSkillsData) || Boolean(savedProjectData) || Boolean(savedAwardsData)) &&
                        <Button
                          className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150"
                          onClick={continueSessionClick}
                        >
                          <StepForward className="text-emerald-400" />
                          <span>Continue Session</span>
                        </Button>
                      }

                      {(Boolean(session?.user.resumeDetails) || Boolean(savedProfileData) || Boolean(savedEducationData) || Boolean(savedWorkData) || Boolean(savedSkillsData) || Boolean(savedProjectData) || Boolean(savedAwardsData)) ?
                        (
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button
                                className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150 "
                              >
                                <Pen className="text-emerald-400" /><span>Create new Resume</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className=" bg-gray-800 border-0">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-emerald-400">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className=" text-gray-300">
                                  This will permanently delete your progress
                                  and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={newResumeClick} className="hover:bg-white hover:text-gray-800">Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Button
                            className="px-4 py-2 border flex gap-2 border-slate-600 dark:border-slate-700 rounded-lg text-white dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-500 hover:text-emerald-400 dark:hover:text-slate-300 hover:shadow transition duration-150 "
                            onClick={newResumeClick}
                          >
                            <Pen className="text-emerald-400" /><span>Create new Resume</span>
                          </Button>
                        )}
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
                      src="/Resume1.jpeg"
                      style={{ zIndex: 0 }}
                      width={325}
                      height={500}
                    />
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      alt="Hero"
                      className="aspect-video overflow-hidden rounded-xl object-contain h-5/6 w-2/3 mt-20 mr-20"
                      src="/Resume2.jpeg"
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
                src="/home4.jpg"
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
                <GitHubLogoIcon className="mr-2 h-5 w-5" />
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
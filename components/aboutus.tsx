import Image from 'next/image'
import Link from "next/link"
import { Coffee } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Linkedin, Mail } from 'lucide-react';
import { FiGithub } from "react-icons/fi";
export function Aboutus() {
  return (
    <main className="w-full">
      <section className="w-full h-screen flex items-center bg-gray-950 py-24 md:py-32 lg:py-40">
        <div className="container flex flex-col items-center gap-8 px-4 md:px-6">
          <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-50 sm:text-5xl md:text-6xl">
                About ResuShape
              </h1>
              <blockquote className="text-xl font-medium italic leading-relaxed text-emerald-400 md:text-2xl">
                &quot;We believe that a well-crafted resume is the key to unlocking opportunities. That&apos;s why we created
                ResuShape - to empower individuals to showcase their skills and achievements with ease.&quot;
                <cite className="mt-4 block text-base font-normal not-italic text-gray-400">
                  - Team ResuShape
                </cite>
              </blockquote>
            </div>
            <Image
              alt="Co-founders"
              className="hidden lg:block mx-auto rounded-lg object-cover aspect-square w-full h-full md:block"
              height={50}
              src="/resume.svg"
              width={50}
            />
          </div>
        </div>

      </section>

      <section className="w-full bg-gray-900 py-12 md:py-16 lg:py-20 dark:bg-gray-950">
        <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
              Acknowledgements
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-emerald-500 dark:text-gray-50 sm:text-4xl md:text-5xl">
              Honoring Open-Source Contributions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              ResuShape would not be possible without the invaluable contributions of the open-source community. We
              extend our heartfelt gratitude to the creators of the LaTeX templates that have played a pivotal role in
              shaping the design and functionality of our resume templates.
            </p>
            <div className="space-y-2">
              <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                We&apos;d like to acknowledge the following open-source projects:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-gray-500 dark:text-gray-400 md:text-xl">
                <li>
                  <Link className="hover:underline" href="https://github.com/posquit0/Awesome-CV" target="blank">
                    Awesome CV
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="https://github.com/deedy/Deedy-Resume" target="blank">
                    Deedy Resume
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="https://github.com/sb2nov/resume" target="blank">
                    sb2nov/resume
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg bg-gray-950  p-6 shadow-lg dark:bg-gray-900 ">
              <h3 className="text-xl font-bold text-gray-50 ">Community-Driven</h3>
              <p className="mt-2 text-gray-400">
                ResuShape thrives on community contributions and collaboration. Our platform is a testament to the power of
                collective efforts, where individuals from diverse backgrounds come together to shape the future of resume
                creation.
              </p>
            </div>
            <div className="rounded-lg bg-gray-950 p-6 shadow-lg dark:bg-gray-900">
              <h3 className="text-xl font-bold text-gray-50">Innovation Through Collaboration</h3>
              <p className="mt-2 text-gray-400">
                Collaboration is at the heart of ResuShape&apos;s development. We believe in fostering an environment where innovation
                flourishes through shared knowledge and resources. Our platform reflects the collective intelligence and
                creativity of the open-source community.
              </p>
            </div>
          </div>

        </div>
      </section>
      <section className="w-full bg-gray-950  py-12 md:py-16 lg:py-20 dark:bg-gray-950">
        <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center gap-6">
            <Image
              alt="Aditya Vyas"
              className="rounded-full"
              height={150}
              src="/aditya_vyas_img.png"
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width={150}
            />
            <blockquote className="space-y-2 text-lg font-medium italic leading-relaxed text-emerald-400 md:text-xl">
              &quot;At ResuShape, we&apos;re driven by the vision of empowering individuals through polished resumes that unlock opportunities.&quot;
              <cite className="mt-2 block text-base font-normal not-italic text-gray-500 dark:text-gray-400">
                - Aditya Vyas, Co-founder of ResuShape
              </cite>
              <div className="flex items-center gap-2">
                <Link
                  href="https://github.com/Ad-30"
                  className="text-gray-500 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400"
                  prefetch={false}
                >
                  <FiGithub className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/aditya5vyas/"
                  className="text-gray-500 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400"
                  prefetch={false}
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:adityavyascs@gmail.com"
                  className="text-gray-500 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400"
                  prefetch={false}
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </blockquote>
          </div>
          <div className="flex items-center gap-6">
            <blockquote className="space-y-2 text-lg font-medium italic leading-relaxed text-emerald-400 md:text-xl">
              &quot;As a co-founder, ResuShape&apos;s mission is to democratize career advancement, empowering individuals with standout resumes that foster success.&quot;
              <cite className="mt-2 block text-base font-normal not-italic text-gray-500 dark:text-gray-400">
                - Aditya Singh Rajawat, Co-founder of ResuShape
              </cite>
              <div className="flex items-center gap-2">
                <Link
                  href="https://github.com/AdityaSinghRajawat"
                  className="text-gray-500 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400"
                  prefetch={false}
                >
                  <FiGithub className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/aditya-singh-rajawat-685364234/"
                  className="text-gray-500 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400"
                  prefetch={false}
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:adityasinghrajawat393@gmail.com"
                  className="text-gray-500 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400"
                  prefetch={false}
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </blockquote>
            <Image
              alt="Aditya Singh Rajawat"
              className="rounded-full"
              height={150}
              src="/aditya_singh_img.png"
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width={150}
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-900 py-12 md:py-16 lg:py-20 dark:bg-gray-950">
        <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
              Specialization
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-emerald-500 dark:text-gray-50 sm:text-4xl md:text-5xl">
              Crafting Resumes with Ease
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              ResuShape is a free-to-use platform that helps you create a professional-looking resume in minutes. By
              leveraging user data, we generate a customized resume that showcases your skills and achievements,
              ensuring a seamless and enjoyable experience.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg bg-gray-950 p-6 shadow-lg dark:bg-gray-900">
              <h3 className="text-xl font-bold text-gray-50">Free to Use</h3>
              <p className="mt-2 text-gray-400">
                ResuShape is completely free to use, allowing you to create a resume without any financial burden.
              </p>
            </div>
            <div className="rounded-lg bg-gray-950 p-6 shadow-lg dark:bg-gray-900">
              <h3 className="text-xl font-bold text-gray-50">User-Focused</h3>
              <p className="mt-2 text-gray-400">
                Our platform is designed with the user in mind, providing a seamless and intuitive experience throughout
                the resume creation process.
              </p>
            </div>
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
              ResuShape is an open-source project, and we welcome contributions from the community. If you&apos;d like to get
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
              <Coffee className="mr-2 h-5 w-5" />
              Buy Us a Coffee
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

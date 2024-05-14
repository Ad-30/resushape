import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
export function Footer(props: any) {
    const currentPathname = usePathname();
    return (
        <footer className="bg-black p-6 md:py-12 w-full">
            <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 text-sm">
                <div className="">
                    <h3 className="font-semibold text-emerald-500">Company</h3>
                    <Link className={`hover:text-emerald-500 transition-colors ${currentPathname === '/aboutus' ? 'text-emerald-500' : ''}`} href="/aboutus">
                        About Us
                    </Link>
                    {/* <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Our Team
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Careers
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        News
                    </Link> */}
                </div>
                {/* <div className="grid gap-1">
                    <h3 className="font-semibold text-emerald-500">Product</h3>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Features
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Pricing
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Templates
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Support
                    </Link>
                </div> */}
                {/* <div className="grid gap-1">
                    <h3 className="font-semibold text-emerald-500">Resources</h3>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Blog
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Community
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Documentation
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        FAQs
                    </Link>
                </div> */}
                <div className="grid gap-1">
                    <h3 className="font-semibold text-emerald-500">Legal</h3>
                    <Link className={`hover:text-emerald-500 transition-colors ${currentPathname === '/privacy' ? 'text-emerald-500' : ''}`} href="/privacy">
                        Privacy Policy
                    </Link>
                    <Link className={`hover:text-emerald-500 transition-colors ${currentPathname === '/cookiepolicy' ? 'text-emerald-500' : ''}`} href="/cookiepolicy">
                        Cookie Policy
                    </Link>
                    {/* <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Cookie Policy
                    </Link> */}
                </div>
                <div className="">
                    <h3 className="font-semibold text-emerald-500">Contact</h3>
                    <Link className="hover:text-emerald-500 transition-colors" href="https://github.com/ad-30/resumemaker" target="blank">
                        Support
                    </Link>
                    {/* <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Sales
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Press
                    </Link>
                    <Link className="hover:text-emerald-500 transition-colors" href="#">
                        Partnerships
                    </Link> */}
                </div>
            </div>
        </footer>
    )
}
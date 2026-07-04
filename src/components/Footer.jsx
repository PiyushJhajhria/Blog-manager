import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
function Footer() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-richblack-800 py-10">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="max-w-sm text-sm leading-6 text-richblack-400">
                                    Fresh stories, sharp ideas, and a quiet place to publish what matters.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-cyan-200">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-cyan-200">
                                Support
                            </h3>
                            <ul className="space-y-3">
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-cyan-200">
                                Legals
                            </h3>
                            <ul className="space-y-3">
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-medium text-richblack-400 transition hover:text-richblack-50"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer

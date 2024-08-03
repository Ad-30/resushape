"use client"
import React from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import ScrollIndicator from '@/components/ui/scroll-indicator'
import { Getstarted } from '@/components/getstarted'
function Page() {
    return (
        <div className="flex flex-col min-h-[100dvh] bg-gray-950 text-gray-50">
                <Navbar />
                <Getstarted />
                <ScrollIndicator />
                <Footer />
            </div>

    )
}

export default Page
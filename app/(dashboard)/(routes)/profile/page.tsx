"use client";

import React from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

const Page = () => {

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
    });

    const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
        console.log(values);
    }

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <h2 className="text-xl font-bold text-white">YOUR PERSONAL INFO</h2>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="section-heading">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Smith"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="johnsmith@gmail.com"
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phonenumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="(555) 123-4567"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Jaipur, Raj"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="mycoolportfolio.com/myname"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex space-x-2">
                        <Button
                            className="bg-black text-emerald-400 border border-emerald-400"
                            type='submit'
                        >
                            Next
                        </Button>

                    </div>
                </form>
            </Form>
        </main>
    )
}

export default Page;
'use client'
import React from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const EducationForm = () => {
    const form = useForm<z.infer<typeof EducationSchema>>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
            sectionHeading: '',
            school: '',
            schoolLocation: '',
            degree: '',
            major: '',
            gpa: '',
            startDate: '',
            endDate: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof EducationSchema>) => {
        console.log(values);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
            >
                <h2 className="text-xl font-bold text-white">YOUR EDUCATIONAL BACKGROUND</h2>
                <FormField
                    control={form.control}
                    name="sectionHeading"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="sectionHeading">Section Heading</FormLabel>
                            <FormControl>
                                <Input
                                    id='sectionHeading'
                                    placeholder="Education"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <hr className=" my-2 border-4 border-emerald-400" />
                <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="school">School Name</FormLabel>
                            <FormControl>
                                <Input
                                    id='school'
                                    placeholder="Standford University"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="schoolLocation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="schoolLocation">School Location</FormLabel>
                            <FormControl>
                                <Input
                                    id='schoolLoction'
                                    placeholder="Standford, CA"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="degree">Degree</FormLabel>
                            <FormControl>
                                <Input
                                    id='degree'
                                    placeholder="B-tech"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="major">Major</FormLabel>
                            <FormControl>
                                <Input
                                    id='major'
                                    placeholder="Computer Science"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="gpa">GPA</FormLabel>
                            <FormControl>
                                <Input
                                    id='gpa'
                                    placeholder="9.6"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="startDate">Start Date</FormLabel>
                            <FormControl>
                                <Input
                                    id='startDate'
                                    placeholder="Sep 2015"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="endDate">End Date</FormLabel>
                            <FormControl>
                                <Input
                                    id='endDate'
                                    placeholder="June 2019"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    )
}

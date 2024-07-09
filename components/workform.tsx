'use client'
import React, { useEffect, useState } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkSchema } from '@/schemas';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WorkFormProps } from '@/app/interfaces';

const WorkForm: React.FC<WorkFormProps> = (props) => {
    const [workCount, setWorkCount] = useState(props.initialValues?.description?.length || 1);

    const form = useForm<z.infer<typeof WorkSchema>>({
        resolver: zodResolver(WorkSchema),
        defaultValues: props.initialValues || {
            companyName: "",
            jobTitle: "",
            jobLocation: "",
            position: "",
            startDate: "",
            endDate: "",
            description: [""],
        }
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const subscription = form.watch((values) => {
                props.updateWorkItem(props.workCount - 1, values);
            });
            return () => subscription.unsubscribe();
        }

    }, [form, props]);

    const handleAddTool = () => {
        const currentDescriptions = form.getValues('description') || [];
        setWorkCount((prevCount: number) => prevCount + 1);
        form.setValue('description', [...currentDescriptions, '']);
    };

    const handleRemoveTool = () => {
        if (workCount > 1) {
            const currentDescriptions = form.getValues('description') || [];
            if (currentDescriptions.length > workCount - 1) {
                const updatedDescriptions = currentDescriptions.slice(0, -1);
                form.setValue('description', updatedDescriptions);
            }
            setWorkCount(prevCount => prevCount - 1);
        }
    };
    const onSubmit = async (values: z.infer<typeof WorkSchema>) => {
        // console.log(values);
    }

    return (

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-12'
            >
                <hr className=" my-2 border-4 border-emerald-400" />
                <div className="flex justify-center">
                    <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400">{props.workCount}</Button>
                </div>
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="companyName">Company Name</FormLabel>
                            <FormControl>
                                <Input
                                    id='companyName'
                                    placeholder="Apple inc."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                            <FormControl>
                                <Input
                                    id='jobTitle'
                                    placeholder="Web Developer"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jobLocation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="jobLocation">Job Location</FormLabel>
                            <FormControl>
                                <Input
                                    id='jobLocation'
                                    placeholder="California"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="position">Position</FormLabel>
                            <FormControl>
                                <Input
                                    id='position'
                                    placeholder="Team Lead"
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
                                    placeholder="Jul 2024"
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
                                    id='End Date'
                                    placeholder="Aug 2024"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-4">
                    <FormLabel htmlFor="schoolDetail">Description</FormLabel>
                </div>
                {[...Array(workCount)].map((_, index) => (

                    <FormField
                        key={index}
                        control={form.control}
                        name={`description.${index}`}
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input
                                        id='description'
                                        placeholder="Developed User Interface For Remote Testing."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                ))}
                <div className="flex items-center space-x-2">
                    <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400" onClick={handleAddTool}>+</Button>
                    <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400" onClick={handleRemoveTool}>-</Button>
                </div>


                {/* <Button type='submit'>Click</Button> */}
            </form>
        </Form>
    )
}

export default WorkForm;

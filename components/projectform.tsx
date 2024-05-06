'use client'
import React, { useEffect, useState } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from '@/schemas';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProjectFormProps } from '@/app/interfaces';

const ProjectForm: React.FC<ProjectFormProps> = (props) => {
    const [projectCount, setProjectCount] = useState(props.initialValues?.toolsUsed?.length || 1);

    const handleAddTool = () => {
        setProjectCount(prevCount => prevCount + 1);
    };

    const handleRemoveTool = () => {
        if (projectCount > 1) {
            setProjectCount(prevCount => prevCount - 1);
        }
    };

    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: props.initialValues || {
            projectName: '',
            projectDescription: '',
            projectLink: '',
            toolsUsed: [''],
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const subscription = form.watch((values) => {
                props.updateProjectItem(props.projectCount - 1, values);
            });
            return () => subscription.unsubscribe();
        }
    }, [form, props]);

    const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
        console.log(values);
    }

    return (

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-12'
            >
                <hr className=" my-2 border-4 border-emerald-400" />
                <div className="flex justify-center">
                    <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400">{props.projectCount}</Button>
                </div>
                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="projectName">Project Name</FormLabel>
                            <FormControl>
                                <Input
                                    id='projectName'
                                    placeholder="Piper Chat"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="projectDescription">Project Description</FormLabel>
                            <FormControl>
                                <Input
                                    id='Project Description'
                                    placeholder="A video chat app with great picture quality."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="projectLink">Project Link</FormLabel>
                            <FormControl>
                                <Input
                                    id='projectLink'
                                    placeholder="https://piperchat.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-4">
                    <FormLabel htmlFor="toolsUsed">Tools Used</FormLabel>
                </div>

                {[...Array(projectCount)].map((_, index) => (

                    <FormField
                        key={index}
                        control={form.control}
                        name={`toolsUsed.${index}`}
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input
                                        id='toolsUsed'
                                        placeholder="Java"
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

export default ProjectForm;

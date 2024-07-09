'use client'
import React, { useEffect, useState } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillsSchema } from '@/schemas';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkillsFormProps } from '@/app/interfaces';

const SkillsForm: React.FC<SkillsFormProps> = (props) => {
    
    const [skillsCount, setSkillsCount] = useState(props.initialValues?.skillDetail?.length || 1);

    const form = useForm<z.infer<typeof SkillsSchema>>({
        resolver: zodResolver(SkillsSchema),
        defaultValues: props.initialValues || {
            skillName: '',
            skillDetail: [''],
        }
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const subscription = form.watch((values) => {
                props.updateSkillsItem(props.skillsCount - 1, values);
            });
            return () => subscription.unsubscribe();
        }

    }, [form, props]);

    const handleAddTool = () => {
        const currentSkillDetails = form.getValues('skillDetail') || [];
        setSkillsCount(prevCount => prevCount + 1);
        form.setValue('skillDetail', [...currentSkillDetails, '']);
    };

    const handleRemoveTool = () => {
        if (skillsCount > 1) {
            const currentSkillDetails = form.getValues('skillDetail') || [];
            if (skillsCount == currentSkillDetails.length) {
                if (currentSkillDetails.length > 0) {
                    currentSkillDetails.pop();
                    form.setValue('skillDetail', currentSkillDetails);
                }
            }
            setSkillsCount(prevCount => prevCount - 1);
        }
    };

    const onSubmit = async (values: z.infer<typeof SkillsSchema>) => {
        // console.log(values);
    }
    const methods = useForm();

    return (

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-12'
            >
                <hr className=" my-2 border-4 border-emerald-400" />
                <div className="flex justify-center">
                    <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400">{props.skillsCount}</Button>
                </div>
                <FormField
                    control={form.control}
                    name="skillName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="skillName">Skill Name</FormLabel>
                            <FormControl>
                                <Input
                                    id='skillName'
                                    placeholder="Web Development"
                                    {...field}
                                    className='mb-4'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-4">
                    <FormLabel htmlFor="schoolDetail">Skill Details</FormLabel>
                </div>
                {[...Array(skillsCount)].map((_, index) => (

                    <FormField
                        key={index}
                        control={form.control}
                        name={`skillDetail.${index}`}
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input
                                        id='schoolDetail'
                                        placeholder="React.js"
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

export default SkillsForm;

'use client'
import React, { useEffect } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AwardsSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AwardsFormProps } from '@/app/interfaces';

const AwardsForm: React.FC<AwardsFormProps> = (props) => {


    const form = useForm<z.infer<typeof AwardsSchema>>({
        resolver: zodResolver(AwardsSchema),
        defaultValues: props.initialValues || {
            awardName: '',
            awardDate: '',
            awarder: '',
            description: '',
        }
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const subscription = form.watch((values) => {
                props.updateAwardsItem(props.awardsCount - 1, values);
            });
            return () => subscription.unsubscribe();
        }

    }, [form, props]);

    const onSubmit = async (values: z.infer<typeof AwardsSchema>) => {
        console.log(values);
    }
    const methods = useForm();

    return (

        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-12'
            >
                <hr className=" my-2 border-4 border-emerald-400" />
                <div className="flex justify-center">
                    <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400">{props.awardsCount}</Button>
                </div>
                <FormField
                    control={form.control}
                    name="awardName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="awardDate">Award Name</FormLabel>
                            <FormControl>
                                <Input
                                    id='awardName'
                                    placeholder="Marathon Winner"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="awardDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="awardDate">Award Date</FormLabel>
                            <FormControl>
                                <Input
                                    id='awardDate'
                                    placeholder="sep 2024"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="awarder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="awarder">Awarder</FormLabel>
                            <FormControl>
                                <Input
                                    id='awarder'
                                    placeholder="City Council"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <FormControl>
                                <Input
                                    id='description'
                                    placeholder="42.3 Miles Maraton"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                {/* <Button type='submit'>Click</Button> */}
            </form>
        </Form>
    )
}

export default AwardsForm;

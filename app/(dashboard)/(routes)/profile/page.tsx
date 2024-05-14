"use client";
import React, { useState, useEffect } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { ProfileData } from '@/app/interfaces'
import Cookies from 'js-cookie';
import { deleteFile, getSignedURL } from '@/actions/upload';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Label } from '@/components/ui/label';

const Page = () => {

    const { data: session } = useSession();

    const cookiesProfileData = Cookies.get('profileData');
    const parsedProfileData = cookiesProfileData ? JSON.parse(cookiesProfileData) : null;

    const savedProfileData = session?.user.resumeDetails.basics;
    const defaultProfileData = { fullName: "", email: "", phoneNumber: "", location: "", link: "", profilePicture: "", fileName: "" };

    const initialProfileData: { profile: ProfileData } = parsedProfileData?.profile && Object.values(parsedProfileData.profile).some(value => value !== "")
        ? parsedProfileData
        : savedProfileData
            ? { profile: savedProfileData }
            : { profile: defaultProfileData };

    const [profileData, setProfileData] = useState<{ profile: ProfileData }>(initialProfileData);

    // const savedProfileData = session?.user.resumeDetails.basics;
    // const initialProfileData: { profile: ProfileData } = savedProfileData ? { profile: savedProfileData } : { profile: { fullName: "", email: "", phoneNumber: "", location: "", link: "", profilePicture: "", fileName: "" } };

    // const [profileData, setProfileData] = useState<{ profile: ProfileData }>(initialProfileData);
    const [file, setFile] = useState<File | undefined>();
    const [fileUrl, setFileUrl] = useState<string | undefined>();
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLabelFocused, setIsLabelFocused] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string | undefined>(profileData.profile.fileName);

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            fullName: profileData.profile?.fullName || "",
            email: profileData.profile?.email || "",
            phoneNumber: profileData.profile?.phoneNumber || "",
            location: profileData.profile?.location || "",
            link: profileData.profile?.link || "",
            profilePicture: profileData.profile.profilePicture || "",
            file: file || undefined
        }
    });

    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

    const fileRef = form.register("file");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const subscription = form.watch((values) => {
                const updatedProfileData = { profile: { ...profileData.profile, ...values } };
                setProfileData(updatedProfileData);
                Cookies.set('profileData', JSON.stringify(updatedProfileData))
            });
            return () => subscription.unsubscribe();
        }
    }, [form, profileData]);

    Cookies.set('profileData', JSON.stringify(profileData));

    const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
        console.log(values);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        setFile(file);
        setFileName(file?.name)

        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }

        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
        } else {
            setFileUrl(undefined);
        }
    }

    console.log(profileData);

    const handleFileSubmit = async () => {

        try {
            if (file) {
                setIsLoading(true)
                const checkSum = await computeSHA256(file)
                const signedURLResult = await getSignedURL(file?.type, file?.size, checkSum, file?.name)

                if (signedURLResult.failure !== undefined) {
                    console.log("error");
                    throw (new Error(signedURLResult.failure))
                }

                const { url, fileURL } = signedURLResult.success
                profileData.profile.profilePicture = fileURL;
                profileData.profile.fileName = file.name;

                const response = await fetch(url ? url : "", {
                    method: "PUT",
                    body: file,
                    headers: {
                        'Content-Type': file.type
                    }
                })

                console.log(file);
                if (response.ok) {
                    console.log(response);
                    setFileUploaded(true);
                }
            }
            setFileName(profileData.profile.fileName)
        } catch (error) {
            console.error(error);

        } finally {
            setIsLoading(false)
        }

    }

    const handleChangeClick = async () => {
        try {
            setIsLoading(true)
            await deleteFile(profileData.profile.profilePicture);
            setFileUploaded(false);
            profileData.profile.profilePicture = "";
            profileData.profile.fileName = "";
            setFileName("")

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                                <FormControl>
                                    <div className='flex items-center gap-4'>
                                        <Input
                                            id='profilePicture'
                                            type='file'
                                            accept="image/jpeg,image/png,image/webp"
                                            {...fileRef}
                                            onChange={(e) => {
                                                field.onChange(e.target?.files?.[0] ?? undefined);
                                                handleFileChange(e)
                                            }}
                                            onBlur={() => setIsLabelFocused(false)}
                                            disabled={fileUploaded || Boolean(!file && fileName)}
                                            className='hidden'
                                        />

                                        <Label
                                            htmlFor='profilePicture'
                                            className={`cursor-pointer border-2 border-gray-700 rounded p-2 ${isLabelFocused ? 'ring-2 ring-emerald-400 text-emerald-400' : ''}`}
                                            onMouseDown={() => setIsLabelFocused(true)}
                                            onMouseUp={() => setIsLabelFocused(false)}
                                        >
                                            {fileName || 'Choose a file'}
                                        </Label>

                                        {isLoading ? (<Loader2 className='animate-spin' />) : (fileUploaded || (!file && fileName) ? (
                                            <div>
                                                <Button size='sm' onClick={handleChangeClick}>Change</Button>
                                            </div>
                                        ) : (
                                            <>
                                                {file && <Button size='sm' onClick={handleFileSubmit}>Upload</Button>}
                                            </>
                                        ))}
                                    </div>
                                </FormControl>
                                {fileUploaded && <p>File uploaded</p>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name="phoneNumber"
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


                    </div>
                </form>
            </Form>
        </main>
    )
}

export default Page;
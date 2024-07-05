'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';

const Page = () => {

    const { data: session } = useSession();

    const cookiesTemplateData = Cookies.get('templateData');
    const parsedTemplateData = cookiesTemplateData ? JSON.parse(cookiesTemplateData) : null;

    const savedTemplateData = { selectedTemplate: session?.user?.resumeDetails?.selectedTemplate }
    const defaultTemplateData = { selectedTemplate: 1 }

    const initialTemplate: Number = parsedTemplateData?.selectedTemplate ? parsedTemplateData.selectedTemplate : savedTemplateData.selectedTemplate ? savedTemplateData.selectedTemplate : defaultTemplateData.selectedTemplate;

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Number | undefined>(initialTemplate);

    const templates = [
        { id: 1, src: '/home.jpg', buttonText: 'Template 1' },
        { id: 2, src: '/home1.jpg', buttonText: 'Template 2' },
        { id: 3, src: '/home2.jpg', buttonText: 'Template 3' },
        { id: 4, src: '/home2.jpg', buttonText: 'Template 4' },
    ];

    const handleImageClick = (imageSrc: any) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const selectTemplateClick = (template: Number) => {
        setSelectedTemplate(template);
    }

    console.log(selectedTemplate);
    const templateData = { selectedTemplate: selectedTemplate }
    Cookies.set('templateData', JSON.stringify(templateData))

    console.log(cookiesTemplateData);

    return (
        <>
            <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
                <h2 className="text-xl font-bold text-white">CHOOSE A TEMPLATE</h2>
                <div className=' mx-auto my-auto grid gap-1 lg:grid-cols-2 sm:grid-cols-1'>
                    {templates.map((template) => (
                        <div key={template.id} className='py-2 px-2'>
                            <Image
                                alt="Template Image"
                                className="rounded-xl cursor-pointer transition ease-in-out duration-300 lg:hover:scale-105"
                                src={template.src}
                                width={325}
                                height={500}
                                onClick={() => handleImageClick(template.src)} // Call handleImageClick on image click
                            />
                            <div className='flex items-center justify-center mx-auto py-3'>
                                <Button
                                    className={`border border-gray-600 hover:border-emerald-400 hover:text-emerald-400 bg:transparent text-white ${(selectedTemplate == template.id) ? 'border-emerald-400 text-emerald-400 bg:transparent' : ''}`}
                                    onClick={() => selectTemplateClick(template.id)}
                                >
                                    {template.buttonText}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {selectedImage && (
                <div className='hidden lg:block md:block z-10'>
                    <div className="fixed h-full inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="max-w-screen-md">
                            <div className="relative">
                                <button
                                    className="absolute top-0 right-0 m-4 text-white text-xl"
                                    onClick={closeModal}
                                >
                                    X
                                </button>
                                <Image
                                    alt="Template Image"
                                    className="rounded-xl h-3/6 w-3/4 mx-auto"
                                    src={selectedImage}
                                    width={800}
                                    height={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
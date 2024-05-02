'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EducationForm } from '@/components/educationform';
import { EducationSchema } from '@/schemas';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const Page = () => {

  const removeSchool = () => {
    if (educationForms.length > 1) {
      setEducationForms(educationForms.slice(0, -1));
    }
  };

  const addSchool = () => {
    const newId = educationForms.length;
    setEducationForms([...educationForms, { id: newId, component: <EducationForm /> }]);
  };

  const [educationForms, setEducationForms] = useState([{ id: 0, component: <EducationForm /> }]);




  return (
    <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
      {educationForms.map((form) => (
        <React.Fragment key={form.id}>{form.component}</React.Fragment>
      ))}
      {/* <div className="flex space-x-2 mt-8">
        <Button className="bg-black text-emerald-400 border border-emerald-400" onClick={addSchool}>
          Add School
        </Button>
        <Button className="bg-black text-gray-700 border border-gray-700" onClick={removeSchool}>
          Remove School
        </Button>
      </div> */}
    </main>
  );
};

export default Page;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = 200;
            const newOpacity = Math.max(1 - scrollTop / maxScroll, 0);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className="absolute bottom-10 w-full hidden md:flex md:bottom-5 lg:bottom-24 justify-center items-center"
            style={{ opacity, transition: 'opacity 0.5s' }}
        >
            <div className='w-6 h-10 xs:w-4 xs:h-8 rounded-3xl border-4 border-secondary flex justify-center items-start p-1'>
                <motion.div
                    animate={{ y: [0, 24, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                    className='w-2 h-2 xs:w-1.5 xs:h-1.5 rounded-full bg-secondary mb-1'
                />
            </div>
        </div>
    );
};

export default ScrollIndicator;

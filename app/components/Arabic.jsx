'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { FaLock, FaPlay } from 'react-icons/fa';
import RedButton from './RedButton';
import GreenButton from './GreenButton';
import YellowButton from './YellowButton';
import { usePremiumUser } from '../context/PremiumUserContext';


const Arabic = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('لغة عربية');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);
    const premuserorNot = usePremiumUser();
    const { user } = useUser();




    // Handle click dynamically
    const handleClick = (namebook, index) => {
        setActiveBook(true);
        setTitle(namebook);
        setNumBook(index);

        // Scroll to top when the button is clicked
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    // Fetch data on component mount
    useEffect(() => {
        chemData();
    }, []);

    const chemData = () => {
        GlobalApi.arabicData("ar")
            .then((res) => {
                setDataBook(res.dataOfQuizs);
                setNumberQuiz(res?.dataOfQuizs?.length);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };


    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'naho1';
        if (numbook === 2) filterKey = 'naho2';
        if (numbook === 3) filterKey = 'bala3a1';
        if (numbook === 4) filterKey = 'bala3a2';
        if (numbook === 5) filterKey = 'adb';
        if (numbook === 6) filterKey = 'shamel';


        return dataBook
            ?.filter((item) => item.level === filterKey)
            ?.map((item, index) => {
                const quizLink = !user
                    ? "/sign-up" // If no user is logged in, redirect to the sign-up page
                    : (
                        filterKey === 'naho1'
                            ? `/arabic/${item.id}`
                            : (premuserorNot ? `/arabic/${item.id}` : `/payment`)
                    );
                return (
                    <Link key={item.id} href={quizLink}>
                        <h4 className='hover:scale-105   justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto  flex'>
                            {item?.namequiz || 'No Title Available'}

                            {filterKey === 'naho1' ?


                                <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />

                                :

                                (
                                    premuserorNot ? (
                                        <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                                    ) : (
                                        <FaLock className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                                    )
                                )
                            }
                        </h4>

                    </Link>
                );
            });
    };

    return (
        <div className='mx-4 sm:mx-8 lg:mx-20 grid grid-cols-1 lg:grid-cols-4 gap-6'>

            {/* Book Info Section */}
            <div
                className={`h-fit col-span-1 lg:col-span-2 mt-8 lg:m-10 p-5 md:p-7 bg-paton bg-cover rounded-xl shadow-2xl shadow-yellow-400/40 bg-yellow-400 ${activeBook && 'lg:col-span-2'}`}
            >
                <Image
                    width={200}
                    height={200}
                    className='items-center flex justify-center m-auto'
                    alt='ar'
                    src='/ar.png'
                />
                <h3 className='font-arabicUI3 rtl text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:leading-snug'>
                    {title}


                </h3>

                <div className='bg-yellow-800 bg-daark bg-cover cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'لغة عربية' ? 'يلا اختار كتاب تحله' : 'امتحانات الكتاب'}
                    </h4>

                    {title === 'لغة عربية' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل
                        </h4>
                    </div>}
                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
            </div>

            {/* Books Grid Section */}

            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">
                <RedButton handleClick={() => handleClick("اول تلات وحدات نحو", 1)} title="نحو 1" number={1} ></RedButton>
                <RedButton handleClick={() => handleClick("باقي وحدات النحو ", 2)} title="نحو 2" number={2} ></RedButton>
                <YellowButton handleClick={() => handleClick("النص الاول من البلاغة", 3)} title="بلاغة 1" number={3} ></YellowButton>
                <YellowButton handleClick={() => handleClick("النص التاني من البلاغة", 3)} title="بلاغة 2" number={4} ></YellowButton>
                <GreenButton handleClick={() => handleClick("الادب", 5)} title="الادب" number={5} ></GreenButton>
                <GreenButton handleClick={() => handleClick("شوامل ", 6)} title="شوامل" number={6}  ></GreenButton>
            </div>

        </div>
    );
};

export default Arabic;

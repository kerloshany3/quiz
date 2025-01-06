'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import GlobalApi from '../api/GlobalApi';
import { PiHeartFill } from "react-icons/pi";
import Link from 'next/link';

const ActiveSqu = () => {
    const { user } = useUser();
    const [premuserorNot, setPremUser] = useState(false);
    const [isClient, setIsClient] = useState(false); // Ensure client-side rendering

    useEffect(() => {
        // Mark that we're running on the client side
        setIsClient(true);

        if (user?.primaryEmailAddress?.emailAddress) {
            // Fetch premium status if the user is logged in
            premiumusers(user.primaryEmailAddress.emailAddress);
        } else {
            // Reset premium status if the user is not logged in
            setPremUser(false);
        }
    }, [user]);

    const premiumusers = async (email) => {
        try {
            const res = await GlobalApi.premUsers(email);

            if (res && res.userEnrolls && res.userEnrolls.length > 0 && res.userEnrolls[0]) {
                const isPremium = res.userEnrolls[0].isHePaid;
                setPremUser(isPremium);

                // Store the premium status in localStorage
                localStorage.setItem("premuserorNot", JSON.stringify(isPremium));
            } else {
                console.warn("No enrollment data found for the user.");
                setPremUser(false); // Default to not premium if no data
            }
        } catch (error) {
            console.error("Error fetching premium user status:", error);
        }
    };

    const handleScrollToSub = () => {
        const targetElement = document.getElementById('subs');
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error("Element with id 'subs' not found.");
        }
    };

    // Render only on the client side
    if (!isClient) {
        return null; // Prevent server-side mismatch
    }

    return (
        <div>
            <div className="relative col-span-1 hover:brightness-90 transition bg-green-500 shadow-2xl bg-non2 bg-cover outline-dashed outline-offset-2 outline-green-500 w-fit p-4 md:p-9 rounded-xl flex items-center">
                {/* Noise Effect */}
                <div className="absolute pointer-events-none h-full w-full opacity-5 bg-noise z-50"></div>

                {!premuserorNot || !user ? (
                    !user ? (
                        <Link href='/sign-up'>
                            <h3
                                className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer"
                            >
                                <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                                تفعيل الحساب
                            </h3>
                        </Link>
                    ) : (
                        <Link href='/payment'>
                            <h3
                                className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer"
                            >
                                <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                                تفعيل الحساب
                            </h3>
                        </Link>
                    )
                ) : (
                    <h3
                        onClick={handleScrollToSub}
                        className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer"
                    >
                        <PiHeartFill className="text-6xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                        الحساب اتفعل
                    </h3>
                )}
            </div>
        </div>
    );
};

export default ActiveSqu;

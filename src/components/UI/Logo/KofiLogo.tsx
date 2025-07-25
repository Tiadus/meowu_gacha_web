import React from "react";
import Link from "next/link";
import Image from "next/image";

const KofiLogo: React.FC = () => {
    return (
        <>
            <Link href={`https://ko-fi.com/acustomer5875`}>
                <span className="group rounded-2xl flex flex-row justify-center items-center gap-2 bg-[#BD1A1A] p-2">
                    <Image src='/meowu_gacha_kofi_icon.png' width={32} height={32} alt="meowu_gacha_logo.png" className="group-hover:animate-wiggle"/>
                    <span className="hidden md:block text-2xl">
                    <span className="text-white">Ko-Fi</span>
                    </span>
                </span>
            </Link>
        </>
    )
}

export default KofiLogo;
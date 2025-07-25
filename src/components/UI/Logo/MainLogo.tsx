import React from "react";
import Link from "next/link";
import Image from "next/image";

const MainLogo: React.FC = () => {
    return (
        <>
            <Link href={`/`}>
                <span className="ml-auto group flex flex-row gap-2">
                    <Image src='/meowu_gacha_logo.png' width={48} height={48} alt="meowu_gacha_logo.png" className="group-hover:animate-pulse"/>
                    <span className="flex flex-row gap-2 text-4xl">
                        <span className="text-[#FF00C0]">Meowu</span>
                        <span className="text-[#00D8FD]">Gacha</span>
                    </span>
                </span>
            </Link>
        </>
    )
}

export default MainLogo;
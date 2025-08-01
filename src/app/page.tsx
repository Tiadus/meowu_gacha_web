import Image from "next/image";
import Link from "next/link"

export const metadata = {
  title: 'Meowu Gacha – Ultimate Gacha Simulators',
  metadataBase: new URL('http://localhost:3000'),
  description: 'Try your luck in cute animal gacha simulators inspired by Honkai: Star Rail, Wuthering Waves, and more!',
  openGraph: {
    title: 'Meowu Gacha',
    description: 'Get cute animal pics in gacha simulations inspired by top games.',
    images: ['/main.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meowu Gacha',
    description: 'Cute animals. Inspired by real games. Pull now!',
    images: ['/main.jpg'],
  },
}

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center">
        <span className="group w-[400] h-[400] md:w-[700] md:h-[400]">
          <Link href='/games' className="w-full h-full flex justify-center items-center">
            <div className="relative w-full md:w-[60%] h-full flex justify-center items-center">
                <div className="animate-fade-in-out absolute w-full h-full overflow-hidden rounded-full bg-[#E0E0E0]"></div>
                <div className="color-rotate absolute w-[96%] h-[96%] overflow-hidden rounded-full"></div>
                <div className="absolute w-[88%] h-[90%] flex flex-col justify-center items-center rounded-full overflow-hidden bg-white">
                  <div className="relative w-[60%] h-[70%] flex justify-center items-center overflow-hidden bg-white">
                    <Image src={'/meowu_gacha_logo_big.png'} alt="gf" fill={true} sizes="100vw" className="group-hover:animate-wiggle"/>
                  </div>
                  <div className="text-4xl">Start Game</div>
                </div>
            </div>
          </Link>
        </span>
    </main>
  );
}

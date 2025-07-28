import { GameSummary } from "@/types/game"
import Link from "next/link"
import Image from "next/image"

type GameCardProp = {
    game: GameSummary
}

const GameCard: React.FC<GameCardProp> = ({game}) => {
    return (
        <div className="group w-full h-full">
            <Link href={`/games/${game.g_id}`} className="w-full h-full flex flex-col">
            <div className="w-full h-[80%] relative rounded-2xl overflow-hidden group-hover:shadow-2xl">
                <Image src={`/games/${game.image_url}`} alt={game.image_url} fill={true} sizes="50vw" className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"/>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis text-xl font-bold">
                        {game.g_name}
                </span>   
            </div>
            </Link>
        </div>
    )
}

export default GameCard
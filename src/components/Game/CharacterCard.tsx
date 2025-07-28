import React from "react";
import { GameCharacter } from "@/types/game";
import Image from 'next/image';

type CharacterCardProp = {
    character: GameCharacter;
    highest_rarity: number;
}

const character_rarity_border_colour = [
    'border-legendary',
    'border-rare',
    'border-common'
]

const CharacterCard: React.FC<CharacterCardProp> = ({character, highest_rarity}) => {
    function determine_character_card_border(rarity: number) {
        const border_color = rarity === highest_rarity? character_rarity_border_colour[0] : rarity === highest_rarity-1? character_rarity_border_colour[1] : character_rarity_border_colour[2];
        return border_color;
    }

    return(
        <div className={`group w-full h-full border-4 border-solid rounded-xl ${determine_character_card_border(character.rarity)} flex flex-col overflow-hidden hover:shadow-2xl`}>
            <div className={'relative w-full h-[80%] flex justify-center items-center overflow-hidden'}>
                <Image 
                    src={`/characters/${character.image_url}`} 
                    alt={character.image_url} 
                    fill={true} 
                    sizes="20vw" 
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"/>
            </div>
            <div className='w-full flex-1 flex justify-center items-center'>
                <div className='w-[90%] text-center text-sm md:text-lg whitespace-nowrap text-ellipsis overflow-hidden'>
                    {character.rarity}✨: {character.gc_name}
                </div>
            </div>
        </div>
    )
}

export default CharacterCard;
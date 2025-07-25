import React from "react";
import CharacterCard from "./CharacterCard";
import { GameCharacter } from "@/types/game";

type PullResultProp = {
    characters: GameCharacter[];
    row_qty: number;
    col_qty: number;
    highest_rarity: number;
}

const colClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
};

const rowClasses: Record<number, string> = {
    1: "grid-rows-1",
    2: "grid-rows-2",
    3: "grid-rows-3",
    4: "grid-rows-4",
    5: "grid-rows-5",
    6: "grid-rows-6",
};

const PullResult: React.FC<PullResultProp> = ({characters, row_qty=4, col_qty=3, highest_rarity}) => {
    if (row_qty > 6 || col_qty > 6) {
        <div className='w-full h-full flex justify-center items-center text-red-600'>
            Error: Row and Col can not exceed 6
        </div>
    }

    if (characters.length > row_qty * col_qty) {
        return (
            <div className='w-full h-full flex justify-center items-center text-red-600'>
                Error: Character Quantity Exceeds Display Table Maximum Capacity
            </div>
        );
    }

    return(
    <div className={`w-full h-full grid ${colClasses[col_qty]} ${rowClasses[row_qty]} gap-4 p-2`}>
        {characters.map((character, index) => {
            return (
                <div key={`${character.gc_id}-${index}`} className="">
                    <CharacterCard character={character} highest_rarity={highest_rarity}/> 
                </div>
            )
        })}
    </div>
    )
}

export default PullResult;
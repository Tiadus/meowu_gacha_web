'use client';

import React, { useState, useEffect } from "react";
import CurrentBanner from "./CurrentBanner";
import { GameCharacter, Banner, Game } from "@/types/game";
import Image from "next/image";

type GameEngineProp = {
    game: Game
}

const GameEngine: React.FC<GameEngineProp> = ({game}) => {
    const [chosen_banner, set_chosen_banner] = useState<Banner | null>(null);

    const [pull_counter, set_pull_counter] = useState<number>(0);
    const [money_spent, set_money_spent] = useState<number>(0);
    const [pity_counters, set_pity_counter] = useState<number[]>([]);
    const [character_counters, set_character_counter] = useState<number[]>([]);
    
    const [guaranteed_records, set_guaranteed_records] = useState<boolean[]>([]);
    const [rate_up_counters, set_rate_up_counters] = useState<number[]>([]);
    const [off_rate_counters, set_off_rate_counters] = useState<number[]>([]);

    const [pull_result, set_pull_result] = useState<GameCharacter[]>([]);

    useEffect(() => {
        set_pull_counter(0);
        set_money_spent(0);
        set_pull_result([]);
        if (chosen_banner) {
            set_pity_counter(Array(chosen_banner.soft_pity.length).fill(0));
            set_character_counter(Array(chosen_banner.banner_characters.length).fill(0));
            set_guaranteed_records(Array(chosen_banner.coin_flip_rate.length).fill(false));
            set_rate_up_counters(Array(chosen_banner.coin_flip_rate.length).fill(0));
            set_off_rate_counters(Array(chosen_banner.coin_flip_rate.length).fill(0));
        }
    }, [chosen_banner])

    function compute_pull_result(pull_rate: number, local_pity_counters: number[]): number {
        if (chosen_banner === null) {return 0}

        // 1: Run a loop through the base rates. At each index:
        // 1.1: Check if the current index also exist in the soft_pity array.
            // 1.1.1: If yes, check if the pity counter has enter the soft pity range by comparing the counter with the soft pity at the same index.
            // 1.1.1.1: If yes, calculate the pity rate and compare the pull_rate against it.
                // 1.1.1.1.1: Return the current index if a win is detected.
            // 1.1.2: If not, compare the pull_rate against the base rate.
            // 1.1.2.1: Return the current index if a win is detected.
        for (let index = 0; index < chosen_banner.base_rate.length; index++) {
        if (index < chosen_banner.soft_pity.length) { // All rarities have base rate but not all of them have soft pity
            if (local_pity_counters[index] >= chosen_banner.soft_pity[index]) {
                const current_rate = 1 / (1 + Math.exp(chosen_banner.acceleration[index] * (local_pity_counters[index] - chosen_banner.mid_point[index])));
                if (pull_rate <= current_rate) {
                    if (index == 0) {
                        //console.log(`Pity - Current Rate: ${current_rate}. Current Pity: ${local_pity_counters}. Pull Rate: ${pull_rate}`);
                    }
                    return index;
                }
            } else {
                if (pull_rate <= chosen_banner.base_rate[index]) {
                    if (index == 0) {
                        //console.log(`1 Base Rate Pity - Current Pity: ${local_pity_counters}. Pull Rate: ${pull_rate}`);
                    }
                    return index;
                }
            }
        } else {
            if (pull_rate <= chosen_banner.base_rate[index]) {
            if (index == 0) {
                //console.log(`2 Base Rate No Pity - Current Pity: ${local_pity_counters}. Pull Rate: ${pull_rate}`);
            }
            return index;
            }
        }
        }

        //console.log("ERROR");
        return chosen_banner.base_rate.length - 1;
    }

    function compute_coin_flip(character_rarity_index: number, local_guaranteed_records: boolean[]): boolean {
        if (chosen_banner === null) {return false}

        // 1: Compute a rate
        // 2: Check the rate against the coin flip records
        // 2.1: If the result is a success, return true.
        // 2.2: If the result is a failure, check the guaranteed records to see if the rarirty is guaranteed a success.
            // 2.2.1: If yes, return true.
            // 2.2.2: If not, return false.
        const success_rate = Math.random();
        if (success_rate <= chosen_banner.coin_flip_rate[character_rarity_index]) {
            return true;
        } else {
            if (local_guaranteed_records[character_rarity_index] == true) {
                return true;
            } else {
                return false;
            }
        }
    }

    function find_character_based_on_id(character_id: number): GameCharacter {
        const error_character = {
            gc_id: 0,
            gc_name: 'Test Cat 1',
            image_url: 'test_cat.jpg',
            rarity: 5,
            limited: true,
            date_added: new Date('2025-07-19T14:46:36.000Z'),
            last_updated: new Date('2025-07-19T14:46:36.000Z')
        }
        
        const character = game.game_characters.find(character => character.gc_id === character_id);
        if (character) {
            return character;
        } else {
            alert("Something went wrong when trying to find a character based on id!");
            return error_character;
        }
    }

    function initiate_pull(pull_amount: number): void {
        if (!chosen_banner) {return}

        // Local variables which mirrored its global counterparts.
        // The function will update the local variables through out the process and only update the global counter part once at the end.
        // This reduces the number of time needed for re-rendering.
        let local_pull_counter: number = pull_counter;
        let local_money_spent: number = money_spent;
        const local_pity_counters: number[] | null = pity_counters;
        const local_character_counters: number[] | null = character_counters;
        const local_guaranteed_records: boolean[] | null = guaranteed_records;
        const local_rate_up_counters: number[] | null = rate_up_counters;
        const local_off_rate_counters: number[] | null = off_rate_counters;
        const pulled_characters_id: number[] = [];
        const local_pull_result: GameCharacter[] | null = [];

        if (!local_pity_counters || !local_character_counters || !local_guaranteed_records || !local_rate_up_counters || !local_off_rate_counters) {return}

        // 1: Run a loop. At each loop:
        for (let pull: number = 0; pull < pull_amount; pull++) {
            local_pull_counter += 1; // 1.1: Increment the local pull count by 1
            // 1.2: For each local pity counter, increment them by 1
            for (const pity_counter_index in local_pity_counters) {
                local_pity_counters[pity_counter_index] += 1;
            }
            const result: number = Math.random(); // 1.3: Compute a random number between 0 and 1, this is the pull rate

            // 1.4: Compute the rarity of the resulting character.
            // This variable represents the index in the local_character_counters array.
            // For example, after computing the pull rate, the variable changing to 0 means that the pull resulted in
            // a character with the rarity represented by the 0 index in the local_character_counters, usually the highest rarity.
            let character_rarity: number = -1
            character_rarity = compute_pull_result(result, local_pity_counters);

            // 1.5: Increment the character counter of the won rarirty and set the local pity count of that pity to 0 if applicable
            local_character_counters[character_rarity] += 1;
            if (character_rarity < local_pity_counters.length) {
                local_pity_counters[character_rarity] = 0;
            }

            // 1.6: Check if the coin flip system is applied to the won rarity.
                // 1.6.1: If yes, compute the coin flip.
                // 1.6.1.1: If the coin flip is a success, set the guaranteed record of that rarity to false and increment the rate up counter of that rarity.
                // 1.6.1.2: If the coin flip is a failure, set the guaranteed record of that rarity to true and increment the off rate counter of that rarity.
            let coin_flip_result = 0;
            if (character_rarity < chosen_banner.coin_flip_rate.length) {
                const coin_flip_success: boolean = compute_coin_flip(character_rarity, local_guaranteed_records);
                if (coin_flip_success == true) {
                local_guaranteed_records[character_rarity] = false;
                local_rate_up_counters[character_rarity] += 1;
                //console.log(`Character with rarity: ${chosen_banner.highest_rarity-character_rarity}: Success`);
                } else {
                local_guaranteed_records[character_rarity] = true;
                local_off_rate_counters[character_rarity] += 1;
                coin_flip_result = 1;
                //console.log(`Character with rarity: ${chosen_banner.highest_rarity-character_rarity}: Failure`);
                }
            }

            // 1.7: Use character_rarity, as row, and coin_flip_result, as column, to access the characters_matrix_table.
                // 1.7.1: If the array's length is equal to one, push the only character in the local_pull_result array.
                // 1.7.2: If the array's length is bigger than one, choose a character randomly through uniform distribution.
            if (chosen_banner.banner_characters[character_rarity][coin_flip_result].length == 1) {
                pulled_characters_id.push(chosen_banner.banner_characters[character_rarity][coin_flip_result][0]);
            } else {
                const randomly_chosen_index = Math.round(Math.random() * (chosen_banner.banner_characters[character_rarity][coin_flip_result].length - 1));
                pulled_characters_id.push(chosen_banner.banner_characters[character_rarity][coin_flip_result][randomly_chosen_index]);
            }

            // 1.8: Increment the money spent
            local_money_spent += game.money_per_pull;
        }

        for (let i: number = 0; i < pulled_characters_id.length; i++) {
            const pulled_character: GameCharacter = find_character_based_on_id(pulled_characters_id[i]);
            local_pull_result.push(pulled_character);
        }

        // Bulk update the global variables with its local counter parts.
        set_pull_counter(local_pull_counter);
        set_pity_counter([...local_pity_counters]);
        set_character_counter([...local_character_counters]);
        set_guaranteed_records([...local_guaranteed_records]);
        set_rate_up_counters([...local_rate_up_counters]);
        set_off_rate_counters([...local_off_rate_counters]);
        set_pull_result([...local_pull_result]);
        set_money_spent(local_money_spent);
    }

    function reset_session() {
        set_pull_counter(0);
        set_money_spent(0);
        set_pull_result([]);
        if (chosen_banner) {
            set_pity_counter(Array(chosen_banner.soft_pity.length).fill(0));
            set_character_counter(Array(chosen_banner.banner_characters.length).fill(0));
            set_guaranteed_records(Array(chosen_banner.coin_flip_rate.length).fill(false));
            set_rate_up_counters(Array(chosen_banner.coin_flip_rate.length).fill(0));
            set_off_rate_counters(Array(chosen_banner.coin_flip_rate.length).fill(0));
        }
    }

    function handleBannerChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const chosen_banner_id = Number(event.target.value);
        const found_banner = game.banners.find(banner => banner.b_id === chosen_banner_id);
        if (found_banner) {
            set_chosen_banner(found_banner)
        } else if (chosen_banner_id === -1) {
            set_chosen_banner(null);
        } else {
            alert("Banner Doesn't Exist");
        }
    }

    return (
        <div className="flex-1 flex flex-col gap-4 md:gap-0">
            <div className="flex flex-row">
                <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
                    <div className="w-[90%] border-b-2 border-b-[#B0AEAE] flex justify-center text-4xl p-4">{game.g_name}</div>
                    <div className="w-[90%] border-b-2 border-b-[#B0AEAE] flex justify-center text-4xl p-4">
                        <select className="w-full text-center" value={chosen_banner?chosen_banner.b_id:-1} onChange={handleBannerChange}>
                            <option value={-1}>-- Choose A Banner --</option>
                            {
                                game.banners.map((banner) => (
                                    <option key={banner.b_id} value={banner.b_id}>{banner.b_name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="hidden md:block relative w-1/2">
                    <Image src={'/banner.png'} priority alt={game.image_url} sizes="80vw" fill={true} className=""/>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                {chosen_banner !== null && 
                <CurrentBanner 
                    money_spent={money_spent} 
                    highest_rarity={chosen_banner.highest_rarity} 
                    pull_counter={pull_counter} 
                    rate_up_counters={rate_up_counters} 
                    off_rate_counters={off_rate_counters}
                    pull_result={pull_result}
                    character_counters={character_counters}
                    initiate_pull={initiate_pull}
                    reset_session={reset_session}
                />}
            </div>
        </div>
    )
}

export default GameEngine;
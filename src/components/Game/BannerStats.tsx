import React from "react";

type BannerStatsProp = {
    money_spent: number;
    highest_rarity: number;
    pull_counter: number;
    rate_up_counters: number[];
    off_rate_counters: number[];
    character_counters: number[];
}

const BannerStats: React.FC<BannerStatsProp> = ({money_spent, highest_rarity, pull_counter, rate_up_counters, off_rate_counters, character_counters}) => {
    const statsTable = [];
    const padding = 'p-4'
    let key: number = 1;

    statsTable.push(
        <div key={key} className='w-full flex flex-row text-2xl'>
            <div className={`w-1/2 border-r-2 border-r-smoke ${padding}`}> Total Pull</div>
            <div className={`flex flex-1 justify-center items-center ${padding}`}> {pull_counter} </div>
        </div>
    );
    key += 1;

    statsTable.push(
        <div key={key} className='flex flex-row w-full text-2xl'>
            <div className={`w-1/2 border-r-2 border-r-smoke ${padding}`}> Money Spent</div>
            <div className={`flex flex-1 justify-center items-center ${padding}`}> <span className="text-[#0D5B0B]">$</span>{money_spent.toFixed(2)} </div>
        </div>
    );
    key += 1;

    for (let i = 0; i < rate_up_counters.length; i++) {
        statsTable.push(
            <div key={key} className='flex flex-row w-full text-2xl'>
                <div className={`w-1/2 border-r-2 border-r-smoke ${padding}`}> {highest_rarity-i} Stars Count</div>
                <div className={`flex-1 flex flex-row ${padding}`}>
                    <div className='flex flex-1 justify-center items-center'> {rate_up_counters[i]} </div>
                    <div className='flex flex-1 justify-center items-center text-danger'> {off_rate_counters[i]} </div>
                </div>
            </div>
        )
        key+=1;
    }

    for (let i = rate_up_counters.length; i < character_counters.length; i++) {
        statsTable.push(
            <div key={key} className='flex flex-row w-full text-2xl'>
                <div className={`w-1/2 border-r-2 border-r-smoke ${padding}`}> {highest_rarity-i} Stars Count</div>
                <div className={`flex flex-1 justify-center items-center ${padding}`}> {character_counters[i]} </div>
            </div>
        )
        key += 1;
    }

    return (<div className='w-full max-h-[320px] overflow-y-scroll no-scrollbar flex flex-col'>{statsTable}</div>);
}

export default BannerStats
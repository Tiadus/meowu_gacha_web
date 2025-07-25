import ArrowDownInCircle from '../UI/Accessibility/ArrowDownInCircle';
import FadeIn from '../UI/Animation/FadeIn';
import BannerAction from './BannerAction';
import BannerStats from './BannerStats';
import PullResult from './PullResult';
import { GameCharacter } from '@/types/game';

type CurrentBannerProp = {
  money_spent: number;
  highest_rarity: number;
  pull_counter: number;
  character_counters: number[];
  rate_up_counters: number[];
  off_rate_counters: number[];
  pull_result: GameCharacter[];
  initiate_pull: (pull_amount: number) => void;
  reset_session: () => void;
}

const CurrentBanner: React.FC<CurrentBannerProp> = ({money_spent, highest_rarity, pull_counter, rate_up_counters, off_rate_counters, pull_result, character_counters, initiate_pull, reset_session}) => {
  return (
    <div className='flex-1 flex flex-col-reverse md:flex-row'>
        <div className= 'w-full md:w-1/2 flex flex-col'>
          <div className='w-full h-[20%] md:h-[30%] flex justify-center items-center'>
            <div className='w-[80%] h-[50%]'>
              <BannerAction initiate_pull={initiate_pull} reset_session={reset_session}/>
            </div>
          </div>
          <div className='flex-1 flex justify-center items-center'>
            <div className='w-[90%]'>
              <BannerStats 
                money_spent={money_spent} 
                highest_rarity={highest_rarity} 
                pull_counter={pull_counter} 
                rate_up_counters={rate_up_counters} 
                off_rate_counters={off_rate_counters} 
                character_counters={character_counters}
              />
            </div>
          </div>
        </div>
        <div className= 'w-full md:w-1/2 flex flex-1 justify-center items-center'>
          <div className='w-[90%] h-[600] md:h-[90%] flex items-center justify-center'>
            {pull_result.length > 0 && 
              <FadeIn>
                <PullResult characters={pull_result} row_qty={4} col_qty={3} highest_rarity={highest_rarity}/>
              </FadeIn>
            }
            {pull_result.length === 0 && <div className='md:hidden'><ArrowDownInCircle/></div>}
          </div>
        </div>
    </div>
  )
}

export default CurrentBanner;

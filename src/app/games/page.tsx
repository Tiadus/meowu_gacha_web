import { GameSummary } from "@/types/game";
import { fetchGames } from "@/lib/game";
import ArrowDownInCircle from "@/components/UI/Accessibility/ArrowDownInCircle";
import GameCard from "@/components/Game/GameCard";

export const dynamic = "force-static"; // ensures static generation at build

export const metadata = {
  title: 'Animal Gacha Simulators – Inspired by Your Favorite Games',
  metadataBase: new URL('http://localhost:3000'),
  description: 'Try your luck in cute animal gacha simulators inspired by Honkai: Star Rail, Wuthering Waves, and more!',
  openGraph: {
    title: 'Animal Gacha Simulators',
    description: 'Get random animal pics in gacha simulations inspired by top games.',
    images: ['/main.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animal Gacha Simulators',
    description: 'Cute animals. Inspired by real games. Pull now!',
    images: ['/main.jpg'],
  },
}

export default async function GameListPage() {
  let games: GameSummary[] = [];
  
  const fetchedGames: GameSummary[] = await fetchGames();
  games = fetchedGames;

  return (
    <main className="w-full h-full flex justify-center">
      <div className="md:mt-8 w-[95%] md:w-[90%] h-full flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-4 md:gap-12">
          <h1 className="md:text-4xl font-semibold text-center">
            The ultimate gacha simulator for your favourite gacha games
          </h1>
          <h2 className="text-center md:text-2xl md:w-[70%]">
            Meowu Gacha provides gacha simulators that mimic the system of 
            Honkai: Star Rail, Wuthering Waves, and many more to come.
            What’s more? You will get cute animals instead of the characters!  
          </h2>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 items-center">
          <span className="md:text-2xl">Choose A Game</span>
          <ArrowDownInCircle/>
        </div>
        <div className="flex-1 w-full flex flex-wrap gap-4 justify-center">
          {
           games.map((game) => (
              <div key={game.g_id} className="w-full h-[50%] md:w-[25%] md:aspect-[7/9]">
                <GameCard game={game}/>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}

export const dynamic = 'force-static'; // ensures static generation
import { Game } from "@/types/game";
import GameEngine from "@/components/Game/GameEngine";
import { fetchGames, fetchGameDetail } from "@/lib/game";

export async function generateStaticParams() {
    const games: Game[] = await fetchGames()

    return games.map((game: Game) => ({
        id: game.g_id.toString(),
    }));
}

export async function generateMetadata({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const game: Game | undefined = await fetchGameDetail(+id);

    if (!game) {return;}

    return {
        title: `${game?.g_name} - Meowu Gacha`,
        metadataBase: new URL('http://localhost:3000'),
        description: `A Parody Gacha Experience ${game?.introduction}. Pull random animals in ${game?.g_name}!`,
        openGraph: {
            title: `${game.g_name} - Meowu Gacha`,
            description: `A Parody Gacha Experience ${game?.introduction}`,
            images: [`/${game.image_url}`],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${game.g_name} - Meowu Gacha`,
            description: `Try Your Luck In This Parody Gacha ${game?.introduction}.`,
            images: [game.image_url],
        },
    }
}

export default async function GamePage({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const game: Game | undefined = await fetchGameDetail(+id);

    if (!game) {
        return (
            <main>Game Unavailable</main>
        )
    }

    return (
        <main className="w-full h-full flex justify-center">
            <div className="w-[95%] md:w-[90%] h-full flex flex-col">
                <GameEngine
                    game={game}
                />
            </div>
        </main>
    )
}
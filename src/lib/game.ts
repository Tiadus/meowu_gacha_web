import { cache } from "react";
import { Game } from "@/types/game";

const baseUrl = process.env.API_BASE_URL

export const fetchGames = cache(async () => {
    const res = await fetch(`${baseUrl}/games`, {
        cache: 'force-cache'
    });

    if (!res.ok) {
        throw new Error(`Failed To Fetch Games`)
    }

    const json = await res.json();
    return json.data;
})

export const fetchGameDetail = cache(async (g_id: number): Promise<Game | undefined> => {
    const res = await fetch(`${baseUrl}/games/${g_id}`);

    if (!res.ok) {
        throw new Error(`Failed To Fetch Game With ID: ${g_id}`)
    }

    const json = await res.json();
    return json.data;
})
export type Banner = {
  b_id: number,
  b_name: string,
  image_url: string,
  highest_rarity: number,
  lowest_rarity: number,
  date_added: Date,
  last_updated: Date,
  banner_characters: number[][][],
  base_rate: number[],
  soft_pity: number[],
  mid_point: number[],
  acceleration: number[],
  coin_flip_rate: number[]
}

export type GameCharacter = {
  gc_id: number,
  gc_name: string,
  image_url: string,
  c_type: string,
  rarity: number,
  limited: boolean,
  date_added: Date,
  last_updated: Date
}

export type GameSummary = {
  g_id: number,
  g_name: string,
  money_per_pull: number,
  image_url: string,
  developer: string,
  introduction: string,
  date_added: Date,
  last_updated: Date,
}

export type Game = GameSummary & {
  last_updated: Date,
  game_characters: GameCharacter[],
  banners: Banner[]
}
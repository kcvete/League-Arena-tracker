export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ChampionImage;
  tags: string[];
  partype: string;
  blurb: string;
}

export interface ChampionDataResponse {
  type: string;
  format: string;
  version: string;
  data: Record<string, Champion>;
}
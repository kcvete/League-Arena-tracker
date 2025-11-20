import { Champion, ChampionDataResponse } from '../types';

const BASE_URL = 'https://ddragon.leagueoflegends.com';

export const fetchLatestVersion = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/api/versions.json`);
    if (!response.ok) throw new Error('Failed to fetch versions');
    const versions = await response.json();
    return versions[0];
  } catch (error) {
    console.error('Error fetching version:', error);
    return '14.1.1'; // Fallback version
  }
};

export const fetchChampions = async (version: string): Promise<Champion[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cdn/${version}/data/en_US/champion.json`);
    if (!response.ok) throw new Error('Failed to fetch champions');
    const data: ChampionDataResponse = await response.json();
    
    // Convert map to array and sort alphabetically
    const championsArray = Object.values(data.data).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    return championsArray;
  } catch (error) {
    console.error('Error fetching champions:', error);
    return [];
  }
};

export const getChampionIconUrl = (version: string, championId: string): string => {
  return `${BASE_URL}/cdn/${version}/img/champion/${championId}.png`;
};

export const getChampionSplashUrl = (championId: string): string => {
  return `${BASE_URL}/cdn/img/champion/splash/${championId}_0.jpg`;
};

export const getChampionLoadingUrl = (championId: string): string => {
  return `${BASE_URL}/cdn/img/champion/loading/${championId}_0.jpg`;
};
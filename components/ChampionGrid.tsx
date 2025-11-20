import React from 'react';
import { Champion } from '../types';
import { getChampionIconUrl } from '../services/leagueService';

interface ChampionGridProps {
  champions: Champion[];
  completedIds: string[];
  currentChampionId: string | undefined;
  version: string;
  onToggle: (id: string) => void;
}

export const ChampionGrid: React.FC<ChampionGridProps> = ({
  champions,
  completedIds,
  currentChampionId,
  version,
  onToggle
}) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 md:gap-6">
      {champions.map((champ) => {
        const isCompleted = completedIds.includes(champ.id);
        const isCurrent = champ.id === currentChampionId;

        return (
          <div 
            key={champ.id}
            onClick={() => onToggle(champ.id)}
            className={`
              group relative cursor-pointer transition-all duration-300 select-none
              ${isCompleted ? 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0' : 'opacity-100'}
              ${isCurrent ? 'transform scale-105 z-10' : 'hover:scale-105'}
            `}
            title={champ.name}
          >
            {/* Border/Container */}
            <div className={`
              aspect-square rounded-lg overflow-hidden border-2 bg-slate-800 shadow-lg
              ${isCurrent 
                ? 'border-lol-gold shadow-[0_0_15px_rgba(200,155,60,0.4)]' 
                : isCompleted 
                  ? 'border-slate-700' 
                  : 'border-slate-600 hover:border-lol-blue'
              }
            `}>
              <img 
                src={getChampionIconUrl(version, champ.id)} 
                alt={champ.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Completed Overlay */}
              {isCompleted && (
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-[1px]">
                  <svg className="w-10 h-10 text-lol-blue drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* Name Label */}
            <div className={`
              mt-2 text-center text-xs md:text-sm font-bold truncate px-1
              ${isCurrent ? 'text-lol-gold' : isCompleted ? 'text-slate-500' : 'text-slate-300 group-hover:text-white'}
            `}>
              {champ.name}
            </div>
            
            {/* Current Indicator Tag */}
            {isCurrent && (
              <div className="absolute -top-2 -right-2 bg-lol-gold text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                NEXT
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
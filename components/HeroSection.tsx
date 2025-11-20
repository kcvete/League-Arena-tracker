import React from 'react';
import { Champion } from '../types';
import { getChampionSplashUrl } from '../services/leagueService';

interface HeroSectionProps {
  champion: Champion | undefined;
  onComplete: () => void;
  totalChampions: number;
  completedCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  champion, 
  onComplete,
  totalChampions,
  completedCount
}) => {
  if (!champion) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 p-8 text-center">
        <div>
          <h2 className="text-4xl text-lol-gold mb-4 font-serif">Challenge Complete!</h2>
          <p className="text-slate-400 text-lg">You have won with every single champion. You are a true Arena God.</p>
        </div>
      </div>
    );
  }

  const splashUrl = getChampionSplashUrl(champion.id);
  const progress = Math.round((completedCount / totalChampions) * 100);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={splashUrl} 
          alt={champion.name} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between min-h-[400px]">
        
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center space-x-2">
            <span className="px-3 py-1 bg-lol-gold/20 border border-lol-gold/50 text-lol-gold text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
              Current Target
            </span>
            <span className="text-slate-400 text-xs uppercase tracking-wider">
              {completedCount + 1} / {totalChampions}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-serif tracking-tight drop-shadow-lg">
            {champion.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light italic mb-8 drop-shadow-md">
            {champion.title}
          </p>

          <button
            onClick={onComplete}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-lol-gold hover:bg-lol-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lol-gold focus:ring-offset-slate-900 rounded-xl overflow-hidden"
          >
            <span className="relative flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg">Mark as Won</span>
            </span>
          </button>
        </div>

        {/* Progress Circle (Desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              {/* Background Circle */}
              <path
                className="text-slate-700"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Progress Circle */}
              <path
                className="text-lol-blue drop-shadow-[0_0_8px_rgba(10,200,185,0.6)]"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-white">{progress}%</span>
            </div>
          </div>
          <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest">Complete</span>
        </div>
      </div>
    </div>
  );
};
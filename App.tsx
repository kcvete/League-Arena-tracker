import React, { useEffect, useState, useMemo } from 'react';
import { fetchLatestVersion, fetchChampions } from './services/leagueService';
import { Champion } from './types';
import { HeroSection } from './components/HeroSection';
import { ChampionGrid } from './components/ChampionGrid';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [version, setVersion] = useState<string>('');
  const [champions, setChampions] = useState<Champion[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    // Load initial state from local storage
    const saved = localStorage.getItem('arenaGodCompleted');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  // Initial Fetch
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const ver = await fetchLatestVersion();
        setVersion(ver);
        const champs = await fetchChampions(ver);
        setChampions(champs);
      } catch (e) {
        console.error("Failed to initialize", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('arenaGodCompleted', JSON.stringify(completedIds));
  }, [completedIds]);

  // Determine Current Champion (First alphabetically that isn't completed)
  const currentChampion = useMemo(() => {
    return champions.find(c => !completedIds.includes(c.id));
  }, [champions, completedIds]);

  // Handlers
  const toggleChampion = (id: string) => {
    setCompletedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const completeCurrent = () => {
    if (currentChampion) {
      toggleChampion(currentChampion.id);
    }
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      setCompletedIds([]);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Decorative Hextech Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lol-dark-blue/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-lol-gold/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lol-gold to-lol-gold-dark rounded-lg flex items-center justify-center shadow-lg border border-white/20">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Arena God</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">A-Z Challenge Tracker</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-sm text-slate-400">Progress</div>
                <div className="text-lg font-bold text-lol-hextech">
                    {completedIds.length} <span className="text-slate-600">/</span> {champions.length}
                </div>
             </div>
             <button 
                onClick={resetProgress}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Reset Progress"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
             </button>
          </div>
        </header>

        {/* Hero Section - Current Champion */}
        <div className="mb-16">
          <HeroSection 
            champion={currentChampion} 
            onComplete={completeCurrent} 
            totalChampions={champions.length}
            completedCount={completedIds.length}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <h2 className="text-xl font-serif text-slate-400 uppercase tracking-widest">All Champions</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>

        {/* Champion Grid */}
        <ChampionGrid 
          champions={champions}
          completedIds={completedIds}
          currentChampionId={currentChampion?.id}
          version={version}
          onToggle={toggleChampion}
        />
      </div>
    </div>
  );
}

export default App;
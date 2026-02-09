'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  progress?: number;
}

export default function KevinsQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestDesc, setNewQuestDesc] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kevins_quests');
    if (saved) {
      setQuests(JSON.parse(saved));
    } else {
      // Default quests
      setQuests([
        {
          id: '1',
          title: 'Workout Routine',
          description: 'Complete 3x weekly gym sessions',
          completed: false,
          progress: 1,
        },
        {
          id: '2',
          title: 'Doctor Appointments',
          description: 'Schedule phenelzine follow-up',
          completed: false,
        },
        {
          id: '3',
          title: 'Home Improvement',
          description: 'Paint the master bedroom',
          completed: false,
          progress: 20,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kevins_quests', JSON.stringify(quests));
  }, [quests]);

  const toggleQuest = (id: string) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const addQuest = () => {
    if (!newQuestTitle.trim()) return;
    const newQuest: Quest = {
      id: Date.now().toString(),
      title: newQuestTitle,
      description: newQuestDesc,
      completed: false,
      progress: 0,
    };
    setQuests([...quests, newQuest]);
    setNewQuestTitle('');
    setNewQuestDesc('');
  };

  const deleteQuest = (id: string) => {
    setQuests(quests.filter(q => q.id !== id));
  };

  const completedCount = quests.filter(q => q.completed).length;

  return (
    <div className="space-y-4">
      {/* HEADER WITH STATS */}
      <div className="border-l-4 border-blue-500 pl-4 mb-6">
        <h1 className="font-heading text-2xl text-white">KEVIN'S QUESTS</h1>
        <p className="text-blue-400 font-bold text-sm tracking-widest">⚔️ {completedCount} / {quests.length} Completed</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="bg-[#0f172a] border border-[#333] rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Overall Progress</span>
          <span className="text-xs text-[#d4af37]">{Math.round((completedCount / (quests.length || 1)) * 100)}%</span>
        </div>
        <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
            style={{ width: `${(completedCount / (quests.length || 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* QUESTS LIST */}
      <div className="space-y-2">
        {quests.map(quest => (
          <div 
            key={quest.id}
            className={`p-3 rounded border transition-all ${
              quest.completed
                ? 'bg-green-900/20 border-green-600/30'
                : 'bg-[#1a1a1a] border-gray-700 hover:border-blue-600'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleQuest(quest.id)}
                className="mt-0.5 flex-shrink-0"
              >
                {quest.completed ? (
                  <CheckCircle2 size={20} className="text-green-400" />
                ) : (
                  <Circle size={20} className="text-gray-500 hover:text-blue-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className={`font-bold ${quest.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                  {quest.title}
                </h3>
                <p className="text-xs text-gray-400">{quest.description}</p>

                {/* Progress Bar for tracked quests */}
                {quest.progress !== undefined && quest.progress > 0 && (
                  <div className="mt-2 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <button
                onClick={() => deleteQuest(quest.id)}
                className="flex-shrink-0 text-gray-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW QUEST */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h3 className="text-sm font-bold text-[#d4af37] mb-3">Add New Quest</h3>
        <input
          type="text"
          value={newQuestTitle}
          onChange={(e) => setNewQuestTitle(e.target.value)}
          placeholder="Quest title..."
          className="w-full mb-2 p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-blue-500 outline-none"
        />
        <textarea
          value={newQuestDesc}
          onChange={(e) => setNewQuestDesc(e.target.value)}
          placeholder="Description (optional)..."
          className="w-full mb-2 p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-blue-500 outline-none resize-none h-16"
        />
        <button
          onClick={addQuest}
          className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded transition-colors"
        >
          Create Quest
        </button>
      </div>
    </div>
  );
}

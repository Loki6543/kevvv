'use client';
import { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Camera } from 'lucide-react';

interface BucketItem {
  id: string;
  title: string;
  emoji: string;
  description?: string;
  photos: string[];
  date?: string;
}

export default function BucketList() {
  const [items, setItems] = useState<BucketItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newEmoji, setNewEmoji] = useState('✨');
  const [newDescription, setNewDescription] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ['✨', '❤️', '🌍', '📸', '🎉', '🎬', '🎨', '💑', '🏠', '⛰️', '🚀', '🎭'];

  useEffect(() => {
    const saved = localStorage.getItem('bucket_list');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bucket_list', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newTitle.trim()) return;
    const item: BucketItem = {
      id: Date.now().toString(),
      title: newTitle,
      emoji: newEmoji,
      description: newDescription,
      photos: [],
      date: new Date().toISOString().split('T')[0],
    };
    setItems([item, ...items]);
    setNewTitle('');
    setNewDescription('');
    setNewEmoji('✨');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const addPhoto = (itemId: string, photoUrl: string) => {
    setItems(items.map(item =>
      item.id === itemId
        ? { ...item, photos: [photoUrl, ...item.photos] }
        : item
    ));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const photoUrl = reader.result as string;
      addPhoto(itemId, photoUrl);
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = (itemId: string) => {
    setSelectedItemId(itemId);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="font-heading text-3xl text-[#d4af37] text-shadow">BUCKET LIST</h1>
        <p className="font-fantasy text-[#60a5fa] text-lg">Stella & Kevin Adventures</p>
      </div>

      {/* ADD NEW BUCKET ITEM */}
      <div className="bg-[#1e1e1e] border-2 border-pink-600/30 rounded-lg p-4">
        <h3 className="text-sm font-bold text-pink-400 mb-3">Add Adventure</h3>
        <div className="space-y-2 mb-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Adventure title (e.g., 'Germany Reunion')..."
            className="w-full p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-pink-500 outline-none"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Where? When? Why? (optional)"
            className="w-full p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-pink-500 outline-none resize-none h-12"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400">Pick emoji:</label>
              <select
                value={newEmoji}
                onChange={(e) => setNewEmoji(e.target.value)}
                className="w-full p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-pink-500 outline-none"
              >
                {emojis.map(e => <option key={e} value={e}>{e} {e}</option>)}
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={addItem}
          className="w-full py-2 bg-pink-700 hover:bg-pink-600 text-white font-bold rounded transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add to Bucket
        </button>
      </div>

      {/* BUCKET ITEMS - LOVE WICK STYLE */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No adventures yet. Create your first bucket list item! 🌟</p>
          </div>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="bg-[#1a1a1a] border border-pink-600/20 rounded-lg overflow-hidden hover:border-pink-600/40 transition-all"
            >
              {/* PHOTO CAROUSEL */}
              <div className="relative bg-black aspect-square overflow-auto">
                {item.photos.length > 0 ? (
                  <div className="flex gap-2 p-2 overflow-x-auto">
                    {item.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`Memory ${idx}`}
                        className="h-full rounded flex-shrink-0 object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-900/20 to-purple-900/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <p className="text-gray-400 text-sm">No photos yet</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h3 className="font-bold text-white">{item.title}</h3>
                      {item.date && <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                )}

                {/* PHOTO BUTTON */}
                <button
                  onClick={() => openFileDialog(item.id)}
                  className="w-full py-2 bg-pink-600/30 border border-pink-600 hover:bg-pink-600/50 text-pink-200 font-semibold rounded transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Camera size={16} /> Add Photo
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => selectedItemId && handlePhotoUpload(e, selectedItemId)}
      />
    </div>
  );
}

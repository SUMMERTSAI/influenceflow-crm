
import React, { useState } from 'react';
import { Metrics } from '../types';
import { X, Heart, MessageSquare, ShoppingBag, BarChart3 } from 'lucide-react';

interface PerformanceFormProps {
  onClose: () => void;
  onSave: (data: Metrics) => void;
}

const PerformanceForm: React.FC<PerformanceFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Metrics>({
    likes: 0,
    comments: 0,
    sales: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} />
            <h2 className="text-xl font-bold">Post Metrics</h2>
          </div>
          <button onClick={onClose} className="hover:bg-emerald-500 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Likes</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={formData.likes}
                  onChange={e => setFormData({ ...formData, likes: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Comments</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={formData.comments}
                  onChange={e => setFormData({ ...formData, comments: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Sales Generated</label>
              <div className="relative">
                <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={formData.sales}
                  onChange={e => setFormData({ ...formData, sales: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all"
            >
              Save Results
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerformanceForm;

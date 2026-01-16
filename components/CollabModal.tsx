
import React, { useState } from 'react';
import { Influencer, Campaign, Collaboration, CollabStatus } from '../types';
import { X, Briefcase, UserPlus, DollarSign } from 'lucide-react';

interface CollabModalProps {
  influencers: Influencer[];
  campaigns: Campaign[];
  onClose: () => void;
  onSave: (collab: Collaboration) => void;
}

const CollabModal: React.FC<CollabModalProps> = ({ influencers, campaigns, onClose, onSave }) => {
  const [influencerId, setInfluencerId] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [cost, setCost] = useState(1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!influencerId || !campaignId) return;

    const newCollab: Collaboration = {
      id: `col-${Date.now()}`,
      influencerId,
      campaignId,
      status: CollabStatus.CONTACTED,
      cost
    };

    onSave(newCollab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-slate-900 p-8 flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">New Collaboration</h2>
            <p className="text-slate-400 text-sm mt-1">Initialize a partnership lifecycle.</p>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Creator</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  value={influencerId}
                  onChange={e => setInfluencerId(e.target.value)}
                >
                  <option value="">Select Influencer...</option>
                  {influencers.map(inf => (
                    <option key={inf.id} value={inf.id}>{inf.handle} ({inf.platform})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Campaign</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  value={campaignId}
                  onChange={e => setCampaignId(e.target.value)}
                >
                  <option value="">Link to Campaign...</option>
                  {campaigns.map(cam => (
                    <option key={cam.id} value={cam.id}>{cam.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Agreed Cost ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={cost}
                  onChange={e => setCost(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all"
            >
              Launch Collaboration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollabModal;

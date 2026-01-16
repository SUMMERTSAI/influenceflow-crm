
import React from 'react';
import { Influencer, Platform } from '../types';
// Fixed missing ExternalLink import
import { Instagram, Youtube, MessageCircle, Twitter, MapPin, Users, ExternalLink } from 'lucide-react';

interface InfluencerGridProps {
  influencers: Influencer[];
}

const InfluencerGrid: React.FC<InfluencerGridProps> = ({ influencers }) => {
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.INSTAGRAM: return <Instagram size={14} className="text-pink-600" />;
      case Platform.YOUTUBE: return <Youtube size={14} className="text-red-600" />;
      case Platform.TIKTOK: return <MessageCircle size={14} className="text-black" />;
      case Platform.TWITTER: return <Twitter size={14} className="text-blue-500" />;
      default: return null;
    }
  };

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {influencers.map(inf => (
        <div key={inf.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest">
              {getPlatformIcon(inf.platform)}
              {inf.platform}
            </div>
          </div>
          <div className="px-6 pb-6 pt-0 -mt-10 relative z-1">
            <div className="flex items-end justify-between mb-4">
              <img src={inf.avatarUrl} alt="" className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover" />
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                  <Users size={16} className="text-slate-400" />
                  {formatFollowers(inf.followers)}
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">粉絲數</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-xl text-slate-900 mb-1">{inf.handle}</h3>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                <MapPin size={14} />
                {inf.address.split(',')[1] || inf.address}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {inf.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <button className="flex-1 bg-slate-900 hover:bg-black text-white py-2 rounded-xl text-sm font-semibold transition-colors">
                查看檔案
              </button>
              <button className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfluencerGrid;


import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  FileText, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  LogOut,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { 
  Influencer, 
  Campaign, 
  Collaboration, 
  CollabStatus, 
  Platform, 
  CollaborationWithDetails,
  Logistics,
  Metrics
} from './types';
import { INITIAL_INFLUENCERS, INITIAL_CAMPAIGNS, INITIAL_COLLABS } from './constants';
import KanbanBoard from './components/KanbanBoard';
import ReportTable from './components/ReportTable';
import InfluencerGrid from './components/InfluencerGrid';
import CollabModal from './components/CollabModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'influencers' | 'pipeline' | 'reports'>('pipeline');
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [collabs, setCollabs] = useState<Collaboration[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [editingCollab, setEditingCollab] = useState<Collaboration | undefined>(undefined);

  // Persistence Simulation
  useEffect(() => {
    const savedInf = localStorage.getItem('inf_data');
    const savedCam = localStorage.getItem('cam_data');
    const savedCol = localStorage.getItem('col_data');

    if (savedInf) setInfluencers(JSON.parse(savedInf));
    else setInfluencers(INITIAL_INFLUENCERS);

    if (savedCam) setCampaigns(JSON.parse(savedCam));
    else setCampaigns(INITIAL_CAMPAIGNS);

    if (savedCol) setCollabs(JSON.parse(savedCol));
    else setCollabs(INITIAL_COLLABS);
  }, []);

  useEffect(() => {
    if (influencers.length > 0) localStorage.setItem('inf_data', JSON.stringify(influencers));
    if (campaigns.length > 0) localStorage.setItem('cam_data', JSON.stringify(campaigns));
    if (collabs.length > 0) localStorage.setItem('col_data', JSON.stringify(collabs));
  }, [influencers, campaigns, collabs]);

  const collabsWithDetails: CollaborationWithDetails[] = useMemo(() => {
    return collabs.map(c => ({
      ...c,
      influencer: influencers.find(i => i.id === c.influencerId)!,
      campaign: campaigns.find(cam => cam.id === c.campaignId)!
    })).filter(c => c.influencer && c.campaign);
  }, [collabs, influencers, campaigns]);

  const handleUpdateCollabStatus = (collabId: string, newStatus: CollabStatus, logistics?: Logistics, metrics?: Metrics) => {
    setCollabs(prev => prev.map(c => {
      if (c.id === collabId) {
        return { 
          ...c, 
          status: newStatus, 
          logistics: logistics || c.logistics,
          metrics: metrics || c.metrics 
        };
      }
      return c;
    }));
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    influencers.forEach(i => i.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [influencers]);

  const filteredInfluencers = useMemo(() => {
    return influencers.filter(inf => {
      const matchesSearch = inf.handle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || inf.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [influencers, searchQuery, selectedTag]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
            IF
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">InfluenceFlow</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'pipeline' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Pipeline Board</span>
          </button>
          <button 
            onClick={() => setActiveTab('influencers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'influencers' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <Users size={20} />
            <span className="font-medium">Influencers</span>
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'reports' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <TrendingUp size={20} />
            <span className="font-medium">Performance</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Activity</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Total Budget</span>
              <span className="font-bold text-indigo-600">${campaigns.reduce((acc, c) => acc + c.budget, 0).toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {activeTab === 'pipeline' && 'Collaboration Pipeline'}
              {activeTab === 'influencers' && 'Influencer Directory'}
              {activeTab === 'reports' && 'Campaign Performance'}
            </h1>
            <p className="text-slate-500 mt-1">Manage your creator relationships and track campaign ROI.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setEditingCollab(undefined);
                setIsCollabModalOpen(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-indigo-100"
            >
              <Plus size={18} />
              New Collaboration
            </button>
          </div>
        </header>

        {activeTab === 'pipeline' && (
          <KanbanBoard 
            collabs={collabsWithDetails} 
            onUpdateStatus={handleUpdateCollabStatus} 
          />
        )}

        {activeTab === 'influencers' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search handles..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-slate-400" size={18} />
                <select 
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                  value={selectedTag || ''}
                  onChange={(e) => setSelectedTag(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
            <InfluencerGrid influencers={filteredInfluencers} />
          </div>
        )}

        {activeTab === 'reports' && (
          <ReportTable collabs={collabsWithDetails} />
        )}
      </main>

      {/* Modals */}
      {isCollabModalOpen && (
        <CollabModal 
          influencers={influencers}
          campaigns={campaigns}
          onClose={() => setIsCollabModalOpen(false)}
          onSave={(newCollab) => {
            setCollabs(prev => [...prev, newCollab]);
            setIsCollabModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default App;

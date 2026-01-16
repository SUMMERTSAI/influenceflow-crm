
import React, { useState } from 'react';
import { CollabStatus, CollaborationWithDetails, Logistics, Metrics } from '../types';
import { 
  Package, 
  Send, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  Clock,
  ArrowRight
} from 'lucide-react';
import LogisticsForm from './LogisticsForm';
import PerformanceForm from './PerformanceForm';

interface KanbanBoardProps {
  collabs: CollaborationWithDetails[];
  onUpdateStatus: (id: string, status: CollabStatus, log?: Logistics, met?: Metrics) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ collabs, onUpdateStatus }) => {
  const [activePrompt, setActivePrompt] = useState<{ id: string, type: 'logistics' | 'performance', nextStatus: CollabStatus } | null>(null);

  const columns = [
    { status: CollabStatus.CONTACTED, icon: <Clock size={16} />, color: 'slate' },
    { status: CollabStatus.SAMPLE_SENT, icon: <Package size={16} />, color: 'blue' },
    { status: CollabStatus.POST_LIVE, icon: <TrendingUp size={16} />, color: 'emerald' },
    { status: CollabStatus.PAID, icon: <DollarSign size={16} />, color: 'purple' }
  ];

  const handleStatusShift = (collab: CollaborationWithDetails) => {
    const statuses = Object.values(CollabStatus);
    const currentIndex = statuses.indexOf(collab.status);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      
      if (nextStatus === CollabStatus.SAMPLE_SENT) {
        setActivePrompt({ id: collab.id, type: 'logistics', nextStatus });
      } else if (nextStatus === CollabStatus.POST_LIVE) {
        setActivePrompt({ id: collab.id, type: 'performance', nextStatus });
      } else {
        onUpdateStatus(collab.id, nextStatus);
      }
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar h-[calc(100vh-250px)]">
      {columns.map(col => (
        <div key={col.status} className="flex-shrink-0 w-80 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg bg-${col.color}-100 text-${col.color}-600`}>
                {col.icon}
              </div>
              <h3 className="font-bold text-slate-700 tracking-tight">{col.status}</h3>
              <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {collabs.filter(c => c.status === col.status).length}
              </span>
            </div>
          </div>

          <div className="flex-1 bg-slate-100/50 rounded-2xl p-3 border border-slate-200 border-dashed overflow-y-auto custom-scrollbar space-y-3">
            {collabs.filter(c => c.status === col.status).map(item => (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={item.influencer.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50" />
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{item.influencer.handle}</h4>
                    <span className="text-xs text-indigo-600 font-medium">{item.campaign.name}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.influencer.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 uppercase font-bold tracking-wider">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-800">
                    ${item.cost.toLocaleString()}
                  </div>
                  {item.status !== CollabStatus.PAID && (
                    <button 
                      onClick={() => handleStatusShift(item)}
                      className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded-lg hover:bg-indigo-50 transition-all flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
                    >
                      Next <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {activePrompt?.type === 'logistics' && (
        <LogisticsForm 
          onClose={() => setActivePrompt(null)}
          onSave={(logData) => {
            onUpdateStatus(activePrompt.id, activePrompt.nextStatus, logData);
            setActivePrompt(null);
          }}
        />
      )}

      {activePrompt?.type === 'performance' && (
        <PerformanceForm 
          onClose={() => setActivePrompt(null)}
          onSave={(perfData) => {
            onUpdateStatus(activePrompt.id, activePrompt.nextStatus, undefined, perfData);
            setActivePrompt(null);
          }}
        />
      )}
    </div>
  );
};

export default KanbanBoard;

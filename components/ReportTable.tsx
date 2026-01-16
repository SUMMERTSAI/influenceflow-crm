
import React from 'react';
import { CollaborationWithDetails } from '../types';
import { BarChart2, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface ReportTableProps {
  collabs: CollaborationWithDetails[];
}

const ReportTable: React.FC<ReportTableProps> = ({ collabs }) => {
  const calculateCPE = (collab: CollaborationWithDetails) => {
    if (!collab.metrics) return 0;
    const totalInteractions = (collab.metrics.likes || 0) + (collab.metrics.comments || 0);
    if (totalInteractions === 0) return 0;
    return collab.cost / totalInteractions;
  };

  const calculateROI = (collab: CollaborationWithDetails) => {
    if (!collab.metrics || collab.cost === 0) return 0;
    // Assume average order value of $50 for simulation
    const estimatedRevenue = collab.metrics.sales * 50;
    return ((estimatedRevenue - collab.cost) / collab.cost) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '總銷售數', val: collabs.reduce((acc, c) => acc + (c.metrics?.sales || 0), 0), icon: <ShoppingBag size={20} />, color: 'amber' },
          { label: '總按讚數', val: collabs.reduce((acc, c) => acc + (c.metrics?.likes || 0), 0).toLocaleString(), icon: <Heart size={20} />, color: 'pink' },
          { label: '平均互動成本', val: '$' + (collabs.filter(c => c.metrics).reduce((acc, c) => acc + calculateCPE(c), 0) / (collabs.filter(c => c.metrics).length || 1)).toFixed(2), icon: <DollarSign size={20} />, color: 'indigo' },
          { label: '總觸及人數', val: collabs.reduce((acc, c) => acc + c.influencer.followers, 0).toLocaleString(), icon: <Users size={20} />, color: 'blue' }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Activity className="text-indigo-600" size={20} />
            <h2 className="font-bold text-lg text-slate-800">活動成效紀錄</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                <th className="px-6 py-4">網紅</th>
                <th className="px-6 py-4">活動</th>
                <th className="px-6 py-4 text-center">互動數</th>
                <th className="px-6 py-4 text-center">互動成本</th>
                <th className="px-6 py-4 text-center">銷售數</th>
                <th className="px-6 py-4 text-center">投報率</th>
                <th className="px-6 py-4 text-right">費用</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {collabs.map(collab => {
                const cpe = calculateCPE(collab);
                const roi = calculateROI(collab);
                const totalInt = (collab.metrics?.likes || 0) + (collab.metrics?.comments || 0);

                return (
                  <tr key={collab.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={collab.influencer.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                        <span className="font-bold text-slate-900">{collab.influencer.handle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                        {collab.campaign.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-700">
                      {totalInt.toLocaleString() || '--'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-bold ${cpe > 0 ? (cpe < 0.5 ? 'text-emerald-600' : 'text-slate-900') : 'text-slate-300'}`}>
                        {cpe > 0 ? `$${cpe.toFixed(2)}` : '--'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-700">
                      {collab.metrics?.sales || '--'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`flex items-center justify-center gap-1 text-sm font-bold ${roi > 0 ? 'text-emerald-600' : (roi < 0 ? 'text-red-500' : 'text-slate-300')}`}>
                        {roi !== 0 && (roi > 0 ? <TrendingUp size={14} /> : null)}
                        {roi !== 0 ? `${roi.toFixed(1)}%` : '--'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      ${collab.cost.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {collabs.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-3">
              <BarChart2 size={48} className="text-slate-200" />
              <p className="text-slate-400 font-medium">目前尚無成效資料</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal icons helper for Stats
import { Heart, ShoppingBag, Users } from 'lucide-react';

export default ReportTable;


import React, { useState } from 'react';
import { Logistics } from '../types';
import { X, Package, Truck, Hash } from 'lucide-react';

interface LogisticsFormProps {
  onClose: () => void;
  onSave: (data: Logistics) => void;
}

const LogisticsForm: React.FC<LogisticsFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Logistics>({
    product: '',
    trackingNo: '',
    deliveryStatus: '待處理'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.product || !formData.trackingNo) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <Package size={24} />
            <h2 className="text-xl font-bold">寄送資訊</h2>
          </div>
          <button onClick={onClose} className="hover:bg-indigo-500 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">產品名稱 *</label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="例如：夏季新品禮盒組"
                  value={formData.product}
                  onChange={e => setFormData({ ...formData, product: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">追蹤編號 *</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                  placeholder="黑貓1234567890"
                  value={formData.trackingNo}
                  onChange={e => setFormData({ ...formData, trackingNo: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">目前狀態</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.deliveryStatus}
                onChange={e => setFormData({ ...formData, deliveryStatus: e.target.value as any })}
              >
                <option value="待處理">待處理</option>
                <option value="運送中">運送中</option>
                <option value="已送達">已送達</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all"
            >
              更新物流資訊
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogisticsForm;

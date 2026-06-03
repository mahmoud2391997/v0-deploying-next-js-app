import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { date: '07 02 2024', value: '1,125,077.29 ج.م', color: '#5F4495' },
  { date: '13 02 2024', value: '4,275,000.00 ج.م', color: '#7B5DB5' },
  { date: '04 02 2024', value: '2,589,000.00 ج.م', color: '#4672A3' },
  { date: '29 01 2024', value: '2,349,000.00 ج.م', color: '#5A8FC4' },
  { date: '31 01 2024', value: '1,200,000.00 ج.م', color: '#3293AC' },
  { date: '14 02 2024', value: '1,250,000.00 ج.م', color: '#4DB0CC' },
  { date: '30 01 2024', value: '1,620,477.27 ج.م', color: '#6B5BA5' },
  { date: 'Rest', value: '26,447,477.29 ج.م', color: '#9CA3AF' },
];

const ProgressBar = () => {
  const totalValue = data.reduce((acc, item) => acc + parseFloat(item.value.replace(/,/g, '').replace(' ج.م', '')), 0);

  return (
    <motion.div
      className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 text-right mb-4">توزيع الإيرادات</h2>
      <div className="flex h-8 w-full overflow-hidden rounded-xl shadow-sm">
        {data.map((item, index) => {
          const widthPercent = (parseFloat(item.value.replace(/,/g, '').replace(' ج.م', '')) / totalValue) * 100;
          return (
            <div
              key={index}
              style={{ width: `${widthPercent}%`, backgroundColor: item.color }}
              className="h-full relative group cursor-pointer transition-all duration-300 hover:brightness-110"
              title={`${item.date}: ${item.value}`}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                {widthPercent.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:shadow-sm transition-shadow">
            <div className="w-4 h-4 rounded-lg shrink-0" style={{ backgroundColor: item.color }} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">{item.date}</p>
              <p className="text-xs text-gray-500 truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressBar;

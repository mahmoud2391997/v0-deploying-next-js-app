import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import ProgressBar from './Dashboards';

const themeColors = {
  purple: '#5F4495',
  blue: '#4672A3',
  green: '#3293AC',
  purpleLight: '#7B5DB5',
  blueLight: '#5A8FC4',
  greenLight: '#4DB0CC',
};

const adoptionData = [
  { month: "سكني", rate: 30 },
  { month: "تجاري", rate: 45 },
  { month: "عقود من الباطن", rate: 55 },
];

const customerAcquisitionData = [
  { channel: 'Organic Search', value: 40 },
  { channel: 'Paid Ads', value: 30 },
  { channel: 'Social Media', value: 20 },
  { channel: 'Email Marketing', value: 10 },
];

const cashFlowData = [
  { month: 'Jan', cashFlow: 10000 },
  { month: 'Feb', cashFlow: 12000 },
  { month: 'Mar', cashFlow: 15000 },
  { month: 'Apr', cashFlow: 18000 },
  { month: 'May', cashFlow: 20000 },
  { month: 'Jun', cashFlow: 25000 },
];

const monthlyRevenueData = [
  { month: 'Jan', units: 5000 },
  { month: 'Feb', units: 7000 },
  { month: 'Mar', units: 9000 },
  { month: 'Apr', units: 12000 },
  { month: 'May', units: 15000 },
];

const CHART_COLORS = [themeColors.purple, themeColors.blue, themeColors.green, themeColors.purpleLight];

const lastMonthRevenue = 15000;
const lastQuarterRevenue = 36000;
const lastYearRevenue = 120000;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-100 text-gray-800 p-3 rounded-xl shadow-lg">
        <p className="font-semibold text-sm text-gray-600 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashBoard = () => {
  return (
    <div className="bg-gray-50 p-6 mt-8 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100 card-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 text-right mb-4">الوحدات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData}>
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="units" stroke={themeColors.purple} strokeWidth={3} dot={{ fill: themeColors.purple, strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100 card-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-gray-800 text-right mb-4">المبلغ المحصل لكل شهر</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cashFlow" fill={themeColors.green} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100 card-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-800 text-right mb-4">قيمة الايجار طبقا للعقود</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={adoptionData}>
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" fill={themeColors.blue} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <ProgressBar />
      </div>
    </div>
  );
};

export default DashBoard;

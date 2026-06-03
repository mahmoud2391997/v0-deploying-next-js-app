'use client';

import dynamic from 'next/dynamic';

const TopBar = dynamic(() => import('@/src/components/TopBar'), {
  ssr: false,
  loading: () => <div className="h-24"></div>,
});

const SideBar = dynamic(() => import('@/src/components/SideBar'), {
  ssr: false,
  loading: () => <div className="w-28"></div>,
});

const ContractPage = dynamic(() => import('@/src/_pages_backup/contracts'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const fields = [
  { name: 'اسم العقار', dataType: 'text', value: 'برج النور' },
  { name: 'اسم المستأجر', dataType: 'text', value: 'أحمد حسن' },
  { name: 'اسم الممثل', dataType: 'text', value: 'محمد علي' },
  { name: 'تاريخ بدء الإيجار', dataType: 'date', value: '2025-01-01' },
  { name: 'تاريخ انتهاء الإيجار', dataType: 'date', value: '2026-01-01' },
  { name: 'عدد دفعات الايجار', dataType: 'number', value: 50000 },
  { name: 'القيمة الاجمالية للدفعة', dataType: 'number', value: 50000 },
];

const navs = {
  contracts: [
    {
      name: 'العقود',
      icon: 'faFileContract',
      statSubtitle: 'Contracts',
      statTitle: '45',
      statArrow: 'up',
      statPercent: 8.2,
      statDescripiron: 'Since last month',
      statIconName: 'faFileContract',
    },
  ],
};

export default function ContractsPage() {
  return (
    
      <div className="relative bg-gray-50 min-h-screen pt-[94px]">
        <TopBar />
        <div className="relative flex">
          <SideBar />
          <main className="flex-1 p-6 mr-28 min-h-[calc(100vh-94px)]">
            <ContractPage fields={fields} navs={navs.contracts} pageTitle="العقود" />
          </main>
        </div>
      </div>
    
  );
}

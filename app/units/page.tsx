'use client';
export const dynamic = 'force-dynamic';

import dynamic from 'next/dynamic';
import TopBar from '@/src/components/TopBar';
import SideBar from '@/src/components/SideBar';

const UnitsPage = dynamic(() => import('@/src/_pages_backup/units'), {
  ssr: false,
});

export default function UnitsListPage() {
  return (
    <div className="relative bg-gray-50 min-h-screen pt-[94px]">
      <TopBar />
      <div className="relative flex">
        <SideBar />
        <main className="flex-1 p-6 mr-28 min-h-[calc(100vh-94px)]">
          <UnitsPage />
        </main>
      </div>
    </div>
  );
}

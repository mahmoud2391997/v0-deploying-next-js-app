'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '@/src/components/TopBar';
import SideBar from '@/src/components/SideBar';

const MainPage = dynamic(() => import('@/src/_pages_backup/main'), {
  ssr: false,
  loading: () => <div className="p-6">Loading...</div>,
});

export default function Page() {
  return (
    <div className="relative bg-gray-50 min-h-screen pt-[94px]">
      <TopBar />
      <div className="relative flex">
        <SideBar />
        <main className="flex-1 p-6 mr-28 min-h-[calc(100vh-94px)]">
          <Suspense fallback={<div>Loading...</div>}>
            <MainPage />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

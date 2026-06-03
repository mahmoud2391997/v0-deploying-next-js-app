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
          <MainPage />
        </main>
      </div>
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';

const TopBar = dynamic(() => import('@/src/components/TopBar'), {
  ssr: false,
});

const SideBar = dynamic(() => import('@/src/components/SideBar'), {
  ssr: false,
});

const PageComponent = dynamic(() => import('@/src/_pages_backup/units'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Page({ params }: { params: { type: string } }) {
  return (
    
      <div className="relative bg-gray-50 min-h-screen pt-[94px]">
        <TopBar />
        <div className="relative flex">
          <SideBar />
          <main className="flex-1 p-6 mr-28 min-h-[calc(100vh-94px)]">
            <PageComponent />
          </main>
        </div>
      </div>
    
  );
}

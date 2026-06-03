'use client';

import TopBar from '@/src/components/TopBar';
import SideBar from '@/src/components/SideBar';
import SingleProperty from '@/src/_pages_backup/properties/singleProperty';

export default function SinglePropertyPage() {
  return (
    <div className="relative bg-gray-50 min-h-screen pt-[94px]">
      <TopBar />
      <div className="relative flex">
        <SideBar />
        <main className="flex-1 p-6 mr-28 min-h-[calc(100vh-94px)]">
          <SingleProperty />
        </main>
      </div>
    </div>
  );
}

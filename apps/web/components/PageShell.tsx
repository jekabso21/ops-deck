'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface PageShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function PageShell({ children, title }: PageShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="dark">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:pl-72">
          <Header onMenuClick={() => setSidebarOpen(true)} title={title} />

          <main className="py-6">
            <div className="px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
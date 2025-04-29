
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbItems?: Array<{label: string, href: string}>;
  showBackButton?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  breadcrumbItems,
  showBackButton = false
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={title} 
          onToggleSidebar={toggleSidebar} 
          sidebarCollapsed={sidebarCollapsed} 
        />
        
        <main className="flex-1 p-4 md:p-6">
          {(breadcrumbItems || showBackButton) && (
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbItems} showBackButton={showBackButton} />
            </div>
          )}
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

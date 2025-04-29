
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Home,
  Building,
  BarChart2,
  FolderOpen,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  collapsed: boolean;
  active: boolean;
}

const NavItem = ({ icon: Icon, label, href, collapsed, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const currentPath = location.pathname;
  
  const mainNavItems = [
    { icon: Home, label: t('sidebar.dashboard'), href: '/dashboard' },
    { icon: Building, label: t('sidebar.companies'), href: '/companies' },
    { icon: BarChart2, label: t('sidebar.valuations'), href: '/valuations' },
    { icon: FolderOpen, label: t('sidebar.portfolios'), href: '/portfolios' },
  ];

  const bottomNavItems = [
    { icon: Users, label: t('sidebar.users'), href: '/users' },
    { icon: Settings, label: t('sidebar.settings'), href: '/settings' },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar h-screen border-r border-sidebar-border transition-all duration-300 flex flex-col relative",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      {/* Toggle button positioned half on sidebar, half outside */}
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="absolute -right-4 top-12 z-50 h-8 w-8 rounded-full border border-sidebar-border bg-background shadow-sm"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>
      
      <div className="p-4 flex items-center justify-center h-16 border-b border-sidebar-border">
        <Link to="/" className="flex items-center">
          {collapsed ? (
            <img src="/lovable-uploads/d1d26cf3-058a-4ddc-8f33-547f69066f5c.png" alt="Fair Value Logo" className="h-8" />
          ) : (
            <img src="/lovable-uploads/cbd6346f-281f-4424-aadb-c2b0ae3d87fc.png" alt="Fair Value Logo" className="h-10" />
          )}
        </Link>
      </div>
      
      {/* Main navigation items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              collapsed={collapsed}
              active={currentPath === item.href || currentPath.startsWith(`${item.href}/`)}
            />
          ))}
        </nav>
      </div>
      
      {/* Bottom navigation section */}
      <div className="border-t border-sidebar-border py-4 px-2">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              collapsed={collapsed}
              active={currentPath === item.href || currentPath.startsWith(`${item.href}/`)}
            />
          ))}
        </nav>
      </div>
      
      {/* User profile section */}
      <div className="border-t border-sidebar-border p-4">
        <Link to="/profile" className={cn(
          "flex items-center gap-3",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            U
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">{t('sidebar.user')}</p>
              <p className="text-xs text-sidebar-foreground/70">usuario@empresa.com</p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

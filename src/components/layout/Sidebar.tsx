
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Building,
  BarChart2,
  FolderOpen,
  Settings,
  Users
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
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

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Building, label: 'Empresas', href: '/companies' },
    { icon: BarChart2, label: 'Valoraciones', href: '/valuations' },
    { icon: FolderOpen, label: 'Portfolios', href: '/portfolios' },
    { icon: Users, label: 'Usuarios', href: '/users' },
    { icon: Settings, label: 'Configuración', href: '/settings' },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar h-screen border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="p-4 flex items-center justify-center h-16 border-b border-sidebar-border">
        <span className={cn(
          "font-semibold text-lg transition-opacity duration-200",
          collapsed ? "opacity-0 hidden" : "opacity-100"
        )}>
          Fair Value
        </span>
        {collapsed && (
          <span className="text-xl font-bold text-primary">FV</span>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
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
      
      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          "flex items-center gap-3",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            U
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">Usuario</p>
              <p className="text-xs text-sidebar-foreground/70">usuario@empresa.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

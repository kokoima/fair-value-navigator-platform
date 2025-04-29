
import React from 'react';
import { Building, BarChart2, FolderOpen, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Index: React.FC = () => {
  // Mock data - would come from API in real application
  const recentActivities = [
    {
      id: '1',
      title: 'Valoración actualizada',
      description: 'La valoración de TechCorp ha sido actualizada',
      timestamp: 'Hace 2 horas',
      type: 'valuation' as const
    },
    {
      id: '2',
      title: 'Nueva empresa añadida',
      description: 'Se ha registrado la empresa Innovatech Solutions',
      timestamp: 'Hace 5 horas',
      type: 'company' as const
    },
    {
      id: '3',
      title: 'Portfolio modificado',
      description: 'Se añadió una nueva empresa al portfolio "Inversiones Tech"',
      timestamp: 'Ayer',
      type: 'portfolio' as const
    },
    {
      id: '4',
      title: 'Usuario invitado',
      description: 'Se ha invitado a carlos@empresa.com a colaborar',
      timestamp: 'Hace 2 días',
      type: 'user' as const
    },
  ];

  return (
    <DashboardLayout title="Dashboard" breadcrumbItems={[{ label: 'Dashboard', href: '/' }]}>
      <div className="space-y-6">
        <WelcomeCard />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Empresas"
            value="24"
            icon={<Building className="h-5 w-5 text-primary" />}
            trend="up"
            trendValue="+4"
            className="animate-fade-in"
          />
          
          <StatCard
            title="Valoraciones"
            value="42"
            icon={<BarChart2 className="h-5 w-5 text-primary" />}
            trend="up"
            trendValue="+7"
            className="animate-fade-in"
          />
          
          <StatCard
            title="Portfolios"
            value="8"
            icon={<FolderOpen className="h-5 w-5 text-primary" />}
            trend="neutral"
            trendValue="0"
            className="animate-fade-in"
          />
          
          <StatCard
            title="Usuarios"
            value="16"
            description="4 administradores, 12 usuarios"
            icon={<Users className="h-5 w-5 text-primary" />}
            className="animate-fade-in"
          />
        </div>
        
        <RecentActivity activities={recentActivities} />
      </div>
    </DashboardLayout>
  );
};

export default Index;

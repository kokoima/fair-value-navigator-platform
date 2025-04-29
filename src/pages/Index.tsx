
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Building2, BarChart4, FolderKanban, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  // Simulando un sistema de autenticación
  // En un caso real, verificaríamos si hay un token o sesión activa
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  useEffect(() => {
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Si no está autenticado, no renderizar el contenido del dashboard
  if (!isAuthenticated) {
    return null;
  }

  // Datos de actividades recientes para el componente RecentActivity
  const recentActivities = [
    {
      id: '1',
      title: 'Empresa Tecnología S.A.',
      description: 'Valoración actualizada',
      timestamp: 'Hace 2 horas',
      type: 'company'
    },
    {
      id: '2',
      title: 'Valoración Q1 2025',
      description: 'Completada por Juan Pérez',
      timestamp: 'Hace 1 día',
      type: 'valuation'
    },
    {
      id: '3',
      title: 'Portfolio Inversiones Tech',
      description: 'Añadida nueva empresa',
      timestamp: 'Hace 3 días',
      type: 'portfolio'
    },
    {
      id: '4',
      title: 'María García',
      description: 'Accedió al sistema',
      timestamp: 'Hace 5 días',
      type: 'user'
    }
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6">
        <WelcomeCard />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Empresas" value="24" description="Total" icon={<Building2 className="h-5 w-5 text-blue-500" />} />
          <StatCard title="Valoraciones" value="89" description="Realizadas" icon={<BarChart4 className="h-5 w-5 text-green-500" />} />
          <StatCard title="Portfolios" value="6" description="Activos" icon={<FolderKanban className="h-5 w-5 text-purple-500" />} />
          <StatCard title="Proyecciones" value="12" description="Mes actual" icon={<TrendingUp className="h-5 w-5 text-amber-500" />} />
        </div>
        <RecentActivity activities={recentActivities} />
      </div>
    </DashboardLayout>
  );
};

export default Index;

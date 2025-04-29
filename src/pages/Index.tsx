
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity from '@/components/dashboard/RecentActivity';

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

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6">
        <WelcomeCard />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Empresas" value="24" description="Total" />
          <StatCard title="Valoraciones" value="89" description="Realizadas" />
          <StatCard title="Portfolios" value="6" description="Activos" />
          <StatCard title="Proyecciones" value="12" description="Mes actual" />
        </div>
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
};

export default Index;

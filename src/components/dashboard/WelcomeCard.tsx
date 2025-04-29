
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomeCard: React.FC = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle>Bienvenido a Fair Value Navigator</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <p>
            Esta plataforma está diseñada para ayudarte a evaluar el valor financiero de empresas
            y administrar portafolios de inversión de manera eficiente y profesional.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <Feature
              title="Valoración de Empresas"
              description="Utiliza métodos probados para determinar el valor justo de cualquier empresa."
              link="/companies"
              linkText="Explorar empresas"
            />
            
            <Feature
              title="Administración de Portfolios"
              description="Organiza tus inversiones y analiza el rendimiento de tu cartera."
              link="/portfolios"
              linkText="Ver portfolios"
            />
            
            <Feature
              title="Reportes Profesionales"
              description="Genera reportes detallados con visualizaciones claras para tus clientes."
              link="/valuations"
              linkText="Crear informe"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface FeatureProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, link, linkText }) => {
  return (
    <div className="p-4 bg-accent rounded-lg border hover-scale">
      <h3 className="font-medium mb-2 text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <Link to={link}>
        <Button variant="link" className="p-0 h-auto gap-1 font-medium">
          {linkText}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default WelcomeCard;


import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const RegisterSuccess = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <CardTitle className="text-2xl mt-4">¡Solicitud Recibida!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p>
          Tu solicitud de acceso ha sido recibida correctamente.
        </p>
        <p className="text-muted-foreground">
          Recibirás una notificación por email cuando tu cuenta sea activada por el administrador.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/login">
          <Button>Volver al inicio de sesión</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterSuccess;

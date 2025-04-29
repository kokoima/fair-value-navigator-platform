
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor ingresa tu email");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulación de envío exitoso
      // En un caso real, aquí haría una llamada a la API para el reset de password
      setTimeout(() => {
        toast.success("Se ha enviado un enlace de recuperación a tu email");
        setIsSubmitted(true);
      }, 1000);
    } catch (error) {
      toast.error("Error al enviar el enlace de recuperación");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Enlace Enviado</CardTitle>
          <CardDescription>
            Hemos enviado un enlace de recuperación a tu email
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Por favor revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
          </p>
          <p className="text-sm text-muted-foreground">
            Si no recibes el email en unos minutos, revisa tu carpeta de spam.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login">
            <Button variant="outline">Volver al inicio de sesión</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
        <CardDescription>
          Introduce tu email para recibir un enlace de recuperación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Enlace"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/login" className="text-sm text-primary hover:underline">
          Volver al inicio de sesión
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;

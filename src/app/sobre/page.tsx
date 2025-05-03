import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function Sobre() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre o Front GMaps</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              O Projeto
            </CardTitle>
            <CardDescription>
              Informações sobre a aplicação Front GMaps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              O <strong>Front GMaps</strong> é uma aplicação desenvolvida com Next.js, TypeScript, 
              Tailwind CSS e Shadcn UI para demonstrar a integração com a API do Google Maps.
            </p>
            <p>
              Esta aplicação permite visualizar mapas, buscar locais e interagir com a API 
              do Google Maps de forma intuitiva e responsiva.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tecnologias Utilizadas</CardTitle>
            <CardDescription>
              Principais ferramentas e bibliotecas usadas no desenvolvimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Next.js:</strong> Framework React com renderização do lado do servidor e geração de sites estáticos.
              </li>
              <li>
                <strong>TypeScript:</strong> Superset de JavaScript que adiciona tipagem estática.
              </li>
              <li>
                <strong>Tailwind CSS:</strong> Framework CSS utilitário para desenvolvimento rápido.
              </li>
              <li>
                <strong>Shadcn UI:</strong> Componentes de interface de usuário reutilizáveis.
              </li>
              <li>
                <strong>API Google Maps:</strong> Para integração com mapas e serviços de localização.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
            <CardDescription>
              Recursos disponíveis na aplicação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visualização de mapas interativos</li>
              <li>Busca de locais e endereços</li>
              <li>Interface responsiva que se adapta a diferentes dispositivos</li>
              <li>Tema claro/escuro (futuramente)</li>
              <li>Salvamento de locais favoritos (futuramente)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
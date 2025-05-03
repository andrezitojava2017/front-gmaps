"use client";

import ListLeads from "@/components/tableListLeads";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//import { useRouter } from "next/navigation";

export default function Home() {
  //const router = useRouter()

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <main className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bem-vindo ao Front GMaps
        </h1>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Pesquisa de Contatos Gmaps</CardTitle>
            <CardDescription>
              Todas suas pesquisas
              <div>
                <ListLeads />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Próximos passos: Integração com a API do Google Maps
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Front GMaps - Aplicação de demonstração</p>
      </footer>
    </div>
  );
}

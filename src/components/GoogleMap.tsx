"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface GoogleMapProps {
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

export function GoogleMap({
  apiKey,
  center = { lat: -23.5505, lng: -46.6333 }, // São Paulo por padrão
  zoom = 12,
  className,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Futura implementação de carregamento da API do Google Maps
    // Por enquanto, apenas simulamos que o mapa foi carregado após 1 segundo
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [apiKey]);

  return (
    <div className={`w-full h-96 relative rounded-md overflow-hidden ${className}`}>
      {!mapLoaded && (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Carregando mapa...</p>
        </div>
      )}
      
      {mapLoaded && !error && (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div ref={mapRef} className="w-full h-full flex items-center justify-center bg-muted/50">
            <p className="text-muted-foreground">
              Mapa simulado - Centro: {center.lat.toFixed(4)}, {center.lng.toFixed(4)} | Zoom: {zoom}
            </p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="w-full h-full bg-destructive/10 flex items-center justify-center p-4">
          <p className="text-destructive text-center">
            Erro ao carregar o mapa: {error}
          </p>
        </div>
      )}
    </div>
  );
} 
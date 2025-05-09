/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { ICompanie } from "@/interface/ICompnie";
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config";
import { checkIsWahtsapp } from "@/api/evolutionapi";
import { useSession } from "next-auth/react";

interface SendMessage {
  mensagem: string;
  timer: number;
}

interface Props {
  totalLeads?: number;
  listLeadsProps?: ICompanie[];
  setListLeadsProps: Dispatch<SetStateAction<ICompanie[] | undefined>>;
}

const SettingSendMessages = ({
  totalLeads,
  listLeadsProps,
  setListLeadsProps,
}: Props) => {
  const { data: session } = useSession();
  const APIKEY = session?.user?.evolutionApiKey || process.env.NEXT_PUBLIC_API_KEY;
  const INSTANCE = session?.user?.instance || process.env.NEXT_PUBLIC_INSTANCE;
  const HOST = process.env.NEXT_PUBLIC_URL_HOST;

  const [totalMessageSent, setTotalMessageSent] = useState<number>(0);
  const [textButton, setTextButton] = useState<string>("Enviar");
  const [stop, setStop] = useState<boolean>(true);
  const [listLeads, setListLeads] = useState<ICompanie[]>();
  const [sendMessage, setSendMessage] = useState<SendMessage>({
    mensagem: "",
    timer: 0,
  });
  const timerIntervalRef = useRef<any>(null);
  const isSendingRef = useRef<boolean>(false);

  const handleStopSend = () => {
    // Interrompe o envio e o temporizador
    isSendingRef.current = false;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setStop(true);
    setTextButton("Enviar");
  };

  const decrementTimer = () => {
    let timer = sendMessage.timer;
    // Limpa qualquer intervalo existente
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    timerIntervalRef.current = setInterval(() => {
      if (timer <= 0 || !isSendingRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        if (!isSendingRef.current) {
          setTextButton("Enviar");
        }
        return;
      }

      timer--;
      setTextButton(`Aguarde... ${timer}s`);
    }, 1000);
  };

  const handleLoopingSend = async () => {
    try {
      let count = 0;

      if (sendMessage.mensagem === null || sendMessage.mensagem === "") {
        alert("mensagem nao informada");
        return;
      }
      if (sendMessage.timer < 20) {
        alert("Timer muito curto, minimo 25 segundos");
        return;
      }

      if (APIKEY === undefined) {
        console.warn("Chave Key nao localizada", APIKEY);
        return;
      }

      if (!listLeadsProps || listLeadsProps.length === 0) {
        alert("Nenhum lead disponível para envio");
        return;
      }

      // Configura o estado para envio
      setStop(false);
      isSendingRef.current = true;

      // Cria uma cópia local da lista de leads para trabalhar com ela durante o loop
      let localLeadsList = [...listLeadsProps];

      for (let i = 0; i < localLeadsList.length; i++) {
        const lead = localLeadsList[i];

        // Pula leads que já foram enviados
        if (lead.status === "Enviado") {
          continue;
        }

        // Verifica se o envio foi interrompido
        if (!isSendingRef.current) {
          break;
        }

        // Aguarda o tempo configurado antes de processar o próximo telefone
        decrementTimer();
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            if (isSendingRef.current) {
              resolve(true);
            }
            clearTimeout(timeout);
          }, sendMessage.timer * 1000);
        });

        // Verifica novamente se o envio foi interrompido
        if (!isSendingRef.current) {
          break;
        }

        // Tenta enviar a mensagem
        try {
          // antes de enviar a mensagem é verificado se o numero é whatsapp
          const response = await checkIsWahtsapp(lead.phone);
          const exists = await response.json();

          if (exists[0].exists) {
            await fetchSend(lead.phone);

            // Atualiza localmente o status do lead atual
            localLeadsList[i] = { ...lead, status: "Enviado" };

            // Atualiza o estado global com a lista atualizada
            setListLeadsProps([...localLeadsList]);

            count++;
            setTotalMessageSent(count);
            continue;
          }

          // Atualiza localmente o status do lead atual
          localLeadsList[i] = { ...lead, status: "Invalido" };

          // Atualiza o estado global com a lista atualizada
          setListLeadsProps([...localLeadsList]);

        } catch (error) {
          console.warn(`Erro ao enviar mensagem para ${lead.phone}:`, error);
          // Continua para o próximo lead em caso de erro
        }
      }

      // Se o processo terminou naturalmente (não foi interrompido)
      if (isSendingRef.current) {
        isSendingRef.current = false;
        setStop(true);
        setTextButton("Enviar");
      }
    } catch (error) {
      console.warn("Erro ao enviar mensagens", error);
      isSendingRef.current = false;
      setStop(true);
      setTextButton("Enviar");
    }
  };

  const fetchSend = async (phone: string) => {
    setTextButton("Enviando mensagem...");
    try {
      const url = `${HOST}/message/sendText/${INSTANCE}`;
      const opt = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: `${APIKEY}`, // Usa a chave da sessão autenticada
        },
        body: JSON.stringify({ number: phone, text: sendMessage.mensagem }),
      };

      const rs = await fetch(url, opt);
      if (rs.ok) {
        const data = await rs.json();
        console.log("response whats", data);
        // Removemos a chamada para handleAlterStatus pois agora atualizamos
        // o status diretamente no loop
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw error;
    }
  };

  // Limpa o intervalo ao desmontar o componente
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (listLeadsProps) {
      setListLeads(listLeadsProps);
    }
  }, [listLeadsProps]);

  return (
    <>
      <aside className=" w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Configuração da mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Mensagem</Label>
              <Textarea
                placeholder="Sua mensagem aqui"
                onChange={(e) =>
                  setSendMessage({ ...sendMessage, mensagem: e.target.value })
                }
              ></Textarea>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Label>Tempo de espera</Label>
              <Input
                type="number"
                value={sendMessage?.timer}
                placeholder="em segundos"
                onChange={(e) => {
                  setSendMessage({
                    ...sendMessage,
                    timer: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div className=" mt-2.5">
              <Button
                disabled={!stop}
                variant={"default"}
                className="bg-cyan-600 w-full"
                onClick={handleLoopingSend}
              >
                {textButton}
              </Button>

              <Button
                hidden={stop}
                variant={"destructive"}
                className="w-full"
                onClick={handleStopSend}
              >
                Parar
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>

      <aside className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around">
            <div className="flex flex-col bg-blue-300 p-5 rounded-2xl">
              <span>Total</span>
              <span className="text-4xl">{totalLeads || 0}</span>
            </div>

            <div className="flex flex-col bg-blue-300 p-5 rounded-2xl">
              <span>Enviados</span>
              <span className="text-4xl text-center">{totalMessageSent}</span>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  );
};

export default SettingSendMessages;

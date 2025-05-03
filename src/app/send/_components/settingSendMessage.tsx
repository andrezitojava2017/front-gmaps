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
import { useState } from "react";

interface SendMessage {
  mensagem: string;
  timer: number;
}

interface Props {
  totalLeads: number;
}

const SettingSendMessages = ({ totalLeads }: Props) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const [totalMessageSent, setTotalMessageSent] = useState<number>(0);
  const [textButton, setTextButton] = useState<string>("Enviar");
  const [sendMessage, setSendMessage] = useState<SendMessage>({
    mensagem: "",
    timer: 0,
  });

  const decrementTimer = () => {
    let timer = 30;
    let interva: any;
    interva = setInterval(() => {
      if (timer <= 0) {
        clearInterval(interva);
        timer=30;
        return
      }

      timer--;
      setTextButton(`Aguarde... ${timer}s`);
    }, 1000);
  };

  const fetchSend = async (phone: string) => {
    setTextButton("Enviando mensagem...");
    try {
      const url = "https://evlapi.jsinovatech.com.br/message/sendText/pessoal";
      const opt = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: `${apikey}`, // Inclui a API Key no cabeçalho
        },
        body: JSON.stringify({ number: phone, text: sendMessage.mensagem }),
      };

      const rs = await fetch(url, opt);
      const data = await rs.json();
      console.log("response whats", data);
    } catch (error) {
      throw error;
    }
  };

  const handleLoopingSend = async () => {
    try {
      let count = 0;
      const arrayOfPhones = ["5566981012229","5566981012229","5566981012229"];

      if (sendMessage.mensagem === null || sendMessage.mensagem === "") {
        alert("mensagem nao informada");
        return;
      }
      if (sendMessage.timer < 20) {
        alert("Timer muito pequeno, minimo 25 segundos");
        return;
      }

      if (apikey === undefined) {
        console.warn("api key nao localizada", apikey);
        return;
      }
      for (const phone of arrayOfPhones) {
        // Aguarda 30 segundos antes de processar o próximo telefone
        await new Promise((resolve) => {
          decrementTimer()
          setTimeout(resolve, 30000);
        });
        await fetchSend(phone);
        count++;
        setTotalMessageSent(count);
      }
      setTextButton("Enviar");
    } catch (error) {
      console.warn("Erro ao enviar mensagens", error);
    }
  };

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
                onChange={(e) =>
                  setSendMessage({
                    ...sendMessage,
                    timer: parseInt(e.currentTarget.value),
                  })
                }
              />
            </div>
            <div className=" mt-2.5">
              <Button
                variant={"default"}
                className="bg-cyan-600 w-full"
                onClick={handleLoopingSend}
              >
                {textButton}
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

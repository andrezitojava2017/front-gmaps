"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { getListContactsOfLeads } from "@/api/empresas";
import { useSearchParams } from "next/navigation";
import { ICompanie } from "@/interface/ICompnie";
import SettingSendMessages from "./settingSendMessage";

const List = () => {
  const [listContacts, setListContacts] = useState<ICompanie[] | undefined>();
  const searchParams = useSearchParams();
  const desc = searchParams.get("desc");
  const cidade = searchParams.get("cidade");

  /**
   * recupera a lista de contatos do tipo escolhido
   */
  const loadingContactsLeads = async () => {
    try {
      const rs = await getListContactsOfLeads(desc!, cidade!);

      if (rs.length !== 0) {
        // console.log("list", rs);
        setListContacts(rs);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    loadingContactsLeads();
    /*
    setListContacts([
      {
        cidade: "são jose do xingu",
        id: 1,
        descricao: "Jd Andre",
        phone: "5566981012229855",
        title: "Inovatech",
      },
      {
        cidade: "são jose do xingu",
        id: 2,
        descricao: "Jd Andre",
        phone: "5566981119366",
        title: "Inovatech",
      },
    ]);
    */
  }, []);

  return (
    <main className="flex gap-6 item pt-3.5 justify-center">
      <aside>
        <Card className="max-h-[600px]">
          <CardHeader>
            <CardTitle>Leads Extraídos</CardTitle>
            <CardDescription>contatos para envio em massa</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div>
              <Table>
                <TableCaption>Leads extraidos</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listContacts?.map((el) => {
                    return (
                      <TableRow key={el.id}>
                        <TableCell className="font-medium">{el.id}</TableCell>
                        <TableCell>
                          <div className="rounded-2xl outline-1 outline-offset-2  pl-2.5 ring-1 ring-blue-400 ">
                            {el.phone}
                          </div>
                        </TableCell>
                        <TableCell className="font-light">{el.title}</TableCell>
                        <TableCell className="font-light">
                          {el.descricao}
                        </TableCell>
                        <TableCell className="font-light">
                          {el.cidade}
                        </TableCell>
                        
                          <TableCell className={`${el.status !== "Enviado" ? "text-red-500" : "text-green-500"}`}>
                            {el.status}
                          </TableCell>
                       
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </aside>
      <div className="flex flex-col gap-4">
        <SettingSendMessages
          totalLeads={listContacts?.length}
          listLeadsProps={listContacts}
          setListLeadsProps={setListContacts}
        />
      </div>
    </main>
  );
};

export default List;

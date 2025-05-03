"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

type Companie = {
  id: number;
  descricao: string;
  cidade: string;
  phone: string;
};

interface Props {
  setTotalLeads: React.Dispatch<React.SetStateAction<number>>;
}

const List = ({ setTotalLeads }: Props) => {
  const [listContacts, setListContacts] = useState<Companie[] | undefined>();
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
        setListContacts(rs);
        setTotalLeads(rs.length);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  
  useEffect(() => {
    loadingContactsLeads();
  }, []);

  return (
    <Card className="w-full max-h-[600px]">
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
                    <TableCell>{el.descricao}</TableCell>
                    <TableCell>{el.cidade}</TableCell>

                    <TableCell className="text-blue-500">-</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default List;

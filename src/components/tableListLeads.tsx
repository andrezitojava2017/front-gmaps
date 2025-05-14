/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { loadListAllLeads } from "@/api/empresas";
import { formatDate } from "@/utils/format";
import { useRouter } from "next/navigation";

type Search = {
  descricao: string;
  cidade: string;
  data_captura: string;
};

const ListLeads = () => {
  const [gmapsList, setGmapsList] = useState<Search[] | undefined>();
  const route = useRouter();

  const loadList = async () => {
    try {
      const rs = await loadListAllLeads();
      setGmapsList(rs);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleRedirectPageSend = (desc: string, cidade: string) => {
    route.push(`/send?desc=${desc}&cidade=${cidade}`);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <Table>
      <TableCaption>Leads extraidos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Evento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gmapsList?.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{formatDate(item.data_captura)}</TableCell>
            <TableCell>{item.descricao}</TableCell>
            <TableCell>{item.cidade}</TableCell>
            <TableCell>
              <Button
                className="bg-cyan-600"
                onClick={() =>
                  handleRedirectPageSend(item.descricao, item.cidade)
                }
              >
                Carregar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListLeads;

"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import SettingSendMessages from "@/app/send/_components/settingSendMessage";
import List from "./_components/list";
import { useState } from "react";

const Send = () => {
  const [totalContacts, setTotalContacts] = useState<number>(0);

  return (
    <div className="flex gap-6 item pt-3.5 justify-center">
      <main className="flex  w-[800px]">
        <List setTotalLeads={setTotalContacts} />
      </main>

      <div className="flex flex-col gap-4">
        <SettingSendMessages totalLeads={totalContacts} />
      </div>
    </div>
  );
};

export default Send;

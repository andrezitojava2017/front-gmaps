
/* eslint-disable @typescript-eslint/no-unused-vars */

import SettingSendMessages from "@/app/send/_components/settingSendMessage";
import List from "./_components/list";
import { useEffect, useState } from "react";
import { ICompanie } from "@/interface/ICompnie";

const Send = () => {

  return (
 
      <div className="flex gap-6 item pt-3.5 justify-center">
        <main >
          <List />
        </main>
{/*
        <div className="flex flex-col gap-4">
          <SettingSendMessages totalLeads={totalContacts} listLeadsProps={listLeads!} />
        </div>
        */
}
      </div>
   

  );
};

export default Send;

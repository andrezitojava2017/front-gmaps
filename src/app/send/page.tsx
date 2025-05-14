import { Suspense } from "react";
import List from "./_components/list";

const Send = () => {
  return (
    <div className="flex gap-6 item pt-3.5 justify-center">
      <main>
        <Suspense>
          <List />
        </Suspense>
      </main>
      {/*
        <div className="flex flex-col gap-4">
          <SettingSendMessages totalLeads={totalContacts} listLeadsProps={listLeads!} />
        </div>
        */}
    </div>
  );
};

export default Send;

import { createClient } from "@supabase/supabase-js";
import React from "react";
import Cat, { CatData } from "../../common/models/cat";

export default async function App() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: cats } = await supabase.from("gatos").select("*");

  return (
    <div>
      {cats?.map((catData, index) => {
        const dict = Cat.fromDict(catData as CatData).asDict();

        return <p key={index}>{JSON.stringify(dict)}</p>;
      })}
    </div>
  );
}

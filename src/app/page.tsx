"use client";

import { getAllCats, streamCats } from "@/common/services/cats_service";
import Cat from "@/common/models/cat";
import { use, useEffect, useState } from "react";
import { getDatabaseBrowserClient } from "@/common/supabase/client";
import { init } from "next/dist/compiled/webpack/webpack";
import { RealtimeChannel } from "@supabase/supabase-js";

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    const database = getDatabaseBrowserClient();
    let subscription: RealtimeChannel | null = null;

    const getInitialCats = async () => {
      try {
        // Convert initial data to Cat objects and pass to callback
        const initialCats = await getAllCats(database);
        setCats(initialCats);

        // Start streaming cats after initial data is set
        subscription = streamCats(
          database,
          initialCats,
          (currentCats: Cat[]) => {
            setCats(currentCats);
          }
        );
      } catch (err) {
        console.error("Error fetching initial cats data:", err);
      }
    };

    getInitialCats();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <div>
      <h1>Cats</h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            {cat.name} - {cat.sex} - {cat.status} - {cat.distinctiveFeatures}
          </li>
        ))}
      </ul>
      {/* You could add forms or buttons to add/update/delete cats here */}
    </div>
  );
}

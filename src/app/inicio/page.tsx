// "use client";

// import { createClient, RealtimeChannel } from "@supabase/supabase-js";
// import { useEffect, useState } from "react";
// import { getAllCats } from "@/common/services/cats_service";
// import Gato from "@/common/models/gato";

// export default async function App() {
//   const [cats, setCats] = useState<Gato[]>([]);
//   const [subscription, setSubscription] = useState<RealtimeChannel | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     async function subscribeToCats() {
//       try {
//         // Set up the realtime subscription
//         const subscription = await getAllCats((currentCats) => {
//           setCats(currentCats);
//         });
// a
//         setSubscription(subscription);
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error("Unknown error"));
//         setLoading(false);
//       }
//     }

//     subscribeToCats();

//     // Clean up the subscription when the component unmounts
//     return () => {
//       if (subscription) {
//         subscription.unsubscribe();
//       }
//     };
//   }, []);

//   if (loading) return <div>Loading cats...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Cats</h1>
//       <ul>
//         {cats.map((cat) => (
//           <li key={cat.id}>
//             {cat.name} - {cat.sex} - {cat.status}
//           </li>
//         ))}
//       </ul>
//       {/* You could add forms or buttons to add/update/delete cats here */}
//     </div>
//   );
// }

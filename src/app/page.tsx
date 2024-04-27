"use client";
import Drop_down from "@/components/drop-down";
import { useEffect, useState } from "react";
import { fetchSeasons } from "@/services/homeService";

export default function Home() {
  const [seasons, setSeasons] = useState<any[]>([]);

  useEffect(() => {
    fetchSeasons().then((data) => setSeasons(data));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5">
      <h1 className="text-5xl font-bold">NHL Stats Summary</h1>
      <div className="pt-5">
        <Drop_down type="Year" options={seasons} />
      </div>
    </main>
  );
}

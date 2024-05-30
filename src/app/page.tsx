"use client";
import Drop_down from "@/components/drop-down";
import { useEffect, useState } from "react";
import { fetchSeasons, fetchTeams } from "@/services/homeService";
import { Spinner } from "flowbite-react";

export default function Home() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSeasons(), fetchTeams()]).then(
      ([seasonsData, teamsData]) => {
        setSeasons(seasonsData);
        setTeams(teamsData.data);
        setFilteredTeams(teamsData.data);
        setLoading(false);
      },
    );
  }, []);

  const handleSelect = (value: any) => {
    let season = Number(value);
    if (!isNaN(season)) {
      const newFilteredTeams = teams.filter((team) => {
        if (
          !isNaN(season) &&
          team.firstSeason.id <= season &&
          (team.lastSeason === null || team.lastSeason.id >= season)
        ) {
          return team;
        }
      });
      setFilteredTeams(newFilteredTeams);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner aria-label="Loading" size="xl" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5">
      <h1 className="text-5xl font-bold">NHL Stats Summary</h1>
      <div className="pt-5 flex flex-col space-y-4 w-full sm:w-auto sm:flex-row sm:space-x-10 sm:items-end">
        <Drop_down type="Year" options={seasons} onSelect={handleSelect} />
        <Drop_down
          type="Season"
          options={["Regular Season", "Playoffs"]}
          onSelect={handleSelect}
        />
        <Drop_down
          type="Team"
          options={filteredTeams}
          onSelect={handleSelect}
        />
      </div>
    </main>
  );
}

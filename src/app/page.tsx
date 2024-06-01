"use client";
import Drop_down from "@/components/drop-down";
import { useEffect, useState } from "react";
import {
  fetchSeasons,
  fetchSkaterPoints,
  fetchTeams,
} from "@/services/homeService";
import { Button, Spinner } from "flowbite-react";
import Stats_card from "@/components/stats-card";
import { GameTypes } from "@/constants/gameTypes";

export default function Home() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [skaterPoints, setSkaterPoints] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSeasons(), fetchTeams()]).then(
      ([seasonsData, teamsData]) => {
        setSeasons(seasonsData);
        setTeams(teamsData.data);
        setFilteredTeams(teamsData.data);
        fetchSkaterPoints(
          seasonsData[seasonsData.length - 1],
          GameTypes.REGULAR_SEASON,
        ).then((skaterPointsData) => {
          setSkaterPoints(skaterPointsData.data);
          setLoading(false);
        });
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
      setSelectedYear(value);
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
    <main className="flex min-h-screen flex-col items-center justify-start m-5">
      <h1 className="text-5xl font-bold">NHL Stats Summary</h1>
      <div className="mt-5 flex flex-col space-y-4 w-full sm:w-auto sm:flex-row sm:space-x-10 sm:items-end">
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
        <Button color="blue">Search</Button>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold">Skaters</h2>
      </div>
      <div className="flex flex-wrap flex-row justify-center">
        <Stats_card type="Points" data={skaterPoints}></Stats_card>
        {/* <Stats_card></Stats_card>
        <Stats_card></Stats_card> */}
      </div>
    </main>
  );
}

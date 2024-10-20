"use client";
import Drop_down from "@/components/drop-down";
import { useEffect, useState } from "react";
import {
  fetchSeasons,
  fetchSkaterGoals,
  fetchSkaterPoints,
  fetchTeams,
} from "@/services/homeService";
import { Button, Spinner } from "flowbite-react";
import Stats_card from "@/components/stats-card";
import { GameTypes } from "@/constants/gameTypes";

export default function Home() {
  // Dropdown Options
  const [seasons, setSeasons] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);

  // Dropdown Selections
  const [selectedYear, setSelectedYear] = useState<any>(null);
  const [selectedGameType, setSelectedGameType] = useState<string>(
    GameTypes.REGULAR_SEASON,
  );
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  // Loading States
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  // Skater Stats
  const [skaterPoints, setSkaterPoints] = useState<any[]>([]);
  const [skaterGoals, setSkaterGoals] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([fetchSeasons(), fetchTeams()]).then(
      ([seasonsData, teamsData]) => {
        setSeasons(seasonsData);
        setTeams(teamsData.data);
        const newFilteredTeams = filterTeams(
          teamsData.data,
          seasonsData[seasonsData.length - 1],
        );
        setFilteredTeams(newFilteredTeams);
        fetchSkaterPoints(
          seasonsData[seasonsData.length - 1],
          GameTypes.REGULAR_SEASON,
        ).then((skaterPointsData) => {
          setSkaterPoints(skaterPointsData.data);
        });
        fetchSkaterGoals(
          seasonsData[seasonsData.length - 1],
          GameTypes.REGULAR_SEASON,
        ).then((skaterGoalsData) => {
          setSkaterGoals(skaterGoalsData.data);
        });
        setLoading(false);
      },
    );
  }, []);

  const filterTeams = (teamsData: any[], season: number) => {
    return teamsData.filter((team: any) => {
      if (
        team.firstSeason.id <= season &&
        (team.lastSeason === null || team.lastSeason.id >= season)
      ) {
        return team;
      }
    });
  };

  const handleSelect = (value: any) => {
    let season = Number(value);
    if (!isNaN(season) && season.toString().length === 8) {
      const newFilteredTeams = filterTeams(teams, season);
      setSelectedYear(value);
      setFilteredTeams(newFilteredTeams);
    }

    let team = Number(value);
    if (!isNaN(team) && team.toString().length != 8) {
      setSelectedTeam(value);
    }

    if (value === "Regular Season") {
      setSelectedGameType(GameTypes.REGULAR_SEASON);
    } else if (value === "Playoffs") {
      setSelectedGameType(GameTypes.PLAYOFF);
    }
  };

  const handleSearch = () => {
    setSearchLoading(true);

    Promise.all([
      fetchSkaterPoints(selectedYear, selectedGameType, selectedTeam),
      fetchSkaterGoals(selectedYear, selectedGameType, selectedTeam),
    ])
      .then(([skaterPointsData, skaterGoalsData]) => {
        setSkaterPoints(skaterPointsData.data);
        setSkaterGoals(skaterGoalsData.data);
        setSearchLoading(false);
      })
      .catch(() => {
        setSearchLoading(false);
      });
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
      <div className="mt-5 flex flex-col space-y-4 w-full md:w-auto md:flex-row md:space-x-5 md:items-end">
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
        <Button color="blue" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {searchLoading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Spinner aria-label="Loading" size="xl" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <>
          <div className="mt-10 mb-5">
            <h2 className="text-3xl font-bold">Skaters</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Stats_card type="Points" data={skaterPoints}></Stats_card>
            <Stats_card type="Goals" data={skaterGoals}></Stats_card>
          </div>
        </>
      )}
    </main>
  );
}

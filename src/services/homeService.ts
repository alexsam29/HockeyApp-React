"use server";
const WEB_API_URL = "https://api-web.nhle.com";
const STATS_API_URL = "https://api.nhle.com";

export async function fetchSeasons() {
  const response = await fetch(`${WEB_API_URL}/v1/season`);
  const data = await response.json();
  return data;
}

export async function fetchTeams() {
  const response = await fetch(
    `${STATS_API_URL}/stats/rest/en/franchise?sort=fullName&include=lastSeason.id&include=firstSeason.id`,
  );
  const data = await response.json();
  return data;
}

export async function fetchSkaterPoints(
  year: string,
  gameType: string,
  team: string = "",
) {
  const teamQuery = team ? `%20and%20team.franchiseId=${team}` : "";
  const response = await fetch(
    `${STATS_API_URL}/stats/rest/en/leaders/skaters/points?cayenneExp=season=${year}%20and%20gameType=${gameType}${teamQuery}`,
  );
  const data = await response.json();
  return data;
}

export async function fetchSkaterGoals(
  year: string,
  gameType: string,
  team: string = "",
) {
  const teamQuery = team ? `%20and%20team.franchiseId=${team}` : "";
  const response = await fetch(
    `${STATS_API_URL}/stats/rest/en/leaders/skaters/goals?cayenneExp=season=${year}%20and%20gameType=${gameType}${teamQuery}`,
  );
  const data = await response.json();
  return data;
}

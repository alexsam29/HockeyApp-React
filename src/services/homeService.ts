"use server";
const API_URL = "https://api-web.nhle.com/v1";

export async function fetchSeasons() {
  const response = await fetch(`${API_URL}/season`);
  const data = await response.json();
  return data;
}

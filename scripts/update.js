async function UpdateStuff() {
  try {
    const response = await fetch("https://corsproxy.io/?https://games.roblox.com/v1/games?universeIds=7358805202");
    const data = await response.json();
    const playing = data.data[0].playing;
    document.getElementById("players").textContent = ` ${playing}`;
  } catch (error) {
    document.getElementById("players").textContent = "ERROR";
    console.error("Fetch error:", error);
  }
}

UpdateStuff();
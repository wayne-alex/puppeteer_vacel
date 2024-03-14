const fetch = require("node-fetch");

async function search(query) {
  try {
    const response = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search result");
    }

    const data = await response.json();
    console.log("Search Result:", data.title);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Example usage
const query = "Trump";
search(query);

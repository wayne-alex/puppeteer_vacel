// server.js

const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/search", async (req, res) => {
  const { query } = req.body;

  try {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: "shell" });
    const page = await browser.newPage();

    // Navigate to Google and perform the search
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`
    );

    // Wait for the search results to load
    await page.waitForSelector("h3");

    // Extract the title of the first search result
    const title = await page.evaluate(() => {
      const firstResult = document.querySelector("h3");
      return firstResult.textContent;
    });

    // Close the browser
    await browser.close();

    // Return the title as the response
    res.json({ title });
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

app.get("/", (req, res) => {
  res.send("<h3>The service is working as expected</h3>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

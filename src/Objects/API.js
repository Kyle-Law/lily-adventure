import "regenerator-runtime";

// global variables
const key = "lily-adventure-api-key";
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

const API = (() => {
  async function getScores() {
    try {
      const scores = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return scores.json();
    } catch (error) {
      return error.json();
    }
  }

  async function postScores(name, score) {
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: name,
          score,
        }),
      });

      return result.json();
    } catch (error) {
      return error.json();
    }
  }

  return { getScores, postScores };
})();

export default API;

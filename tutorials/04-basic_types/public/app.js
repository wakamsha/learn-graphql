window.addEventListener('load', async () => {
  const query = `
    query RollDice {
      quoteOfTheDay
      random
      rollThreeDice
    }
  `;

  const result = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  document.querySelector('#result').textContent = JSON.stringify(await result.json(), null, 2);
});

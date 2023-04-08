window.addEventListener('load', async () => {
  const dice = 4;
  const sides = 8;

  const query = `
  query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
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
      variables: { dice, sides },
    }),
  });

  document.querySelector('#result').textContent = JSON.stringify(await result.json(), null, 2);
});

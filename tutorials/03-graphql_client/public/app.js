window.addEventListener('load', async () => {
  const dice = 3;
  const sides = 6;

  // dice と sides を変数として渡すために
  // `$dice` と `$sides` を指定してクエリを作成する。
  const query = `
    query RollDice($dice: Int!, $sides: Int) {
      rollDice(numDice: $dice, numSides: $sides)
    }
  `;

  const result = await fetch('http://localhost:4000/graphql', {
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

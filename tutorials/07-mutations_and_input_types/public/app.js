window.addEventListener('load', async () => {
  const author = 'andy';
  const content = 'hope is a good thing';

  const query = `
    mutation CreateMessage($input: MessageInput!) {
      createMessage(input: $input) {
        id
        author
        content
      }
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
      variables: {
        input: {
          author,
          content,
        },
      },
    }),
  });

  document.querySelector('#result').textContent = JSON.stringify(await result.json(), null, 2);
});

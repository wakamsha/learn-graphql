// import { Provider, useQuery, createClient, cacheExchange, fetchExchange } from 'urql';
// import { User } from "../../../src/queries/user";

// export const App = () => {
//   const client = createClient({
//     url: 'http://localhost:4000/graphql1',
//     exchanges: [cacheExchange, fetchExchange],
//   });

//   return (
//     <Provider value={client}>
//       <Presentation />
//     </Provider>
//   );
// }

// const Presentation = () => {
//   const [{ data, fetching, error }] = useQuery({
//     query: User,
//   });

//   if (fetching) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Oh no... {error.message}</p>;
//   }

//   return (
//     <pre>
//       <code>{JSON.stringify(data, null, 2)}</code>
//     </pre>
//   )
// }
export const App = () => <h1>hello world</h1>;

import { buildSchema, graphql } from 'graphql';

// Query 型で schema を定義する
// 文字列を返す `hello` という API を定義してる。
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// query を処理する resolver を定義する
const rootValue = {
  hello: () => 'hello world!',
};

const main = async () => {
  const query = `{ hello }`;

  // query を実行する
  const response = await graphql({
    schema,
    source: query,
    rootValue,
  });

  console.info(response);
};

main();

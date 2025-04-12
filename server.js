const express = require("express");
const app = express();
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen("4000", () => {
  console.log(`Listening on port 4000`);
});

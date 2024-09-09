# WatermelonDB with Next.js

This is an example of how to use [WatermelonDB](https://watermelondb.dev/docs) with [Next.js](https://nextjs.org/).
An optional backend for this example can be found [here](https://github.com/UrsDeSwardt/watermelondb-backend-example).
Some non-obvious things are done in this example that is not explained in the docs:

- We have to implement a custom `DatabaseProvider`. The provider is defined in `db-provider.tsx` and used in the root `layout.tsx`.
- We have make use of hooks to access the database, otherwise the observability does not work.

## Running the example

```bash
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the example in action.

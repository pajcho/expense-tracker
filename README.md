## Expense Tracker

This is Expense tracking [Next.js](https://nextjs.org/) project hosted on [Vercel](https://vercel.com/) using [PlanetScale](https://planetscale.com/) database with [Prisma ORM](https://www.prisma.io/)

- GitHub with code examples is [HERE](https://github.com/leerob/leerob.io/blob/main/pages/api/views/index.ts)
- PlanetScale + Prisma + Next.js tutorial is [HERE](https://planetscale.com/blog/how-to-setup-next-js-with-prisma-and-planetscale)
- Prisma docs are [HERE](https://www.prisma.io/docs/concepts/components/prisma-client)

### Useful PlanetScale commands

- Open local connection
  - `pscale connect YOUR-DB-NAME-HERE main --port 3309`
- Connect to mysql shell
  - `pscale shell YOUR-DB-NAME-HERE main` (_You can exit the MySQL shell by typing `exit` and hitting enter._)
- Promote branch to production
  - `pscale branch promote YOUR-DB-NAME-HERE main`
- Install PlanetScale CLI by following [these steps](https://planetscale.com/docs/concepts/planetscale-environment-setup)
- Enable safe migrations
  - `pscale branch safe-migrations enable YOUR-DB-NAME-HERE main`

### Making changes to the database

Step-by-step tutorial is [HERE](https://planetscale.com/docs/prisma/automatic-prisma-migrations#execute-succeeding-prisma-migrations-in-planetscale)

1. Create a new development branch from main called `add-subtitle`:
   - `pscale branch create YOUR-DB-NAME-HERE add-subtitle`
2. Close the proxy connection to your `main` branch (if still open) and connect to the new `add-subtitle` development branch:
   - `pscale connect YOUR-DB-NAME-HERE add-subtitle --port 3309`
3. In the prisma/schema.prisma file, update the model:
   - Add a new subtitle field:
   - `subtitle String @db.VarChar(255)`
4. Run db push again to update the schema in PlanetScale:
   - `npx prisma db push`
5. Open a deploy request for your `add-subtitle` branch, so that you can deploy these changes to main.
   - You can complete the deploy request either in the web app or with the `pscale deploy-request` command.
   - `pscale deploy-request create YOUR-DB-NAME-HERE add-subtitle`
   - `pscale deploy-request deploy YOUR-DB-NAME-HERE 1`

### Useful Prisma commands

- Re-generate prisma client with every schema change
  - `prisma generate`
- Push prisma changes inside `prisma.schema` to PlanetScale with
  - `npx prisma db push`
- Run prisma studio in browser
  - `npx prisma studio` (Opens up in a new browser tab http://localhost:5555/)

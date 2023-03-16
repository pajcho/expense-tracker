import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Expense Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-0">
        <h1 className="mb-3 text-2xl">Expense Tracker</h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere iusto
        quidem quo. Dolorum inventore itaque laudantium, maxime mollitia porro
        praesentium quas quibusdam ratione repellendus, similique sint ullam
        vel. Ducimus, exercitationem!
      </main>
    </>
  );
}

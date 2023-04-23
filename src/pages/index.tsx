import Head from 'next/head';
import { CategoryModel } from '@/models/category.model';
import { ExpenseTable } from '@/components/expenseTable';

export default function Home() {
  const categories: CategoryModel[] = [
    {
      id: '1',
      name: 'Food',
      projected: 40000,
      expenses: [
        { id: '1-1', name: 'Drinks and snacks', actual: 4000, categoryId: '1', date: '2023-03-14 18:56:43' },
        {
          id: '1-2',
          name: 'Getting all for the week in Tempo',
          actual: 24000,
          categoryId: '1',
          date: '2023-03-14 18:56:43',
        },
        { id: '1-3', name: 'Shop & Go', actual: 4000, categoryId: '1', date: '2023-03-14 18:56:43' },
      ],
    },
    {
      id: '2',
      name: 'Transportation',
      projected: 12000,
      expenses: [
        { id: '2-1', name: 'Fuel fill up', actual: 8000, categoryId: '2', date: '2023-03-14 18:56:43' },
        { id: '2-2', name: 'Trip to Uzice', actual: 4320, categoryId: '2', date: '2023-03-14 18:56:43' },
      ],
    },
    {
      id: '3',
      name: 'Sports',
      projected: 1200,
      expenses: [
        {
          id: '3-1',
          name: 'New price for swimming class',
          actual: 4000,
          categoryId: '3',
          date: '2023-03-14 18:56:43',
        },
      ],
    },
    {
      id: '4',
      name: 'Mortgage',
      projected: 120000,
      expenses: [],
    },
  ];

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Expense Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-0">
        <ExpenseTable categories={categories} />
      </main>
    </>
  );
}

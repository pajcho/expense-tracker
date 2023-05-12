import Head from 'next/head';
import { ExpenseTable } from '@/components/expenseTable';
import React from 'react';

export default function Home() {
  const [categories, setCategories] = React.useState([]);

  const fetchCategories = () => {
    fetch(`/api/category`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log('Error loading categories!!', error);
      });
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

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

import { money } from '@/utils/money';
import React from 'react';
import { CategoryModel } from '@/models/category.model';

export function ExpenseTotal({ categories }: { categories: CategoryModel[] }) {
  // Until we figure out how to implement this on the category level
  const projected = 0;
  const amount = categories.reduce((amount, category) => {
    return (
      amount +
      category.expenses.reduce((sum, expense) => {
        return sum + expense.amount;
      }, 0)
    );
  }, 0);

  return (
    <tr className="font-semibold text-gray-900 dark:bg-gray-700 dark:text-white">
      <th scope="row" className="py-3 pl-6 text-base [&:last-child]:pr-6">
        Total
      </th>
      <td className="py-3 pl-6 text-right [&:last-child]:pr-6">{money(projected)}</td>
      <td className="py-3 pl-6 text-right [&:last-child]:pr-6">{money(amount)}</td>
    </tr>
  );
}

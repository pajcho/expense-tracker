import React from 'react';
import { ExpenseItemForm } from '@/components/expenseItemForm';
import { ExpenseCategory } from '@/components/expenseCategory';
import { ExpenseItem } from '@/components/expenseItem';
import { SortableTableHeader } from '@/components/sortableTableHeader';
import { ExpenseTotal } from '@/components/expenseTotal';
import { ExpenseCategoryForm } from '@/components/expenseCategoryForm';
import { CategoryContext, CategoryContextType } from '@/providers/category.provider';
import { Loader } from 'react-feather';

export function ExpenseTable() {
  const { categories, isLoading } = React.useContext(CategoryContext) as CategoryContextType;

  return (
    <div className="relative mx-10 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
          Expense tracker
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Here you can see a list of all your expenses made in the period. You can also group them by category and see
            all the totals auto calculated for you.
          </p>
        </caption>
        {isLoading ? (
          <thead>
            <tr>
              <th scope="col" className="flex w-full select-none items-center justify-center gap-2 py-5">
                <Loader size={15} className="animate-spin"></Loader>
                Loading expenses...
              </th>
            </tr>
          </thead>
        ) : (
          <>
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="w-full select-none py-3 pl-6 [&:last-child]:pr-6">
                  Monthly expense
                </th>
                <th scope="col" className="select-none py-3 pl-6 text-right [&:last-child]:pr-6">
                  <SortableTableHeader>Projected</SortableTableHeader>
                </th>
                <th scope="col" className="select-none py-3 pl-6 text-right [&:last-child]:pr-6">
                  <SortableTableHeader>Actual</SortableTableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <ExpenseCategory {...item} key={item.id}>
                  {item.expenses.map((expense) => (
                    <ExpenseItem {...expense} key={expense.id} />
                  ))}
                  <ExpenseItemForm {...item} key="item-form" />
                </ExpenseCategory>
              ))}
              <ExpenseCategoryForm key="new-category" />
            </tbody>
            <tfoot>
              <ExpenseTotal categories={categories} />
            </tfoot>
          </>
        )}
      </table>
    </div>
  );
}

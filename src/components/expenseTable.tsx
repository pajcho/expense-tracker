import React from 'react';
import { Inbox, Loader } from 'react-feather';
import { ExpenseItem } from '@/components/expenseItem';
import { ExpenseTotal } from '@/components/expenseTotal';
import { ExpenseItemForm } from '@/components/expenseItemForm';
import { ExpenseCategory } from '@/components/expenseCategory';
import { SortableTableHeader } from '@/components/sortableTableHeader';
import { ExpenseCategoryForm } from '@/components/expenseCategoryForm';
import { useFetchCategories } from '@/services/category.service';
import TableFilters, { TableFiltersType } from '@/components/tableFilters';

export function ExpenseTable() {
  const [filters, setFilters] = React.useState<TableFiltersType>({ fromDate: undefined, toDate: undefined });
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const categories = useFetchCategories(filters);

  const onFiltersChange = React.useCallback((filters: TableFiltersType) => {
    setFilters(filters);
  }, []);

  React.useEffect(() => {
    if (!isLoaded && categories.data !== undefined) setIsLoaded(true);
  }, [categories, isLoaded]);

  return (
    <div className="relative mx-10 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
          Expense tracker
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Here you can see a list of all your expenses made in the period. You can also group them by category and see
            all the totals auto calculated for you.
          </p>
          {/* Hide filters until data is initially loaded */}
          <div className={!isLoaded ? 'hidden' : ''}>
            <TableFilters onFiltersChange={onFiltersChange}></TableFilters>
          </div>
        </caption>
        {!categories.data ? (
          <thead>
            <tr>
              <th
                scope="col"
                className="flex w-full select-none flex-col items-center justify-center gap-2 py-10 font-normal text-gray-300"
              >
                {categories.isLoading ? (
                  <>
                    <Loader size={45} strokeWidth={1} className="animate-spin-slow stroke-gray-200"></Loader>
                    Loading expenses
                  </>
                ) : (
                  <>
                    <Inbox size={60} strokeWidth={1} className="stroke-gray-200"></Inbox>
                    {categories.isError ? 'Error loading expenses' : 'Nothing to see here'}
                  </>
                )}
              </th>
            </tr>
          </thead>
        ) : (
          <>
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="w-full select-none py-3 pl-6 [&:last-child]:pr-6">
                  Monthly expense
                </th>
                <th scope="col" className="select-none py-3 pl-6 text-right [&:last-child]:pr-6">
                  <SortableTableHeader>Actual</SortableTableHeader>
                </th>
                <th scope="col" className="select-none text-right [&:last-child]:pr-6">
                  {' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.data.map((item) => (
                <ExpenseCategory {...item} key={item.id}>
                  {item.expenses.map((expense) => (
                    <ExpenseItem {...expense} key={expense.id} />
                  ))}
                  <ExpenseItemForm {...item} key="item-form" />
                </ExpenseCategory>
              ))}
              <ExpenseCategoryForm key="new-category" />
            </tbody>
            <tfoot className="border-t dark:border-gray-700">
              <ExpenseTotal categories={categories.data} />
            </tfoot>
          </>
        )}
      </table>
    </div>
  );
}

import React from 'react';
import { CornerDownRight, Edit } from 'react-feather';
import { formatDate } from '@/utils/date';
import { money } from '@/utils/money';
import { ItemModel } from '@/models/item.model';
import { ExpenseDialog } from '@/components/expenseDialog';

export function ExpenseItem(expense: ItemModel) {
  const [showForm, setShowForm] = React.useState(false);

  function editExpense(event: React.MouseEvent) {
    event.preventDefault();
    setShowForm(true);
  }

  return (
    <>
      <tr className="group border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [&:last-child]:border-0">
        <th
          scope="row"
          className="whitespace-nowrap py-2 pl-6 font-light text-gray-900 dark:text-white [&:last-child]:pr-6"
        >
          <div className="flex flex-row items-center gap-2 ">
            <CornerDownRight className="text-gray-300" size={15} />
            <p className="flex flex-grow items-baseline gap-2">
              {expense.name}{' '}
              {expense.description && <small className="flex w-full text-gray-300">{expense.description}</small>}
            </p>
            <span className="ml-auto text-2xs text-gray-300">{formatDate(expense.date)}</span>
          </div>
        </th>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">{money(expense.amount)}</td>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">
          <button
            className="invisible flex underline-offset-4 hover:text-blue-500 hover:underline group-hover:visible"
            onClick={editExpense}
          >
            <Edit strokeWidth={1} size={18}></Edit>
          </button>
          {showForm && (
            <ExpenseDialog
              categoryId={expense.categoryId}
              expense={expense}
              onCancel={() => setShowForm(false)}
              onSuccess={() => setShowForm(false)}
            />
          )}
        </td>
      </tr>
    </>
  );
}

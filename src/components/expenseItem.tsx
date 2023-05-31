import React, { PropsWithChildren } from 'react';
import { CornerDownRight, Edit } from 'react-feather';
import { formatDate } from '@/utils/date';
import { money } from '@/utils/money';
import { ItemModel } from '@/models/item.model';

export function ExpenseItem({ id, name, description, amount, date }: PropsWithChildren<ItemModel>) {
  function editExpense(event: React.MouseEvent) {
    event.preventDefault();

    console.log('TODO: Editing expense item [' + id + ']');
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
            <p>
              {name} {description && <small className="flex w-full text-gray-300">{description}</small>}
            </p>
            <span className="ml-auto text-2xs text-gray-300">{formatDate(date)}</span>
          </div>
        </th>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">{money(amount)}</td>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">
          <button
            className="invisible flex underline-offset-4 hover:text-blue-500 hover:underline group-hover:visible"
            onClick={editExpense}
          >
            <Edit strokeWidth={1} size={18}></Edit>
          </button>
        </td>
      </tr>
    </>
  );
}

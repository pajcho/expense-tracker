import React, { PropsWithChildren } from 'react';
import { CornerDownRight } from 'react-feather';
import { formatDate } from '@/utils/date';
import { money } from '@/utils/money';
import { ItemModel } from '@/models/item.model';

export function ExpenseItem({ name, actual, date }: PropsWithChildren<ItemModel>) {
  return (
    <>
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [&:last-child]:border-0">
        <th
          colSpan={2}
          scope="row"
          className="whitespace-nowrap py-2 pl-6 font-light text-gray-900 dark:text-white [&:last-child]:pr-6"
        >
          <div className="flex flex-row items-center gap-2 ">
            <CornerDownRight className="text-gray-300" size={15} /> {name}
            <span className="ml-auto text-2xs text-gray-300">{formatDate(date)}</span>
          </div>
        </th>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">{money(actual)}</td>
      </tr>
    </>
  );
}

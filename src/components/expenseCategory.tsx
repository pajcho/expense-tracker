import React, { PropsWithChildren } from 'react';
import { Circle, Minus } from 'react-feather';
import { money } from '@/utils/money';
import { CollapsableTableHeader } from '@/components/collapsableTableHeader';
import { CategoryModel } from '@/models/category.model';

export function ExpenseCategory({ name, projected, expenses, children }: PropsWithChildren<CategoryModel>) {
  let [expanded, setExpanded] = React.useState(false);
  const actual = expenses.reduce((sum, expense) => {
    return sum + expense.actual;
  }, 0);

  const font = expanded ? 'font-medium' : 'font-light';
  const variance = projected - actual;

  const VarianceIcon = variance === 0 ? Minus : Circle;
  const varianceColor = variance > 0 ? 'text-green-600' : variance === 0 ? 'text-yellow-600' : 'text-red-600';
  const varianceTitle =
    variance > 0
      ? `${money(variance)} bellow projected`
      : variance === 0
      ? 'Spot on'
      : `${money(Math.abs(variance))} above projected`;

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="relative cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [&:last-child]:border-0"
      >
        <th
          scope="row"
          className={`${font} whitespace-nowrap py-4 pl-6 text-gray-900 dark:text-white [&:last-child]:pr-6`}
        >
          <CollapsableTableHeader>{name}</CollapsableTableHeader>
        </th>
        <td className="py-4 pl-6 text-right [&:last-child]:pr-6">{money(projected)}</td>
        <td title={varianceTitle} className="flex flex-row items-center justify-end py-4 pl-6 [&:last-child]:pr-6">
          {!!actual && <VarianceIcon className={`${varianceColor} mr-auto ml-1 fill-current`} size={10}></VarianceIcon>}
          {money(actual)}
        </td>
      </tr>
      {expanded && children}
    </>
  );
}

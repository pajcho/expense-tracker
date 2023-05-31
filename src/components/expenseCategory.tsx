import React, { PropsWithChildren } from 'react';
import { Circle, Edit, Minus } from 'react-feather';
import { money } from '@/utils/money';
import { CollapsableTableHeader } from '@/components/collapsableTableHeader';
import { CategoryModel } from '@/models/category.model';

export function ExpenseCategory({ id, name, description, expenses, children }: PropsWithChildren<CategoryModel>) {
  let [expanded, setExpanded] = React.useState(false);
  const amount = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const font = expanded ? 'font-medium' : 'font-light';
  const variance = -amount;

  const VarianceIcon = variance === 0 ? Minus : Circle;
  const varianceColor = variance > 0 ? 'text-green-600' : variance === 0 ? 'text-yellow-600' : 'text-red-600';
  const varianceTitle =
    variance > 0
      ? `${money(variance)} bellow projected`
      : variance === 0
      ? 'Spot on'
      : `${money(Math.abs(variance))} above projected`;

  function editCategory(event: React.MouseEvent) {
    event.preventDefault();

    console.log('TODO: Editing expense category [' + id + ']');
  }

  return (
    <>
      <tr className="group relative border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [&:last-child]:border-0">
        <th
          scope="row"
          onClick={() => setExpanded(!expanded)}
          className={`${font} cursor-pointer whitespace-nowrap py-4 pl-6 text-gray-900 dark:text-white [&:last-child]:pr-6`}
        >
          <CollapsableTableHeader>
            {name} {description && <small className="flex w-full text-gray-300">&nbsp;- {description}</small>}
          </CollapsableTableHeader>
        </th>
        <td
          title={varianceTitle}
          className="flex flex-row items-center justify-end gap-2 py-4 pl-6 [&:last-child]:pr-6"
        >
          {!!amount && <VarianceIcon className={`${varianceColor} ml-1 mr-auto fill-current`} size={10}></VarianceIcon>}
          {money(amount)}
        </td>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">
          <button
            className="invisible flex underline-offset-4 hover:text-blue-500 hover:underline group-hover:visible"
            onClick={editCategory}
          >
            <Edit strokeWidth={1} size={18}></Edit>
          </button>
        </td>
      </tr>
      {expanded && children}
    </>
  );
}

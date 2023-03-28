import React, { PropsWithChildren } from 'react';
import { ChevronDown, ChevronRight, ChevronUp, Circle, CornerDownRight, Minus, Plus } from 'react-feather';
import { ExpenseCategory } from '@/models/expenseCategory';
import { ExpenseItem } from '@/models/expenseItem';
import { money } from '@/utils/money';
import { formatDate } from '@/utils/date';

function ExpenseCategory({ name, projected, expenses, children }: PropsWithChildren<ExpenseCategory>) {
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

function ExpenseItem({ name, actual, date }: PropsWithChildren<ExpenseItem>) {
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

function CollapsableTableHeader({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = React.useState(true);
  const Icon = collapsed ? ChevronRight : ChevronDown;

  return (
    <div onClick={() => setCollapsed(!collapsed)} className="ml-1 flex flex-row items-center">
      <Icon size={15} className="absolute left-2 text-gray-300" />
      {children}
    </div>
  );
}

function SortableTableHeader({ children }: PropsWithChildren) {
  const [direction, setDirection] = React.useState('desc');
  const Icon = direction === 'desc' ? ChevronDown : ChevronUp;

  return (
    <div
      onClick={() => setDirection(direction === 'desc' ? 'asc' : 'desc')}
      className="flex cursor-pointer flex-row items-center justify-end gap-2"
    >
      <Icon size={15} className="text-gray-300" /> {children}
    </div>
  );
}

function ExpenseTotal({ categories }: { categories: ExpenseCategory[] }) {
  const projected = categories.reduce((sum, category) => {
    return sum + category.projected;
  }, 0);
  const actual = categories.reduce((actual, category) => {
    return (
      actual +
      category.expenses.reduce((sum, expense) => {
        return sum + expense.actual;
      }, 0)
    );
  }, 0);

  return (
    <tr className="font-semibold text-gray-900 dark:bg-gray-700 dark:text-white">
      <th scope="row" className="py-3 pl-6 text-base [&:last-child]:pr-6">
        Total
      </th>
      <td className="py-3 pl-6 text-right [&:last-child]:pr-6">{money(projected)}</td>
      <td className="py-3 pl-6 text-right [&:last-child]:pr-6">{money(actual)}</td>
    </tr>
  );
}

function ExpenseItemForm({ name }: PropsWithChildren<ExpenseCategory>) {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <>
      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 [&:last-child]:border-0">
        <th
          colSpan={2}
          scope="row"
          className="whitespace-nowrap py-2 pl-6 font-light text-gray-900 dark:text-white [&:last-child]:pr-6"
        >
          <div className="flex flex-row items-center gap-2 ">
            {!showForm && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowForm(!showForm);
                }}
                className="flex items-center gap-2 py-1 px-2 text-xs font-light text-gray-400"
              >
                <Plus size={10} />
                New expense in {name}
              </button>
            )}
            {showForm && (
              <input
                type="text"
                className="w-2 min-w-max flex-1 border-b bg-inherit px-2 py-1 py-1"
                placeholder="Expense name..."
              ></input>
            )}
          </div>
        </th>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">
          {showForm && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
              className="rounded border py-1 px-2 text-2xs font-light"
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
    </>
  );
}

function ExpenseCategoryForm() {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <>
      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 [&:last-child]:border-0">
        <th
          colSpan={2}
          scope="row"
          className="whitespace-nowrap py-4 pl-6 font-light text-gray-900 dark:text-white [&:last-child]:pr-6"
        >
          <div className="flex flex-row items-center gap-2 ">
            {!showForm && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowForm(!showForm);
                }}
                className="flex items-center gap-2 py-1 px-2 text-xs font-light text-gray-400"
              >
                <Plus size={10} />
                New category
              </button>
            )}
            {showForm && (
              <input
                type="text"
                className="w-2 min-w-max flex-1 border-b bg-inherit px-2 py-1 py-1"
                placeholder="Enter category name..."
              ></input>
            )}
          </div>
        </th>
        <td className="py-2 pl-6 text-right [&:last-child]:pr-6">
          {showForm && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
              className="rounded border py-1 px-2 text-2xs font-light"
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
    </>
  );
}

export function ExpenseTable({ categories }: { categories: ExpenseCategory[] }) {
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
              <ExpenseItemForm {...item} />
            </ExpenseCategory>
          ))}
          <ExpenseCategoryForm />
        </tbody>
        <tfoot>
          <ExpenseTotal categories={categories} />
        </tfoot>
      </table>
    </div>
  );
}

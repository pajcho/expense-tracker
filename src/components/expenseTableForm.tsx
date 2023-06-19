import { Button } from 'antd';
import { Plus } from 'react-feather';
import React, { PropsWithChildren } from 'react';
import { ExpenseDialog } from '@/components/expenseDialog';
import { CategoryDialog } from '@/components/categoryDialog';

export function ExpenseTableForm({
  type,
  categoryId,
  children,
}: PropsWithChildren<{ type: 'category' | 'expense'; categoryId?: number }>) {
  const [showForm, setShowForm] = React.useState(false);

  const defaultProps = { onCancel: () => setShowForm(false), onSuccess: () => setShowForm(false) };
  const expenseProps = { categoryId: categoryId as number, ...defaultProps };

  function openForm(e: React.MouseEvent) {
    e.preventDefault();
    setShowForm(true);
  }

  return (
    <>
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [&:last-child]:border-0">
        <th
          colSpan={3}
          scope="row"
          className="whitespace-nowrap py-2 pl-6 font-light text-gray-900 dark:text-white [&:last-child]:pr-6"
        >
          <div className="flex flex-row items-center gap-2">
            <Plus className="text-gray-300" size={15} />
            <Button
              type="link"
              onClick={openForm}
              className="flex w-full items-center gap-2 p-0 text-xs font-light text-gray-400"
            >
              {children}
            </Button>
            {showForm &&
              (type === 'expense' ? <ExpenseDialog {...expenseProps} /> : <CategoryDialog {...defaultProps} />)}
          </div>
        </th>
      </tr>
    </>
  );
}

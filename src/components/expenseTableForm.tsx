import React, { PropsWithChildren } from 'react';
import { Plus } from 'react-feather';
import { Button } from 'antd';
import { CategoryContext, CategoryContextType } from '@/providers/category.provider';
import { ExpenseDialog } from '@/components/expenseDialog';

export function ExpenseTableForm({
  type,
  categoryId,
  children,
}: PropsWithChildren<{ type: 'category' | 'expense'; categoryId?: number }>) {
  const { addCategory, addExpense } = React.useContext(CategoryContext) as CategoryContextType;
  const [showForm, setShowForm] = React.useState(false);

  const isError = type === 'category' ? addCategory.isError : addExpense.isError;

  function openForm(e: React.MouseEvent) {
    e.preventDefault();
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
  }

  function handleSuccess() {
    setShowForm(false);
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
            <Plus className={`${isError ? 'text-red-500' : 'text-gray-300'}`} size={15} />
            <Button
              type="link"
              onClick={openForm}
              className="flex w-full items-center gap-2 p-0 text-xs font-light text-gray-400"
            >
              {children}
            </Button>
            <ExpenseDialog
              isOpen={showForm}
              type={type}
              categoryId={categoryId}
              onCancel={handleCancel}
              onSuccess={handleSuccess}
            />
          </div>
        </th>
      </tr>
    </>
  );
}

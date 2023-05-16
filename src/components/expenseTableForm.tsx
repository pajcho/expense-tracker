import React, { PropsWithChildren } from 'react';
import { ChevronRight, CornerDownRight, Plus } from 'react-feather';
import { Button, Form, Input } from 'antd';
import { CategoryContext, CategoryContextType } from '@/providers/category.provider';

export function ExpenseTableForm({
  placeholder,
  type,
  categoryId,
  children,
}: PropsWithChildren<{ placeholder: string; type: 'category' | 'expense'; categoryId?: number }>) {
  const { addCategory, addExpense } = React.useContext(CategoryContext) as CategoryContextType;

  const [showForm, setShowForm] = React.useState(false);
  const formIcon = type === 'category' ? ChevronRight : CornerDownRight;

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      showHideForm(false);
    }
  };

  const saveItem = async (values: any) => {
    if (type === 'category') {
      addCategory.mutate({ name: values.name, description: null }, { onSuccess: () => showHideForm(false) });
    } else {
      addExpense.mutate({ name: values.name, description: null, categoryId }, { onSuccess: () => showHideForm(false) });
    }
  };

  const FormIcon = showForm ? formIcon : Plus;

  const showHideForm = (showForm: boolean): void => {
    setShowForm(showForm);

    if (!showForm) {
      addCategory.reset();
      addExpense.reset();
    }
  };

  const isLoading = type === 'category' ? addCategory.isLoading : addExpense.isLoading;
  const isError = type === 'category' ? addCategory.isError : addExpense.isError;

  return (
    <>
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [&:last-child]:border-0">
        <th
          colSpan={3}
          scope="row"
          className="whitespace-nowrap py-2 pl-6 font-light text-gray-900 dark:text-white [&:last-child]:pr-6"
        >
          <div className="flex flex-row items-center gap-2">
            <FormIcon className={`${isError ? 'text-red-500' : 'text-gray-300'}`} size={15} />
            {showForm ? (
              <>
                <Form onFinish={saveItem} layout="horizontal" className="flex w-full gap-2">
                  <Form.Item name="name" noStyle>
                    <Input
                      autoFocus
                      bordered={false}
                      onKeyDown={handleEscape}
                      placeholder={placeholder}
                      className="p-0"
                    ></Input>
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button htmlType="submit" className="py-1 px-2 text-2xs font-light">
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                  </Form.Item>
                  <Button
                    type="text"
                    className="py-1 px-2 text-2xs font-light"
                    onClick={(e) => {
                      e.preventDefault();
                      showHideForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Form>
              </>
            ) : (
              <Button
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  showHideForm(!showForm);
                }}
                className="flex w-full items-center gap-2 p-0 text-xs font-light text-gray-400"
              >
                {children}
              </Button>
            )}
          </div>
        </th>
      </tr>
    </>
  );
}

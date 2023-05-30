import React, { PropsWithChildren } from 'react';
import { Plus } from 'react-feather';
import { Button, DatePicker, Form, Input, InputRef, Modal } from 'antd';
import { CategoryContext, CategoryContextType } from '@/providers/category.provider';
import dayjs from 'dayjs';

export function ExpenseTableForm({
  type,
  categoryId,
  children,
}: PropsWithChildren<{ type: 'category' | 'expense'; categoryId?: number }>) {
  const { addCategory, addExpense } = React.useContext(CategoryContext) as CategoryContextType;

  const [showForm, setShowForm] = React.useState(false);

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowForm(false);
    }
  };

  const saveItem = async (values: any) => {
    if (type === 'category') {
      addCategory.mutate(
        { name: values.name, description: values.description },
        { onSuccess: () => setShowForm(false) }
      );
    } else {
      addExpense.mutate(
        { name: values.name, description: values.description, categoryId, amount: values.amount, date: values.date },
        { onSuccess: () => setShowForm(false) }
      );
    }
  };

  const isLoading = type === 'category' ? addCategory.isLoading : addExpense.isLoading;
  const isError = type === 'category' ? addCategory.isError : addExpense.isError;

  const inputRef = React.createRef<InputRef>();

  function openForm(e: React.MouseEvent) {
    e.preventDefault();
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
  }

  React.useEffect(() => {
    if (showForm) {
      // Focus input element when form is displayed
      const timeoutId = setTimeout(() => inputRef.current?.focus());
      return () => clearTimeout(timeoutId);
    } else {
      // Reset mutations when form is closed
      type === 'category' && addCategory.reset();
      type === 'expense' && addExpense.reset();
    }
  }, [showForm]);

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
            {showForm && (
              <Modal
                title={`Add new ${type}`}
                open={true}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    type="text"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </Button>,
                  <Button form="expenseForm" key="submit" htmlType="submit">
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>,
                ]}
              >
                <Form
                  id="expenseForm"
                  onKeyDown={handleEscape}
                  onFinish={saveItem}
                  layout="vertical"
                  size="large"
                  className="py-5"
                >
                  <Form.Item
                    name="name"
                    label="Name:"
                    rules={[{ required: true, message: 'Please input expense name' }]}
                  >
                    <Input ref={inputRef} placeholder="Enter name"></Input>
                  </Form.Item>

                  {type === 'expense' && (
                    <div className="flex flex-row gap-4">
                      <Form.Item
                        name="amount"
                        label="Amount:"
                        className="w-full"
                        rules={[{ required: true, message: 'Expense amount is required' }]}
                      >
                        <Input type="number" placeholder="Enter amount"></Input>
                      </Form.Item>
                      <Form.Item
                        name="date"
                        label="Date:"
                        className="w-full"
                        initialValue={dayjs(new Date())}
                        rules={[{ required: true, message: 'Purchase date is required' }]}
                      >
                        <DatePicker className="w-full" format={'DD MMMM, YYYY'} />
                      </Form.Item>
                    </div>
                  )}

                  <Form.Item name="description" label="Description:">
                    <Input.TextArea rows={4} placeholder="Enter description"></Input.TextArea>
                  </Form.Item>
                </Form>
              </Modal>
            )}
          </div>
        </th>
      </tr>
    </>
  );
}

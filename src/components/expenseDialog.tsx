import React, { PropsWithChildren } from 'react';
import { CategoryContext, CategoryContextType } from '@/providers/category.provider';
import { Button, DatePicker, Form, Input, InputRef, Modal } from 'antd';
import dayjs from 'dayjs';

export function ExpenseDialog({
  type,
  isOpen,
  categoryId,
  onCancel = () => {},
  onSuccess = () => {},
}: PropsWithChildren<{
  type: 'category' | 'expense';
  isOpen: boolean;
  categoryId?: number;
  onCancel: () => void;
  onSuccess: () => void;
}>) {
  const { addCategory, addExpense } = React.useContext(CategoryContext) as CategoryContextType;

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  const saveItem = async (values: any) => {
    if (type === 'category') {
      addCategory.mutate({ name: values.name, description: values.description }, { onSuccess: () => onSuccess() });
    } else {
      addExpense.mutate(
        { name: values.name, description: values.description, categoryId, amount: values.amount, date: values.date },
        { onSuccess: () => onSuccess() }
      );
    }
  };

  const isLoading = type === 'category' ? addCategory.isLoading : addExpense.isLoading;
  const inputRef = React.createRef<InputRef>();

  React.useEffect(() => {
    if (isOpen) {
      // Focus input element when form is displayed
      const timeoutId = setTimeout(() => inputRef.current?.focus());
      return () => clearTimeout(timeoutId);
    } else {
      // Reset mutations when form is closed
      type === 'category' && addCategory.reset();
      type === 'expense' && addExpense.reset();
    }
  }, [isOpen]);

  return (
    <Modal
      title={`Add new ${type}`}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          type="text"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
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
        <Form.Item name="name" label="Name:" rules={[{ required: true, message: 'Please input expense name' }]}>
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
  );
}

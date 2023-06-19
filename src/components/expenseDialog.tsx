import dayjs from 'dayjs';
import { ItemModel } from '@/models/item.model';
import React, { PropsWithChildren } from 'react';
import { useUpsertExpense } from '@/services/category.service';
import { Button, DatePicker, Form, Input, InputRef, Modal } from 'antd';

export function ExpenseDialog({
  expense,
  categoryId,
  onCancel = () => {},
  onSuccess = () => {},
}: PropsWithChildren<{
  expense?: ItemModel;
  categoryId: number;
  onCancel: () => void;
  onSuccess: () => void;
}>) {
  const upsertExpense = useUpsertExpense();
  const [form] = Form.useForm();

  console.log(upsertExpense.isError);

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDialog();
    }
  };

  const saveItem = async (values: any) => {
    upsertExpense.mutate(
      {
        id: expense?.id,
        name: values.name,
        description: values.description,
        categoryId,
        amount: values.amount,
        date: values.date,
      },
      {
        onSuccess: () => {
          form.resetFields();
          return onSuccess();
        },
      }
    );
  };

  function closeDialog() {
    onCancel();
  }

  const isLoading = upsertExpense.isLoading;
  const inputRef = React.createRef<InputRef>();

  React.useEffect(() => {
    // Focus input element when form is displayed
    const timeoutId = setTimeout(() => inputRef.current?.focus());
    return () => clearTimeout(timeoutId);
  }, [inputRef]);

  return (
    <Modal
      title={expense ? `Edit expense` : `Add new expense`}
      open={true}
      onCancel={closeDialog}
      footer={[
        <Button
          key="back"
          type="text"
          onClick={(e) => {
            e.preventDefault();
            closeDialog();
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
        form={form}
        id="expenseForm"
        onKeyDown={handleEscape}
        onFinish={saveItem}
        layout="vertical"
        size="large"
        className="py-5"
      >
        <Form.Item
          initialValue={expense?.name}
          name="name"
          label="Name:"
          rules={[{ required: true, message: 'Please input expense name' }]}
        >
          <Input ref={inputRef} placeholder="Enter name"></Input>
        </Form.Item>

        <div className="flex flex-row gap-4">
          <Form.Item
            initialValue={expense?.amount}
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
            initialValue={expense ? dayjs(new Date(expense?.date)) : dayjs(new Date())}
            rules={[{ required: true, message: 'Purchase date is required' }]}
          >
            <DatePicker className="w-full" format={'DD MMMM, YYYY'} />
          </Form.Item>
        </div>

        <Form.Item initialValue={expense?.description} name="description" label="Description:">
          <Input.TextArea rows={4} placeholder="Enter description"></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}

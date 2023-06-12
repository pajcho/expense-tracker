import React, { PropsWithChildren } from 'react';
import { CategoryContext, CategoryContextType } from '@/providers/category.provider';
import { Button, Form, Input, InputRef, Modal } from 'antd';
import { CategoryModel } from '@/models/category.model';

export function CategoryDialog({
  category,
  onCancel = () => {},
  onSuccess = () => {},
}: PropsWithChildren<{
  category?: CategoryModel;
  onCancel: () => void;
  onSuccess: () => void;
}>) {
  const { upsertCategory } = React.useContext(CategoryContext) as CategoryContextType;
  const [form] = Form.useForm();

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDialog();
    }
  };

  const saveItem = async (values: any) => {
    upsertCategory.mutate(
      { id: category?.id, name: values.name, description: values.description },
      {
        onSuccess: () => {
          form.resetFields();
          return onSuccess();
        },
      }
    );
  };

  function closeDialog() {
    // Reset mutations when form is closed
    upsertCategory.reset();
    onCancel();
  }

  const isLoading = upsertCategory.isLoading;
  const inputRef = React.createRef<InputRef>();

  React.useEffect(() => {
    // Focus input element when form is displayed
    const timeoutId = setTimeout(() => inputRef.current?.focus());
    return () => clearTimeout(timeoutId);
  }, [inputRef]);

  return (
    <Modal
      title={category ? `Edit category` : `Add new category`}
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
        <Button form="categoryForm" key="submit" htmlType="submit">
          {isLoading ? 'Saving...' : 'Save'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="categoryForm"
        onKeyDown={handleEscape}
        onFinish={saveItem}
        layout="vertical"
        size="large"
        className="py-5"
      >
        <Form.Item
          initialValue={category?.name}
          name="name"
          label="Name:"
          rules={[{ required: true, message: 'Please input category name' }]}
        >
          <Input ref={inputRef} placeholder="Enter name"></Input>
        </Form.Item>

        <Form.Item initialValue={category?.description} name="description" label="Description:">
          <Input.TextArea rows={4} placeholder="Enter description"></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}

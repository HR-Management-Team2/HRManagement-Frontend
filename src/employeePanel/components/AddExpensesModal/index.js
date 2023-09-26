import { Button, Form, Input, Modal, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";


const AddExpensesModal = ({
  isModalOpen,
  onOk,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm();


  const onFinish = (values) => {
    console.log(values);
    onOk(values);
    form.resetFields();
    const selectedExpenseType = values.expenseType;
    const selectedCurrency = values.currency;

  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const { TextArea } = Input;

  return (
    <Modal
      title="Add Expense"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-expense"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item
          name="expenseType"
          label="Expense Type"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="FOOD">Food</Select.Option>
            <Select.Option value="ACCOMODATION">Accomodation</Select.Option>
            <Select.Option value="TRANSPORTATION">Transportation</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="expenseAmount"
          label="Amount"
          rules={[{ required: true }]}

        >
          <InputNumber
            min={0}
            step={50}
          />
        </Form.Item>
        <Form.Item
          name="currency"
          label="Currency"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EURO</Select.Option>
            <Select.Option value="GBP">GBP</Select.Option>
            <Select.Option value="TRY">TL</Select.Option>
          </Select>
        </Form.Item >
        {/* <Form.Item
          name="dateOfRequest"
          label="Date of Request"
          rules={[{ required: true }]}
        >
          <Input
            type="date"
            value={inputValue}
            onChange={handleChange}
            style={{
              borderRadius: '5px',
              width: '315px',
              height: '35px',
              border: '1px solid #ccc',
              borderColor: '#ccc',
              borderWidth: '1px',
              opacity: 0.7
            }}
            format="YYYY.MM.DD"
          />
        </Form.Item> */}


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpensesModal;

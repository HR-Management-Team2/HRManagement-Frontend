import { Button, Form, Input, Modal, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";


const AddPermissionsModal = ({
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
      title="Permission Status"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-advance"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item
          name="id"
          label="ID"
          rules={[{ required: true }]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name="approvalStatus"
          label="ApprovalStatus"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="APPROVED">APPROVED</Select.Option>
            <Select.Option value="PENDING_APPROVAL">PENDING APPROVAL</Select.Option>
            <Select.Option value="REJECTED">REJECTED</Select.Option>
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

export default AddPermissionsModal;

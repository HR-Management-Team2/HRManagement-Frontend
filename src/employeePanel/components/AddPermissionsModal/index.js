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
      title="Add Permission"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-permission"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item
          name="epermissionType"
          label="Permission Type"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="HOLIDAY">Holiday</Select.Option>
            <Select.Option value="ANNUAL">Annual Leave</Select.Option>
            <Select.Option value="SICK">Sick Leave</Select.Option>
            <Select.Option value="MATERNITY_PATERNITY">Maternity/Paternity Leave</Select.Option>
            <Select.Option value="EDUCATIONAL">Educational Leave</Select.Option>
            <Select.Option value="HOME_RENOVATION">Home Renovation Leave</Select.Option>
            <Select.Option value="CHILDS_SCHOOL">Child's School Leave</Select.Option>
            <Select.Option value="SPECIAL">Special Leave</Select.Option>
            <Select.Option value="RELIGIOUS_HOLIDAY">Religious Holiday Leave</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: 'Please select the start date' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date' }]}
        >
          <Input type="date" />
        </Form.Item>


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

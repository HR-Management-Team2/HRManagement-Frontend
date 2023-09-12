import { Button, Form, Input, Modal ,DatePicker } from "antd";
import { useEffect } from "react";


const AddCompaniesModal = ({
  isModalOpen,
  onOk,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //    console.log(values);
    onOk(values);
    form.resetFields();
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue(initialValues);
    }
  }, [form]);

  const config = {
    rules: [{ type: 'object' , required: true, message: 'Please select time!' }],
  };
  

  return (
    <Modal
      title="Add Company"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-company"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item
          name="name"
          label="Company Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taxno"
          label="Tax Number"
          rules={[{ required: true }]}
        >
          <Input />
          
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item >
        <Form.Item name="establish" label="Establish"  {...config} rules={[{ required: true }]}>
        
          <DatePicker picker="year" />
        
        </Form.Item>
        

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Companies
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCompaniesModal;

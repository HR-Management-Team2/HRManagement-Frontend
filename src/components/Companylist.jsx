
import { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import { Button, Table } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddCompaniesModal from "./AddCompaniesModal";
import dayjs from 'dayjs';

const Companylist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const buttons = [
    {
      key: "addCompanies",
      text: "Add Company",
      type: "primary",
      onClick: () => {
        setIsModalOpen(true);
        setInitialValues(null);
      },
    },
  ];

  const onOkAddModel = (values) => {
    setIsModalOpen(false);
    console.log(values);

    if (initialValues) {
      axios
        .put(`http://localhost:5000/companies/${initialValues.id}`, {
          ...values
        })
        .then((res) => {
          setCompanies((prevState) => {
            return prevState.map((u) => {
              if (res.data.id === u.id) {
                return {
                  ...res.data,
                };
              } 
              return u;
            });
          });
        });
    } else {
      const newCompanies = {
        name: values.name,
        taxno: values.taxno,
        phone: values.phone,
        address: values.address,
        establish: values.establish
      };
      axios.post("http://localhost:5000/companies", newCompanies).then((res) => {
        setCompanies((prevState) => [
          ...prevState,
          {
            ...res.data, 
          },
        ]);
      });
    }
  };

  const onCancelAddModel = () => {
    setIsModalOpen(false);
  };

  const onClickEdit = (row) => {
    setIsModalOpen(true);
    row.establish=dayjs(row.establish)
    setInitialValues(row);
  };
  const onSearch = (value) => {
    setSearch(value);
  };

  const onDeleteCompany = (companyId) => {
    if (!companyId) {
      console.error("Invalid Company ID");
      return;
    }
  
    axios
      .delete(`http://localhost:5000/companies/${companyId}`)
      .then((res) => {
        setCompanies((prevState) =>
          prevState.filter((company) => company.id !== companyId)
        );
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };
  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tax Number",
      dataIndex: "taxno",
      key: "taxno",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Year of Establish",
      dataIndex: "establish",
      key: "establish",
    },
    
    {
      dataIndex: "id",
      key: "id",
      render: (cell, row) => {
        return (
          <>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onClickEdit(row)}
          />
          <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteCompany(row.id)} 
            />
          </>
          
        );
      },
      width: 100,
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/companies").then((res) => {
      setCompanies(res.data);
    });
  }, []);

  return (
    <PageLayout buttons={buttons} onSearch={onSearch}>
      <Table
        dataSource={companies.filter((company) => {
          return (
            company.name.includes(search)
          );
        })}
        columns={columns}
        rowKey="id"
      />
      {isModalOpen && (
        <AddCompaniesModal
          isModalOpen={isModalOpen}
          onOk={onOkAddModel}
          onCancel={onCancelAddModel}
          initialValues={initialValues}
        />
      )}
    </PageLayout>
  );
};

export default Companylist;

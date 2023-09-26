
import { useEffect, useState } from "react";
import PageLayoutEmployee from "../components/PageLayoutEmployee";
import { Button, Table } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import AddExpensesModal from "../components/AddExpensesModalManager";
import dayjs from 'dayjs';
import PageLayout from "./PageLayoutManager";


const ExpenseListManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const token=localStorage.getItem('TOKEN');
  const buttons = [
    {
      key: "addExpenses",
      text: "Add Expenses",
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
        .put(`http://localhost:8090/api/v1/user/approve-expense/${initialValues.id}`, {
          ...values
        })
        .then((res) => {
          setExpenses((prevState) => {
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
      const newExpenses = JSON.stringify({
        expenseType: values.expenseType,
        description: values.description,
        expenseAmount: values.expenseAmount,
        currency: values.currency,
        replyDate: values.replyDate,
        approvalStatus:values.approvalStatus,
        token: token
      });
      const header = {
        'Content-Type': 'application/json',
        // 'Accept-Encoding': 'gzip;q=1.0, compress;q=0.5',
      };
      axios({
        method: 'POST',
        url: 'http://localhost:8090/api/v1/user/expense-create',
        headers: header,
        data: newExpenses
      }).then(result => {
        console.log(result);
      }).catch(data => {
        const result = data.response.data;
        alert(result.message);
      })
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



  // const { Option } = Select; 

  const onStatusChange = (expenseId, status) => {
    if (!expenseId || !status) {
      console.error("Invalid Expense ID");
      return;
    }
  
    axios
      .put(`http://localhost:5000/expenses/${expenseId}`, { status })
      .then((res) => {
        setExpenses((prevState) =>
          prevState.map((expense) => {
            if (expense.id === expenseId) {
              return { ...expense, status };
            } else {
              return expense;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Update status error:", error);
      });
  };
  

  const onDeleteExpense = (expenseId) => {
    if (!expenseId) {
      console.error("Invalid Expense ID");
      return;
    }
  
    axios
      .delete(`http://localhost:5000/expenses/${expenseId}`)
      .then((res) => {
        setExpenses((prevState) =>
          prevState.filter((expense) => expense.id !== expenseId)
        );
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };
  
  
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Employee Name",
      dataIndex: "nameOfTheRequester",
      key: "nameOfTheRequester",
    },
    {
      title: "Employee Surname",
      dataIndex: "surnameOfTheRequester",
      key: "surnameOfTheRequester",
    },
    {
      title: "Expense Type",
      dataIndex: "expenseType",
      key: "expenseType",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Date of Request",
      dataIndex: "dateOfRequest",
      key: "dateOfRequest",
    },
    {
      title: "Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
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
            {/* <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteExpense(row.id)} 
            /> */}
          </>
        );
      },
      width: 100,
    },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8090/api/v1/user/findall-manager-expenses?token=${token}`).then((res) => {
      setExpenses(res.data);
    });
  }, []);

  return (
    <PageLayout buttons={buttons} onSearch={onSearch}>
      <Table
  dataSource={expenses.filter((expense) => {
    return (
      expense && 
      expense.expenseType || 
      expense.description.includes(search)
    );
  })}
  columns={columns}
  rowKey="id"
/>

      {isModalOpen && (
        <AddExpensesModal
          isModalOpen={isModalOpen}
          onOk={onOkAddModel}
          onCancel={onCancelAddModel}
          initialValues={initialValues}
          expenses={expenses}
          onStatusChange={onStatusChange}
        />
      )}
    </PageLayout>
  );
};

export default ExpenseListManager;

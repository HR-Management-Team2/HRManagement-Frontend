
import { useEffect, useState } from "react";
import PageLayoutEmployee from "../components/PageLayoutEmployee";
import { Button, Table } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import AddAdvancesModal from "../components/AddAdvancesModal";
import dayjs from 'dayjs';


const AdvanceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advances, setAdvances] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const token=localStorage.getItem('TOKEN');
  const buttons = [
    {
      key: "addAdvances",
      text: "Add Advances",
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

    // if (initialValues) {
    //   axios
    //     .put(`http://localhost:5000/advances/${initialValues.id}`, {
    //       ...values
    //     })
    //     .then((res) => {
    //         setAdvances((prevState) => {
    //         return prevState.map((u) => {
    //           if (res.data.id === u.id) {
    //             return {
    //               ...res.data,
    //             };
    //           } 
    //           return u;
    //         });
    //       });
    //     });
    // } else {
      const newAdvances = JSON.stringify({
        advanceRequestType: values.advanceRequestType,
        description: values.description,
        advanceAmount: values.advanceAmount,
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
        url: 'http://localhost:8090/api/v1/user/advances-create',
        headers: header,
        data: newAdvances
      }).then(result => {
        console.log(result);
      }).catch(data => {
        const result = data.response.data;
        alert(result.message);
      })
    //}
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

  const onStatusChange = (advanceId, status) => {
    if (!advanceId || !status) {
      console.error("Invalid Advance ID");
      return;
    }
  
    axios
      .put(`http://localhost:5000/advances/${advanceId}`, { status })
      .then((res) => {
        setAdvances((prevState) =>
          prevState.map((advance) => {
            if (advance.id === advanceId) {
              return { ...advance, status };
            } else {
              return advance;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Update status error:", error);
      });
  };
  

  const onDeleteAdvance = (advanceId) => {
    if (!advanceId) {
      console.error("Invalid Advance ID");
      return;
    }
  
    axios
      .delete(`http://localhost:5000/advances/${advanceId}`)
      .then((res) => {
        setAdvances((prevState) =>
          prevState.filter((advance) => advance.id !== advanceId)
        );
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };
  
  
  
  const columns = [
    {
      title: "Advance Type",
      dataIndex: "advanceRequestType",
      key: "advanceRequestType",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "advanceAmount",
      key: "advanceAmount",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Reply Date",
      dataIndex: "replyDate",
      key: "replyDate",
    },
    {
      title: "Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
    },
    // {
    //   dataIndex: "id",
    //   key: "id",
    //   render: (cell, row) => {
    //     return (
    //       <>
    //         <Button
    //           type="primary"
    //           shape="circle"
    //           icon={<EditOutlined />}
    //           onClick={() => onClickEdit(row)}
    //         />
    //         <Button
    //           type="danger"
    //           shape="circle"
    //           icon={<DeleteOutlined />}
    //           onClick={() => onDeleteAdvance(row.id)} 
    //         />
    //       </>
    //     );
    //   },
    //   width: 100,
    // },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8090/api/v1/user/findall-employee-advances?token=${token}`).then((res) => {
      setAdvances(res.data);
    });
  }, []);

  return (
    <PageLayoutEmployee buttons={buttons} onSearch={onSearch}>
      <Table
  dataSource={advances.filter((advance) => {
    if (!advance) {
      return false; 
    }
    return (
      advance.advanceType || 
      (advance.description && advance.description.includes(search)) 
    );
  })}
  columns={columns}
  rowKey="id"
/>

      {isModalOpen && (
        <AddAdvancesModal
          isModalOpen={isModalOpen}
          onOk={onOkAddModel}
          onCancel={onCancelAddModel}
          initialValues={initialValues}
          advances={advances}
          onStatusChange={onStatusChange}
        />
      )}
    </PageLayoutEmployee>
  );
};

export default AdvanceList;

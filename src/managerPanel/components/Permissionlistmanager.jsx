import { useEffect, useState } from "react";
import PageLayoutManager from "../components/PageLayoutManager";
import { Button, Table } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddPermissionsModal from "./AddPermissionsModalManager"
import dayjs from "dayjs";



const Permissionlistmanager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem('TOKEN');

  const buttons = [
    {
      key: "addPermissions",
      text: "Add Permission",
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

    const days = calculatePermissionDays(values.startDate, values.endDate);
    function calculatePermissionDays(startDate, endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const dayDifference = end.diff(start, "day");
      return dayDifference + 1;
    }

    if (initialValues) {
      axios
        .put(`http://localhost:8090/api/v1/user/approve-permission${initialValues.id}`, {
          ...values,
        })
        .then((res) => {
          setPermissions((prevState) => {
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
      const newPermissions = JSON.stringify({
        epermissionType: values.epermissionType,
        dateOfRequest: values.dateOfRequest,
        startDate: values.startDate,
        endDate: values.endDate,
        days: days,
        approvalStatus: values.approvalStatus,
        token: token
      });
      const header = {
        'Content-Type': 'application/json',
        // 'Accept-Encoding': 'gzip;q=1.0, compress;q=0.5',
      };
      axios({
        method: 'POST',
        url: 'http://localhost:8090/api/v1/user/permission-create',
        headers: header,
        data: newPermissions
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
    row.establish = dayjs(row.establish);
    setInitialValues(row);
  };
  const onSearch = (value) => {
    setSearch(value);
  };

  // const { Option } = Select;

  const onStatusChange = (permissionId, status) => {
    if (!permissionId || !status) {
      console.error("Invalid Permission ID");
      return;
    }

    axios
      .put(`http://localhost:5000/permissions/${permissionId}`, { status })
      .then((res) => {
        setPermissions((prevState) =>
          prevState.map((permission) => {
            if (permission.id === permissionId) {
              return { ...permission, status };
            } else {
              return permission;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Update status error:", error);
      });
  };

  const onDeletePermission = (permissionId) => {
    if (!permissionId) {
      console.error("Invalid Permission ID");
      return;
    }

    axios
      .delete(`http://localhost:5000/permissions/${permissionId}`)
      .then((res) => {
        setPermissions((prevState) =>
          prevState.filter((permission) => permission.id !== permissionId)
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
      dataIndex: "nameEmployee",
      key: "nameEmployee",
    },
    {
      title: "Employee Surname",
      dataIndex: "surnameEmployee",
      key: "surnameEmployee",
    },
    {
      title: "Permission Type",
      dataIndex: "epermissionType",
      key: "epermissionType",
    },
    {
      title: "Date of Request",
      dataIndex: "dateOfRequest",
      key: "dateOfRequest",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
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
              onClick={() => onDeletePermission(row.id)}
            /> */}
          </>
        );
      },
      width: 100,
    },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8090/api/v1/user/findall-permission-manager?token=${token}`).then((res) => {
      setPermissions(res.data);
    });
  }, []);

  return (
    <PageLayoutManager buttons={buttons} onSearch={onSearch}>
      <Table
        dataSource={permissions.filter((permission) => {
          if (!permission) {
            return false;
          }
          return (
            permission.epermissionType || (permission.description && permission.description.includes(search))
          );
        })}
        columns={columns}
        rowKey="id"
      />

      {isModalOpen && (
        <AddPermissionsModal
          isModalOpen={isModalOpen}
          onOk={onOkAddModel}
          onCancel={onCancelAddModel}
          initialValues={initialValues}
          permissions={permissions}
          onStatusChange={onStatusChange}
        />
      )}
    </PageLayoutManager>
  );
};

export default Permissionlistmanager;

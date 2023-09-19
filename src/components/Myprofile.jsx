import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import jwt_decode from "jwt-decode";


export default function Myprofile() {
  // const [isEditing, setIsEditing] = useState(false);
  // const [admin, setAdmin] = useState([]);

  // const token = localStorage.getItem("TOKEN");
  // const decodedToken = jwt_decode(token);
  // const authId = decodedToken.authId;



  // const [userData, setUserData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  // });

  // const handleEditClick = () => {
  //   setIsEditing(!isEditing);
  // };

  // const handleSaveClick = () => {
  //   setIsEditing(false);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // };

  // useEffect(() => {
  //   axios.get(`http://localhost:8090/api/v1/user/find-by-user-dto/${authId}`,token,{
  //       headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //       }
  //   })
  //   .then((response) => {
  //     const { firstName, lastName, email } = response.data;
  //     setUserData({ firstName, lastName, email });
  //   }).catch((error)=>{
  //     console.log(error);
  //   });
  // }, [authId, token]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8090/api/v1/user/find-by-user-dto${authId}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       const { firstName, lastName, email } = response.data;
  //       setUserData({ firstName, lastName, email });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [authId, token]);

  const token = localStorage.getItem("TOKEN");
  let id;

  try {
    const decodedToken = jwt_decode(token);
    id = decodedToken.id;
  } catch (error) {
    console.error("Token çözme hatası:", error);
  }

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8090/api/v1/user/find-by-user-dto/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
          params: {
            timestamp: new Date().getTime(),
          },
        })
        .then((response) => {
          const { name, surname, email } = response.data;
          console.log('API Yanıtı:', response.data);
          setUserData({ name, surname, email });
          console.log('Kullanıcı Verisi:', userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id,token]);


  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  return (
    <>
      <Navbar />
      <Box height={10} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: "600px" }}>
          <h1>My Profile</h1>
          {/* bunun yerine admin isim soyismi çekilse güzel olur */}
          <Avatar
            alt="Remy Sharp"
            src="\pages\bg\login.png"
            sx={{ width: 150, height: 150, marginBottom: "20px" }}
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
          >
            Upload a file
            <VisuallyHiddenInput type="file" />
          </Button>
          {isEditing ? (
            <Box sx={{ marginTop: "50px" }}>
              <TextField
                name="name"
                label="First Name"
                value={userData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="surname"
                label="Last Name"
                value={userData.surname}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>
          ) : (
            <Paper
              elevation={3}
              sx={{ padding: 2, mb: 2, maxWidth: "600px", marginTop: "30px" }}
            >
              <p>First Name: {userData.name}</p>
              <p>Last Name: {userData.surname}</p>
              <p>Email: {userData.email}</p>
            </Paper>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

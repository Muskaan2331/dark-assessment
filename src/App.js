
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, IconButton } from '@mui/material';

import UserTable from './components/UserTable';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRowSelection = (selected) => {
    if (selected === 'all') {
      setSelectedRows(selectedRows.length === userData.length ? [] : userData.map((user) => user.id));
    } else {
      setSelectedRows((prevSelected) => {
        if (prevSelected.includes(selected)) {
          return prevSelected.filter((id) => id !== selected);
        } else {
          return [...prevSelected, selected];
        }
      });
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = userData.filter((user) => !selectedRows.includes(user.id));
    setUserData(updatedData);
    setSelectedRows([]);
  };

  const handleEdit = (userId, fieldName, value) => {
    const updatedData = userData.map((user) => {
      if (user.id === userId) {
        return { ...user, [fieldName]: value };
      }
      return user;
    });
    setUserData(updatedData);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        display="flex"
        justifyContent="center"
        fontSize="32px"
        fontWeight="bold"
        color="#333"
        pb={2}
      >
        Admin Dashboard
      </Typography>

      <UserTable
        userData={userData}
        selectedRows={selectedRows}
        onRowSelection={handleRowSelection}
        onEdit={handleEdit}
        onDeleteSelected={handleDeleteSelected}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
    </Container>
  );
};

export default App;

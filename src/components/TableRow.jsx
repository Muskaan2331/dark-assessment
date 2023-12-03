import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const TableRow = ({ user, onSelect, isSelected, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleRowSelection = () => {
    onSelect(user.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedUser);
    }
    setEditing(!isEditing);
  };

  const handleDelete = () => {
    const updatedData = userData.filter(
      (currentUser) => currentUser.id !== user.id
    );

    setUserData(updatedData);

    setSelectedRows([]);

    console.log(`Deleted user with ID: ${user.id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={handleRowSelection}
          checked={isSelected}
        />
      </td>
      <td>{editedUser.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        ) : (
          editedUser.name
        )}
      </td>
      <td>{editedUser.email}</td>
      <td>{editedUser.role}</td>
      <td>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          sx={{ marginRight: "8px" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;

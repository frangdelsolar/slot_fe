import { useState } from "react";
import UserSelector from "./UserSelector";

const UserSection = ({ handleChange }) => {
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editBtnLabel, setEditBtnLabel] = useState("Change User");

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setEditBtnLabel("Edit User");
    } else {
      setEditBtnLabel("Cancel");
    }
  };

  const userChange = (user) => {
    setUser(user);
    handleChange(user);
    toggleEditMode();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        rowGap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "3rem",
        }}
      >
        <h2>Welcome{user && ",  " + user.name}!</h2>
        <button className="btn btn-outline-primary" onClick={toggleEditMode}>
          {editBtnLabel}
        </button>
      </div>
      {editMode && <UserSelector userChange={userChange} />}
    </div>
  );
};

export default UserSection;

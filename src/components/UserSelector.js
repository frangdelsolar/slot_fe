import { requestUserData, postUserData } from "../requests/users";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const UserSelector = ({ userChange }) => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const usersData = requestUserData();
    usersData.then((data) => {
      if (data) {
        setUserList(data);
      }
    });
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!(newUser.name && newUser.email)) {
      alert("Please fill in all fields");
      return;
    }

    const response = postUserData(newUser);
    response.then((data) => {
      if (data.user) {
        setUserList([...userList, data.user]);
        setSelectedUser(data.user);
        userChange(data.user);
      }
    });
  };

  const toggleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  const handleUserSelection = (event) => {
    const selection = userList.find(
      (user) => user.id === parseInt(event.target.value)
    );
    setSelectedUser(selection);
  };
  const handleUserChange = () => {
    if (selectedUser) {
      userChange(selectedUser);
    }
  };

  return (
    <>
      {showRegistrationForm && (
        <>
          <h3>Register New User</h3>

          <form onSubmit={handleRegistration} id="registrationForm">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                rowGap: "1rem",
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              columnGap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <button
              className="btn btn-outline-danger"
              onClick={toggleRegistrationForm}
            >
              Back
            </button>
            <button
              className="btn btn-outline-primary"
              type="submit"
              form="registrationForm"
            >
              Submit
            </button>
          </div>
        </>
      )}
      {!showRegistrationForm && (
        <>
          <Form.Select
            aria-label="Default select example"
            onChange={handleUserSelection}
          >
            <option>Select User</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              columnGap: "1rem",
            }}
          >
            <button className="btn btn-link" onClick={toggleRegistrationForm}>
              Not a user?
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleUserChange}
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UserSelector;

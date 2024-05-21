import { useState, useEffect } from "react";
import User from "./components/User";
import UserModal from "./components/Modal";
import "./App.css";

const BASEURL = "https://crudcrud.com/api/";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("key");
    if (storedValue) {
      fetchData(storedValue);
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = async () => {
    localStorage.setItem("key", inputValue);
    fetchData(inputValue);
  };

  const fetchData = async (key) => {
    try {
      const res = await fetch(`${BASEURL}${key}/users`);
      if (res.ok) {
        setAuth(true);
        const data = await res.json();
        setData(data);
      } else {
        setAuth(false);
        setError(`Error: ${res.statusText}`);
      }
    } catch (error) {
      setAuth(false);
      setError(`Error: ${error.message}`);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const key = localStorage.getItem("key");
    try {
      const res = await fetch(`${BASEURL}${key}/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setData(data.filter((user) => user._id !== id));
      } else {
        setError(`Error: ${res.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleUpdate = async (user) => {
    const key = localStorage.getItem("key");
    const url = isEditing
      ? `${BASEURL}${key}/users/${currentUser._id}`
      : `${BASEURL}${key}/users`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const userListRes = await fetch(`${BASEURL}${key}/users`);
        const updatedUserData = await userListRes.json();
        setData(updatedUserData);
        setIsModalOpen(false);
      } else {
        setError(`Error: ${res.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <div>
      {auth ? (
        <>
          <div className="container">
            <h1>Users</h1>
            <button onClick={handleAddUser}>Add User</button>{" "}
            <ul>
              {data.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </div>
          <UserModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            onSave={handleUpdate}
            user={currentUser}
            isEditing={isEditing}
          />
        </>
      ) : (
        <div>
          {error && <p>{error}</p>}
          <h1>Please enter your key</h1>
          <div className="input_wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter the key"
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./modal.css";

const UserModal = ({ isOpen, closeModal, onSave, user }) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImg(user.img);
      const dateOnly = user.date.split("T")[0];
      setDate(dateOnly);
    } else {
      setName("");
      setImg("");
      setDate("");
    }
  }, [isOpen, user]);

  const handleSave = () => {
    const newUser = {
      name: name,
      img: img,
      date: date,
    };
    if (!date) {
      alert("Please enter a date.");
      return;
    }
    onSave(newUser);
    closeModal();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{user ? "Edit User" : "Add New User"}</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            required={true}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>
          {user ? "Save Changes" : "Add User"}
        </button>
      </div>
    </div>
  );
};

export default UserModal;

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object,
};

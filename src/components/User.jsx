import { calculateAge, getZodiacSign } from "../utils/utils";
import pp from "../assets/pp.png";
import PropTypes from "prop-types";
import "./user.css";

const User = ({ user, onEdit, onDelete }) => {
  return (
    <li key={user._id} className="user">
      <div>
        {user.img ? (
          <img src={user.img} alt={user.name} className="img" />
        ) : (
          <img src={pp} alt="Default Profile" className="img" />
        )}{" "}
      </div>
      <div className="user-details">
        <p>Name: {user.name}</p>
        <p>Age: {calculateAge(user.date)}</p>
        <p>Zodiac Sign: {getZodiacSign(user.date)}</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user._id)}>Delete</button>
      </div>
    </li>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default User;

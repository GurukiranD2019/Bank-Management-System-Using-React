import React, { useState } from "react";
import "./Profile.css";

interface ProfileProps {
  userDetails: {
    name: string;
    contact: string;
    address: string;
    dob: string;
    age: number;
  };
  onBack: () => void; // Function to handle back navigation
}

const Profile: React.FC<ProfileProps> = ({ userDetails, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(userDetails);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSave = () => {
    // Save the updated details (you can add API calls here to persist changes)
    console.log("Updated Details:", editedDetails);
    setIsEditing(false);
  };

  return (
    <div className="profile-details">
      <h2>My Profile</h2>

      {isEditing ? (
        <div>
          <p>
            <strong>Name:</strong>{" "}
            <input
              type="text"
              name="name"
              value={editedDetails.name}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Contact:</strong>{" "}
            <input
              type="text"
              name="contact"
              value={editedDetails.contact}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Address:</strong>{" "}
            <input
              type="text"
              name="address"
              value={editedDetails.address}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            <input
              type="date"
              name="dob"
              value={editedDetails.dob}
              onChange={handleChange}
            />
          </p>
          <div className="profile-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Contact:</strong> {userDetails.contact}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(userDetails.dob).toDateString()}
          </p>
          <p>
            <strong>Age:</strong> {userDetails.age}
          </p>
        </div>
      )}
      <div className="profile-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={() => setIsEditing(true)} className="edit-icon">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;

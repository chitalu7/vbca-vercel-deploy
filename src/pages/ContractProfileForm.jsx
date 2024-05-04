import React, { useState } from 'react';
import './ContractProfileForm.css';
import { storage } from '../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database } from '../../firebase-config';
import { set, ref as dbRef } from 'firebase/database';
import { Link } from 'react-router-dom';
import { onSave } from '../utilities/freabaseUtilityFunctions';

function ContractProfileForm() {
  const initialState = {
    name: '',
    bio: '',
    image: null,
    consequencesStatus: false,
    consequences: '',
    atk: '',
    def: '',
    contractType: '',
    reward: '',
    location: '',
    rules: '',
    closer: '',
    lockOnStatus: false,
    objective: '',
    trackingStatus: false,
    contractStatus: false
  };

  const [formData, setFormData] = useState(initialState);

    const {
    name,
    bio,
    consequencesStatus,
    consequences,
    atk,
    def,
    contract_type,
    reward,
    location,
    rules,
    closer,
    lock_On_Status,
    objective,
    tracking_status,
    contract_status
  } = formData;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image && formData.name && formData.bio) {
      try {
        await onSave(formData); // Use the onSave function
        setFormData(initialState); // Reset the form after successful save
        // Additional step: If you want to clear the file input, you might need additional logic
      } catch (error) {
        console.error('Error saving the profile:', error);
        alert('Failed to save profile: ' + error.message);
      }
    } else {
      alert('Please fill all required fields and select an image.');
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.image && formData.name && formData.bio) {
  //     // Remove the try-catch block as error handling should be performed in onSave
  //     onSave(formData);
      

  //   } else {
  //     alert('Please fill all required fields and select an image.');
  //   }
  // };


  // const saveToDatabase = (data) => {
  //   const newProfileRef = databaseRef(database, 'profiles/' + Date.now());
  //   set(newProfileRef, data)
  //     .then(() => console.log('Data saved successfully!'))
  //     .catch((error) => {
  //       console.error('Failed to save data:', error);
  //       alert('Failed to save profile.');
  //     });
  // };




  return (
    <div className='form-container'>
       <form onSubmit={handleSubmit} className="profile-form">
      <fieldset>
        <legend>Profile Information</legend>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleInputChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required />
        </div>

        {/* New field for consequences_Status (bool) */}
        <div className="form-group">
          <label htmlFor="consequences_Status">Consequences Status:</label>
          <input
            type="checkbox"
            id="consequences_Status"
            name="consequencesStatus"
            checked={formData.consequencesStatus}
            onChange={handleInputChange} />
        </div>
        
        {/* New field for consequences (string) */}
        <div className="form-group">
          <label htmlFor="consequences">Consequences:</label>
          <input
            type="number"
            id="consequences"
            name="consequences"
            value={formData.consequences}
            onChange={handleInputChange}
            required />
        </div>
        
        {/* New field for atk (number) */}
        <div className="form-group">
          <label htmlFor="atk">ATK:</label>
          <input
            type="number"
            id="atk"
            name="atk"
            value={formData.atk}
            onChange={handleInputChange}
            required />
        </div>

                {/* New field for def (number) */}
                <div className="form-group">
          <label htmlFor="def">DEF:</label>
          <input
            type="number"
            id="def"
            name="def"
            value={formData.def}
            onChange={handleInputChange}
            required />
        </div>

       {/* New dropdown field for contract_type */}
        <div className="form-group">
          <label htmlFor="contract_type">Contract Type:</label>
          <select
            id="contract_type"
            name="contractType"
            value={formData.contractType}
            onChange={handleInputChange}
            required>
            <option value="">Select Contract Type</option>
            <option value="open">Open</option>
            <option value="exclusive">Exclusive</option>
          </select>
        </div>


        {/* New field for reward (string) */}
        <div className="form-group">
          <label htmlFor="reward">Reward:</label>
          <input
            type="text"
            id="reward"
            name="reward"
            value={formData.reward}
            onChange={handleInputChange}
            required />
        </div>

        {/* New field for location (string) */}
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required />
        </div>

        {/* New field for rules (string) */}
        <div className="form-group">
          <label htmlFor="rules">Rules:</label>
          <textarea
            id="rules"
            name="rules"
            value={formData.rules}
            onChange={handleInputChange}
            required />
        </div>

        {/* New field for closer (string) */}
        <div className="form-group">
          <label htmlFor="closer">Closer:</label>
          <input
            type="text"
            id="closer"
            name="closer"
            value={formData.closer}
            onChange={handleInputChange}
            required />
        </div>

        {/* New field for lock_On_Status (bool) */}
<div className="form-group">
  <label htmlFor="lock_On_Status">Lock-On Status:</label>
  <input
    type="checkbox"
    id="lock_On_Status"
    name="lockOnStatus"
    checked={formData.lockOnStatus}
    onChange={handleInputChange} />
</div>

{/* New field for objective (string) */}
<div className="form-group">
  <label htmlFor="objective">Objective:</label>
  <input
    type="text"
    id="objective"
    name="objective"
    value={formData.objective}
    onChange={handleInputChange}
    required />
</div>

{/* New field for tracking_status (bool) */}
<div className="form-group">
  <label htmlFor="tracking_status">Tracking Status:</label>
  <input
    type="checkbox"
    id="tracking_status"
    name="trackingStatus"
    checked={formData.trackingStatus}
    onChange={handleInputChange} />
</div>

{/* New field for contract_status (bool) */}
<div className="form-group">
  <label htmlFor="contract_status">Contract Status:</label>
  <input
    type="checkbox"
    id="contract_status"
    name="contractStatus"
    checked={formData.contractStatus}
    onChange={handleInputChange} />
</div>
        <button type="submit" className="save-btn">Save Profile</button>
      </fieldset>
    </form>
           <div >
            <Link to="/dashboard">Back to Dashboard</Link>
          </div>

    </div>
   
  );
}

export default ContractProfileForm;






  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.image && formData.name && formData.bio) {
  //     try {
  //       // Correct the reference here to use 'ref' instead of 'storageRef'
  //       const imgRef = ref(storage, `images/${formData.image.name}`);
  //       const snapshot = await uploadBytes(imgRef, formData.image);
  //       const imageUrl = await getDownloadURL(snapshot.ref);
  //       onSave({ ...formData, imageUrl }); // Also, use the onSave from props or firebaseUtilityFunctions
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //       alert('Failed to upload image.');
  //     }
  //   } else {
  //     alert('Please fill all required fields and select an image.');
  //   }
  // };



// function ContractProfileForm({ onSave }) {
//   const [name, setName] = useState('');
//   const [bio, setBio] = useState('');
//   const [image, setImage] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'name') {
//       setName(value);
//     } else if (name === 'bio') {
//       setBio(value);
//     }
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (image && name && bio) {
//       try {
//         const storageRef = ref(storage, `images/${image.name}`);
//         const snapshot = await uploadBytes(storageRef, image);
//         const imageUrl = await getDownloadURL(snapshot.ref);
//         saveToDatabase(name, bio, imageUrl);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('Failed to upload image.');
//       }
//     } else {
//       alert('Please fill all fields and select an image.');
//     }
//   };

//   const saveToDatabase = (name, bio, imageUrl) => {
//     const newProfileRef = dbRef(database, 'profiles/' + Date.now());
//     set(newProfileRef, {
//       name: name,
//       bio: bio,
//       imageUrl: imageUrl
//     })
//     .then(() => console.log('Data saved successfully!'))
//     .catch((error) => {
//       console.error('Failed to save data:', error);
//       alert('Failed to save profile.');
//     });
//   };
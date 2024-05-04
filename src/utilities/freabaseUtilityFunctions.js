// firebaseUtilityFunctions.js
import { storage, database } from '../../firebase-config';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, set } from 'firebase/database';

// Function to handle saving the profile
export async function onSave(profileData) {
  // Extract the image file from the data object
  const { image, ...dataWithoutImage } = profileData;
  // Generate a unique file name here if needed
  const imageRef = storageRef(storage, `images/${image.name}`);
  
  // Upload image and save profile data to Firestore
  try {
    const snapshot = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(snapshot.ref);
    await saveToDatabase({ ...dataWithoutImage, imageUrl });
  } catch (error) {
    console.error('Error uploading image or saving profile data:', error);
    throw error;
  }
}

// Function to save profile data to Firebase Realtime Database
async function saveToDatabase(profileData) {
  const newProfileRef = databaseRef(database, 'profiles/' + Date.now());
  try {
    await set(newProfileRef, profileData);
    console.log('Profile data saved successfully');
    alert('Profile Saved Successfully!!!');
  } catch (error) {
    console.error('Failed to save profile data:', error);
    throw error;
  }
}
// import { storage, database } from '../../firebase-config';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { ref as databaseRef, set } from 'firebase/database';

// // Function to handle saving the profile
// // Now accepts a profileData object instead of individual parameters
// export async function onSave(profileData) {
//   const { imageFile, ...dataWithoutImage } = profileData;
//   const imageRef = storageRef(storage, `images/${imageFile.name}`);
//   try {
//     const snapshot = await uploadBytes(imageRef, imageFile);
//     const imageUrl = await getDownloadURL(snapshot.ref);
//     await saveToDatabase({ ...dataWithoutImage, imageUrl });
//     console.log('Profile saved:', { ...dataWithoutImage, imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error; // Re-throw to handle it in the component
//   }
// }

// // Function to save profile data to Firebase Realtime Database
// // Now handles the complete profileData object
// function saveToDatabase(profileData) {
//   const newProfileRef = databaseRef(database, 'profiles/' + Date.now());
//   set(newProfileRef, profileData)
//     .then(() => {
//       console.log('Data saved successfully!');
//       alert('Profile saved successfully!');
//     })
//     .catch((error) => {
//       console.error('Failed to save data:', error);
//       alert('Failed to save profile.');
//     });
// }

// import { storage } from '../../firebase-config';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { database } from '../../firebase-config';
// import { ref, set } from 'firebase/database';



// // Function to handle saving the profile
// export async function onSave(name, bio, imageFile) {
//   const storageRef = ref(storage, `images/${imageFile.name}`);
//   try {
//     const snapshot = await uploadBytes(storageRef, imageFile);
//     const imageUrl = await getDownloadURL(snapshot.ref);
//     await saveToDatabase(name, bio, imageUrl);
//     console.log('Profile saved:', { name, bio, imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error; // Re-throw to handle it in the component
//   }
// }


  

// // Function to save profile data to Firebase Realtime Database
// function saveToDatabase(name, bio, imageUrl) {
//     // Create a unique key for each new profile
//     const newProfileRef = ref(database, 'profiles/' + Date.now());
    
//     // Set the profile data at the new reference
//     set(newProfileRef, {
//       name: name,
//       bio: bio,
//       imageUrl: imageUrl
//     })
//     .then(() => {
//       console.log('Data saved successfully!');
//       alert('Profile saved successfully!');
//     })
//     .catch((error) => {
//       console.error('Failed to save data:', error);
//       alert('Failed to save profile.');
//     });
//   }

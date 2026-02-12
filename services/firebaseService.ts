
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1kKKnFiA9B74Wwze6ez9u5VzkPSe8W3o",
  authDomain: "rahimfirebase-d2b08.firebaseapp.com",
  projectId: "rahimfirebase-d2b08",
  storageBucket: "rahimfirebase-d2b08.firebasestorage.app",
  messagingSenderId: "165308664411",
  appId: "1:165308664411:web:4a1a243b3f32f1a187cd7e",
  measurementId: "G-XPHMSFJW16"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Saves the user's percentage choice to Firestore.
 * If permissions are missing (common during setup), it falls back to LocalStorage
 * so the user experience is not broken.
 */
export const saveResponse = async (percentage: string): Promise<void> => {
  try {
    await addDoc(collection(db, "valentine_responses"), {
      selected_percentage: percentage,
      timestamp: serverTimestamp(),
    });
    console.log('Successfully saved to Cloud Firestore');
  } catch (error: any) {
    // If we get a permission error, it's likely the Firestore Rules need to be updated.
    if (error.code === 'permission-denied') {
      console.warn('Firestore Permission Denied: Please update your Security Rules in the Firebase Console to allow writes to "valentine_responses".');
    } else {
      console.error('Firestore Error:', error);
    }

    // Fallback to local storage so the data isn't lost for the current user
    const existing = JSON.parse(localStorage.getItem('valentine_responses') || '[]');
    existing.push({ 
      selected_percentage: percentage, 
      timestamp: Date.now(),
      status: 'pending_sync' 
    });
    localStorage.setItem('valentine_responses', JSON.stringify(existing));
    
    // We don't re-throw here so the App's Promise.all continues smoothly
  }
};

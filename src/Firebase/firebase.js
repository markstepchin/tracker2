// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // this.auth = app.auth();
    this.db = getDatabase(app);

    // const analytics = getAnalytics(app);
    getAnalytics(app);
  }

  saveWorkout = (progress) => {
    console.log({ progress })

    // Create a new post reference with an auto-generated id
    const db = getDatabase();
    const postListRef = ref(db, 'workouts');
    const newPostRef = push(postListRef);
    set(newPostRef, progress);
  }

  workouts = (onUpdate) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `workouts`)).then((snapshot) => {
      if (snapshot.exists()) {
        const workouts = Object.values(snapshot.val());
        if (workouts) {
          workouts.map(a => console.log(a))
        }
        const workoutArray = Array.from(workouts);

        onUpdate(workoutArray);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}

export default Firebase
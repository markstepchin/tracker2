import './App.css';
import { withFirebase } from './Firebase/context';
import LiveWorkout from './LiveWorkout';


// Greek god program 

// phase 1 (8 weeks)

// phase 2 (8 weeks)

// phase 3 (8 weeks)


/*
where am i in the program

list of workouts

way to view prev workouts
*/

// comment


function App({ firebase }) {
  const onSubmit = (progress) => {
    console.log({ progress });
    console.log(firebase);

    firebase.saveWorkout(progress);
  }

  return <LiveWorkout onSubmit={onSubmit} />;
}

export default withFirebase(App);

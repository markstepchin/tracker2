import logo from './logo.svg';
import './App.css';
import { hangingKneeRaises, inclineBarbellPress, lateralRaises, standingPress, tricepsRopePushdowns } from './exercises';
import { useReducer, useState } from 'react';
import { FirebaseContext } from './Firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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


function App() {
  return (
    <LiveWorkout />
  )
}

export default App;

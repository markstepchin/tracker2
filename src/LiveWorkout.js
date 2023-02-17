import logo from './logo.svg';
import './App.css';
import { hangingKneeRaises, inclineBarbellPress, lateralRaises, standingPress, tricepsRopePushdowns } from './exercises';
import { useReducer, useState } from 'react';
import { FirebaseContext } from './Firebase';


// Greek god program 

// phase 1 (8 weeks)

// phase 2 (8 weeks)

// phase 3 (8 weeks)


/*
where am i in the program

list of workouts

way to view prev workouts
*/

const workoutA = [
  inclineBarbellPress,
  standingPress,
  tricepsRopePushdowns,
  lateralRaises,
  hangingKneeRaises
];

const prevWorkout = {
  inclineBarbellPress: [
    {
      reps: 5,
      weight: 160
    },
    {
      reps: 6,
      weight: 140
    },
    {
      reps: 8,
      weight: 120
    },
  ],
  standingPress: [
    {
      reps: 5,
      weight: 160
    },
    {
      reps: 6,
      weight: 140
    },
    {
      reps: 8,
      weight: 120
    },
  ],
  tricepsRopePushdowns: [
    {
      reps: 5,
      weight: 160
    },
    {
      reps: 6,
      weight: 140
    },
    {
      reps: 8,
      weight: 120
    },
  ],
  lateralRaises: [
    {
      reps: 5,
      weight: 160
    },
    {
      reps: 6,
      weight: 140
    },
    {
      reps: 8,
      weight: 120
    },
    {
      reps: 8,
      weight: 120
    },
  ],
  hangingKneeRaises: [
    {
      reps: 5,
      weight: 160
    },
    {
      reps: 6,
      weight: 140
    },
    {
      reps: 8,
      weight: 120
    },
  ],
}

const RepButton = ({ value, updateValue, min, max, prevValue }) => {
  const updateRep = (e) => {
    if (value === null) {
      updateValue(max)
    } else if (value === 0) {
      updateValue(null);
    } else if (value > 0) {
      updateValue(value - 1);
    } else {
      updateValue(max);
    }
  }

  return (
    <button
      style={{
        width: '72px',
        backgroundColor: value ? 'grey' : "lightgrey",
        // backgroundColor: currentRep >= min ? 'lightgray': "red"
      }}
      onClick={updateRep}>
      {value === 0 ? 'skipped' : value || prevValue}
    </button>
  )
}

const initializeProgress = (workout) =>
  workout.reduce((acc, cur) => ({
    ...acc,
    [cur.id]: cur.sets.map(
      () => ({ reps: null, weight: null })
    ),
  }),
    {},
  );


function reducer(state, action) {
  const { exerciseId, setCount, newValue } = action.payload;
  const updatedState = { ...state };

  updatedState[exerciseId] = [...updatedState[exerciseId]];
  updatedState[exerciseId][setCount] = { ...updatedState[exerciseId][setCount] };

  switch (action.type) {
    case 'updateReps':
      updatedState[exerciseId][setCount].reps = newValue;
      return updatedState;
    case 'updateWeight':
      updatedState[exerciseId][setCount].weight = newValue;
      return updatedState;
    case 'reset':
      return initializeProgress(action.payload);
    default:
      throw new Error();
  }
}

function LiveWorkout() {
  const [progress, dispatch] = useReducer(reducer, workoutA, initializeProgress);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Greek God
        </p>
        <b>Workout A (Phase One)</b>
      </header>
      <section style={{ display: "flex" }}>
        <div style={{ width: "66%" }}>
          {workoutA.map(exercise =>
            <div key={exercise.id}>
              <h3>
                {exercise.name
                  .concat(exercise.type ? ` (${exercise.type})` : ``)
                  .concat(":")
                }
              </h3>
              {exercise.sets.map((set, i) => (
                <div style={{ display: 'flex', }} key={`${exercise.id}-${i}`}>
                  <RepButton
                    updateValue={(newValue) =>
                      dispatch({
                        type: 'updateReps',
                        payload: {
                          exerciseId: exercise.id,
                          setCount: i,
                          newValue
                        },
                      })
                    }
                    value={progress[exercise.id][i]?.reps}
                    prevValue={prevWorkout[exercise.id][i]?.reps}
                    min={set.min}
                    max={set.max}
                  />
                  <div>
                    <input
                      style={{ width: '36px' }}
                      onChange={(e) =>
                        dispatch({
                          type: 'updateWeight',
                          payload: {
                            exerciseId: exercise.id,
                            setCount: i,
                            newValue: e.target.value
                          },
                        })
                      }
                      value={progress[exercise.id][i].weight || ''}
                    // defaultValue={prevWorkout[exercise.id][i].weight}
                    />
                    lbs
                  </div>

                  <div style={{ marginLeft: '24px' }}>{' '}prev: {prevWorkout[exercise.id][i].reps}x{prevWorkout[exercise.id][i].weight} </div>
                </div>

              ))}
            </div>
          )}
        </div>
        <pre style={{ width: '33%' }}>{JSON.stringify(progress, null, 2)}</pre>
      </section>
      <section>
        Timer
      </section>
    </div>
  );
}

export default LiveWorkout;

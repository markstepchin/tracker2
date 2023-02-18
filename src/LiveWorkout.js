import './App.css';
import { hangingKneeRaises, inclineBarbellPress, lateralRaises, standingPress, tricepsRopePushdowns } from './exercises';
import { useEffect, useReducer, memo, useMemo } from 'react';
import RepButton from './RepButton';

const PureRepButton = memo(RepButton);

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

function LiveWorkout({ onSubmit }) {
  const [progress, dispatch] = useReducer(reducer, workoutA, initializeProgress);

  const updateReps = useMemo(() => (newValue, i, exerciseId) =>
    dispatch({
      type: 'updateReps',
      payload: {
        exerciseId,
        setCount: i,
        newValue
      },
    }), [])

  return (
    <div className=" max-w-sm mx-auto">

      <div className="flex justify-between align-middle my-5">
        <h1 className="text-2xl">Workout A - Phase One</h1>
        <button
          class="bg-gray-800 text-white font-bold rounded-full px-4 py-2 shadow-lg uppercase tracking-wider"
          onClick={() => onSubmit(progress)}
        >
          Save
        </button>
      </div>

      <section style={{ display: "flex" }}>
        <div >
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
                  <PureRepButton
                    updateValue={updateReps}
                    value={progress[exercise.id][i]?.reps}
                    prevValue={prevWorkout[exercise.id][i]?.reps}
                    min={set.min}
                    max={set.max}
                    setIndex={i}
                    exerciseId={exercise.id}
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
                        })}
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
        {/* <pre style={{ width: '33%' }}>{JSON.stringify(progress, null, 2)}</pre> */}
      </section>
      <section>
        Timer
      </section>
    </div >
  );
}

export default LiveWorkout;

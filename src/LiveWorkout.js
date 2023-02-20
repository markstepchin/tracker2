import './App.css';
import { hangingKneeRaises, inclineBarbellPress, lateralRaises, standingPress, tricepsRopePushdowns } from './exercises';
import { useReducer, memo, useMemo } from 'react';
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
      () => ({ reps: null, weight: null, complete: false })
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
    case 'toggleComplete':
      const currentSet = updatedState[exerciseId][setCount];

      if (currentSet.reps === null || currentSet.weight === null) {
        currentSet.complete = "error"
        return updatedState;
      }

      currentSet.complete = currentSet.complete === "error" ? true : !currentSet.complete;
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
    <div className=" max-w-md mx-auto p-4  bg-white rounded-md shadow my-7">
      <div className="flex justify-between align-middle my-5" >
        <h1 className="text-2xl">Workout A - Phase One</h1>
        <button
          class="bg-gray-800 text-white font-bold rounded px-4 py-2 shadow-lg uppercase tracking-wider"
          onClick={() => onSubmit(progress)}
        >
          FINISH
        </button>
      </div >

      <section>
        <div >
          {workoutA.map(exercise =>
            <div key={exercise.id}>
              <h3 className="font-medium text-sky-600 mb-2 mt-7">
                {exercise.name
                  .concat(exercise.type ? ` (${exercise.type})` : ``)
                }
              </h3>

              <table className="w-full text-sm  text-gray-500 dark:text-gray-400 mb-5">
                <thead className="text-xs font-extralight text-gray-500 uppercase mb-5">
                  <tr className="pb-5">
                    {/* <th className="text-left">SET</th> */}
                    <th className="text-start">PREVIOUS</th>
                    <th>
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-4 mr-1"
                          fill="#b7b7b7"
                          viewBox="0 0 375 375"
                        >
                          <g stroke-width="0"></g>
                          <g stroke-linecap="round" stroke-linejoin="round"></g>
                          <g>
                            <g>
                              <path d="M360,172.5h-15v-55c0-3.979-1.58-7.794-4.394-10.607c-2.813-2.813-6.628-4.393-10.606-4.393h-70 c-8.284,0-15,6.716-15,15v55H135v-55c0-8.284-6.717-15-15-15H50c-3.979,0-7.793,1.58-10.606,4.393 C36.58,109.706,35,113.521,35,117.5v55H15c-8.284,0-15,6.715-15,15c0,8.283,6.716,15,15,15h20v55c0,8.283,6.716,15,15,15h70 c3.978,0,7.793-1.58,10.606-4.393c2.813-2.813,4.394-6.629,4.394-10.607v-55h110v55c0,3.978,1.58,7.794,4.394,10.607 c2.813,2.813,6.628,4.393,10.606,4.393h70c8.283,0,15-6.717,15-15v-55h15c8.283,0,15-6.717,15-15 C375,179.215,368.283,172.5,360,172.5z"></path>
                            </g>
                          </g>
                        </svg>
                        <span>
                          LBS
                        </span>
                      </div>

                    </th>
                    <th className="text-center">REPS</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {exercise.sets.map((set, i) => {
                    const inProgressSet = progress[exercise.id][i];

                    return (
                      <tr key={`${exercise.id}-${i}`} className={inProgressSet.complete === true ? "bg-green-100" : inProgressSet.complete === 'error' ? "bg-red-100" : ''}>
                        {/* <td>{i + 1}</td> */}
                        <td className="text-start">
                          {prevWorkout[exercise.id][i].weight} lbs x {prevWorkout[exercise.id][i].reps}
                        </td>

                        <td className="text-center">
                          <input
                            className="text-center appearance-none rounded py-1 px-2 bg-zinc-100 text-gray-900 focus:outline-none focus:border-gray-400 w-20"
                            type="number"
                            onChange={(e) =>
                              dispatch({
                                type: 'updateWeight',
                                payload: {
                                  exerciseId: exercise.id,
                                  setCount: i,
                                  newValue: e.target.value
                                },
                              })}
                            value={inProgressSet.weight || ''}
                            // defaultValue={prevWorkout[exercise.id][i].weight}
                            defaultValue={0}
                          />
                        </td>
                        <td className="text-center">
                          <PureRepButton
                            updateValue={updateReps}
                            value={inProgressSet?.reps}
                            prevValue={prevWorkout[exercise.id][i]?.reps}
                            min={set.min}
                            max={set.max}
                            setIndex={i}
                            exerciseId={exercise.id}
                          />
                        </td>
                        <td className="text-xs">
                          ({set.min}-{set.max})
                        </td>
                        <td>
                          <button
                            className={`bg-zinc-200 rounded-2xl px-2 py-1 ${inProgressSet.complete === true ? 'bg-green-500' : ''}`}
                            onClick={() => dispatch({
                              type: 'toggleComplete',
                              payload: {
                                exerciseId: exercise.id,
                                setCount: i,
                              },
                            })}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={inProgressSet.complete === true ? "green" : "currentColor"} className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </button>
                        </td>

                      </tr>

                    )
                  }
                  )}
                </tbody>

              </table>

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

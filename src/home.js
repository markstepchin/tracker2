import { useEffect, useState } from 'react';
import './App.css';
import { withFirebase } from './Firebase/context';


// Greek god program 

// phase 1 (8 weeks)

// phase 2 (8 weeks)

// phase 3 (8 weeks)


/*
where am i in the program

list of workouts

way to view prev workouts
*/


function Home({ firebase }) {
  const [workouts, setWorkouts] = useState(undefined);

  useEffect(() => {
    firebase.workouts((newWorkouts) => {
      if (newWorkouts) {
        setWorkouts(newWorkouts);
      }
    });
  }, [firebase])

  if (workouts === undefined || workouts === null) {
    console.log('✅ variable is NOT undefined or null');
    return null;
  }

  const workoutInProgress = false;

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex justify-between p-4 bg-white rounded-md shadow my-10">
        <div>
          <h3 className="text-xs font-medium text-gray-500">{workoutInProgress ? 'Up Next: ' : 'Workout In Progress:'}</h3>
          Workout A
        </div>

        <a href="/in-progress">
          <button
            class="bg-gray-800 text-white font-bold rounded-full px-4 py-2 shadow-lg uppercase tracking-wider"
          >
            {workoutInProgress ? "Start" : "Continue"}
          </button>
        </a>
      </div>


      <h3 className='text-lg font-medium mb-2'>History</h3>

      {
        workouts.map(workout => (
          <div className="p-4  bg-white rounded-md shadow mb-3">
            <div className="flex justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-500">Workout A</h3>
              <span className="text-xs font-medium text-gray-500">Fri, Feb 17, 2023</span>
            </div>

            <div className="divide-solid divide-y">
              {Object.keys(workout).map(exercise => {
                console.log(workout[exercise])
                const sets = workout[exercise];

                return (
                  <div className="m-0 py-1">
                    <h5>{exercise}</h5>
                    <div className="text-slate-500">{sets.map((set, i) => <span>{i !== 0 && ', '}{set.reps}x{set.weight} lbs</span>)}</div>
                  </div>)
              })}
            </div>

          </div>
        )
        )
      }
      {/* <pre>{JSON.stringify(workouts, null, 2)}</pre> */}
    </div>
  );
}

export default withFirebase(Home);

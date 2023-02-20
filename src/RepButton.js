import React from "react";

const RepButton = ({ value, updateValue, min, max, prevValue, setIndex, exerciseId }) => {
  console.log("RepButton")

  const updateRep = (e) => {
    if (value === null) {
      updateValue(prevValue, setIndex, exerciseId)
    }
    // else if (value === 0) {
    //   updateValue(min);
    // } 
    else if (value < max) {
      updateValue(value + 1, setIndex, exerciseId);
    } else {
      updateValue(0, setIndex, exerciseId);
    }
  }

  const color = !value ? '' : value >= min && value <= max ? 'bg-green-400' : 'bg-red-300';

  return (
    <button
      className={`rounded py-1 px-2 bg-zinc-100 text-gray-700 ${color} w-16`}
      onClick={updateRep}>
      {value === 0 ? 'skipped' : value || prevValue}
    </button>
  )
}

export default RepButton;
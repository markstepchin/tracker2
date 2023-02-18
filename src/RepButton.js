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

  const color = !value ? 'lightgrey' : value >= min && value <= max ? 'green' : 'red';

  return (
    <button
      style={{
        width: '72px',
        backgroundColor: color,
        // backgroundColor: currentRep >= min ? 'lightgray': "red"
      }}
      onClick={updateRep}>
      {value === 0 ? 'skipped' : value || prevValue}
    </button>
  )
}

export default RepButton;
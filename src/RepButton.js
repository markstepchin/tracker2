import React from "react";

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

export default RepButton
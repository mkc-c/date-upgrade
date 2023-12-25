import { useState } from "react";

function Counter() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  function handleCountDown() {
    setCount((currentCount) => {
      if (steps === 1) return count - 1;
      else return currentCount - steps;
    });

    setDate(new Date(date.setDate(date.getDate() - 1)));
  }

  function handleCountUp() {
    setCount((currentCount) => {
      if (steps === 1) return count + 1;
      else return currentCount + steps;
    });

    setDate(new Date(date.setDate(date.getDate() + 1)));
  }

  function handleSliderChange(event) {
    setSteps(Number(event.target.value));
    setCount((currentCount) => {
      return currentCount + steps;
    });
  }

  function handleChange(event) {
    setCount(parseInt(event.target.value) || 0);

    setDate(new Date(date.setDate(date.getDate() + count)));
  }

  function formattedDate() {
    return date.toDateString();
  }

  function renderedDate() {
    if (date.toDateString() === new Date().toDateString() || count === 0) {
      return `Today is ${formattedDate()}`;
    } else {
      return `${Math.abs(count)} day${
        Math.abs(count) !== 1 ? "s" : ""
      } from today is ${formattedDate()}`;
    }
  }

  function handleReset() {
    setSteps(1);
    setCount(0);
  }

  function renderResetButton() {
    if (steps === 1 && count !== 0)
      return (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      );
  }

  return (
    <div className="counter">
      <div className="counter__steps">
        <input
          type="range"
          min={0}
          max={10}
          value={steps}
          onChange={handleSliderChange}
        />
        <p>{steps}</p>
      </div>

      <div className="counter__count">
        <button onClick={handleCountDown}>-</button>
        <span>
          <input type="text" value={Number(count)} onChange={handleChange} />
        </span>
        <button onClick={handleCountUp}>+</button>
      </div>
      <div className="counter__date">{renderedDate()}</div>
      {renderResetButton()}
    </div>
  );
}

export default Counter;

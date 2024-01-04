import { useState, useRef } from "react";

function Counter() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(0);

  const inputRef = useRef();

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleCountDown() {
    setCount((prevCount) => prevCount - steps);
  }

  function handleCountUp() {
    setCount((prevCount) => prevCount + steps);
  }

  function handleSliderChange(event) {
    setSteps(Number(event.target.value));

    if (event.target === inputRef.current)
      setCount((currentCount) => {
        return currentCount + steps;
      });
  }

  function handleChange(event) {
    if (event.target.type === inputRef.current.type)
      setCount(parseInt(event.target.value) || 0);
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
          <input
            ref={inputRef}
            type="text"
            value={Number(count)}
            onChange={handleChange}
          />
        </span>
        <button onClick={handleCountUp}>+</button>
      </div>
      <div className="counter__date">{renderedDate()}</div>
      {renderResetButton()}
    </div>
  );
}

export default Counter;

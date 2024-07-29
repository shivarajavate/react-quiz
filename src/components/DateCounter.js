import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const date = new Date();
  date.setDate(date.getDate() + state.count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
          }
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <input
          type="number"
          value={state.count}
          onChange={(e) =>
            dispatch({ type: "SET_COUNT", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

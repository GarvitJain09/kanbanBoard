import React, { useCallback, useRef, useState } from "react";
import "./styles.css";

export default function KanbanBoard(props) {
  let [tasks, setTasks] = React.useState([
    { name: "1", stage: 0, id: "1_0" },
    { name: "2", stage: 0, id: "2_1" },
  ]);
  // const [onTaskEntry, setOnTaskEntry] = useState("");
  const onTaskEntry = useRef("");
  let [stagesNames, setStagesNames] = React.useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }
  const OnMove = useCallback((e, id, type) => {
    setTasks((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            stage: type === "forward" ? obj.stage + 1 : obj.stage - 1,
          };
        }
        return obj;
      });

      return newState;
    });
  }, []);
  const OnDelete = useCallback((id) => {
    setTasks((prevState) => {
      return prevState.filter((obj) => obj.id !== id);
    });
  });
  const OnNewTaskEntry = useCallback(
    (event) => {
      event.preventDefault();
      if (onTaskEntry.current.value !== "") {
        let newValue = onTaskEntry.current.value;
        setTasks((prevState) => {
          return [
            ...prevState,
            {
              name: newValue,
              stage: 0,
              id: `${newValue}_${prevState.length}`,
            },
          ];
        });
      }
      onTaskEntry.current.value = "";
    },
    [onTaskEntry.current.value],
  );
  console.log(tasks);
  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          ref={onTaskEntry}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          onClick={OnNewTaskEntry}
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${task.name
                              ?.split(" ")
                              ?.join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              disabled={task.stage === 0}
                              onClick={(e) => OnMove(e, task.id, "backward")}
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              disabled={task.stage === 3}
                              onClick={(e) => OnMove(e, task.id, "forward")}
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                              onClick={() => OnDelete(task.id)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

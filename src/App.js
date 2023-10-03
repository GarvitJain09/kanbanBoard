import React, { useCallback, useRef, useState } from "react";
import "./styles.css";

export default function KanbanBoard(props) {
  let [tasks, setTasks] = React.useState([
    { name: "Dummy Task 1", stage: 0, id: "1_0" },
    { name: "Dummy Task 2", stage: 0, id: "2_1" },
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
    <div className="container">
      <section className="d-flex justify-content-center mt-4 mb-4 mx-auto">
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

      <div className="row">
        {stagesTasks.map((tasks, i) => {
          return (
            // <div className="col-md-3">
            <div className="card col m-1" key={`${i}`}>
              <div className="card-body">
                <div className="card-title">
                  <h4>{stagesNames[i]}</h4>
                </div>
                <div className="card-text">
                  <ul className="styled mt-4" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li
                          className="slide-up-fade-in list-group-item d-flex justify-content-between align-items-center mb-2"
                          key={`${i}${index}`}
                        >
                          <div className="d-flex flex-column justify-content-center align-items-center w-100">
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-arrow-left"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                  />
                                </svg>{" "}
                              </button>
                              <button
                                disabled={task.stage === 3}
                                onClick={(e) => OnMove(e, task.id, "forward")}
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-arrow-right"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                  />
                                </svg>
                              </button>
                              <button
                                className="btn btn-dange"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                                onClick={() => OnDelete(task.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="red"
                                  class="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg>{" "}
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

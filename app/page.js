"use client";
import React, { useState } from "react";

const page = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setmainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setmainTask([...mainTask, { task, desc }]);
    setTask("");
    setDesc("");
    console.log(mainTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
  };

  const doneHandler = (i) => {
    setmainTask(prevMainTask => {
      const updatedTasks = [...prevMainTask];
      if (!updatedTasks[i].completed) {
        updatedTasks[i].completed = true;
      }
      return updatedTasks;
    });
  };

  let renderTask = <h2 className="text-lg font-bold">No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex justify-between items-center mb-4">
          <div className="flex justify-between w-2/3 items-center">
            <h3 className={`text-lg font-bold uppercase ${t.completed ? 'line-through' : ''}`}>{t.task}</h3>
            <h5 className={`text-base font-medium ${t.completed ? 'line-through' : ''}`}>{t.desc}</h5>
          </div>
          <button
            onClick={() => {
              doneHandler(i);
            }}
            className= {`px-4 py-1 bg-green-600 hover:bg-green-700 bg rounded-lg font-semibold`}
          >
            {t.completed ? "Completed" : "Done"}
          </button>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="px-4 py-1 bg-red-600 font-semibold hover:bg-red-800 rounded-lg"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="p-4 text-center text-3xl font-extrabold bg-gray-900">
        TO-DO
      </h1>
      <form
        action=""
        className="w-full flex flex-col items-center"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          name="task"
          id="task"
          className="px-4 py-2 border-2 border-slate-300 bg-black my-10 w-5/6 text-center"
          placeholder="Enter task here"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <input
          type="text"
          name="desc"
          id="desc"
          className="px-4 py-2 border-2 border-slate-300 bg-black mb-10 w-5/6 text-center"
          placeholder="Enter description here"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <button className="border-2 px-7 py-1 text-xl font-extrabold rounded-lg bg-slate-300 hover:border-2 text-black hover:border-slate-300 hover:bg-black hover:text-slate-300 transition-all duration-1000">
          Add
        </button>
      </form>

      <br />
      <hr />

      <div className="px-5 py-3 m-5 bg-slate-600">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;

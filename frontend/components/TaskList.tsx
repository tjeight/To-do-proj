"use client";

import React, { useEffect, useState } from "react";
import api from "../lib/axios";

// ✅ Task type definition
interface Task {
  _id: string;
  task: string;
  date: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");

  // ✅ Add new task
  const addTaskFun = async () => {
    try {
      const date = new Date().toISOString();
      const response = await api.post<Task>("/tasks", {
        task: taskInput,
        date,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskInput("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error adding task:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  // ✅ Fetch all tasks on mount
  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching tasks:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Remove task
  const removeTaskFun = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting task:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-5 ">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          📝 To-Do List
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            className="flex-grow border border-purple-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            className="text-white bg-purple-600 hover:bg-purple-700 rounded px-4 py-2 text-xl"
            onClick={addTaskFun}
          >
            ➕
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            📋 Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center bg-purple-100 border border-purple-300 rounded p-3 shadow-sm"
                >
                  <div className="text-purple-800 font-medium">
                    {task.task} —{" "}
                    <span className="text-sm text-gray-600">
                      {new Date(task.date).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTaskFun(task._id)}
                    className="text-green-600 hover:text-green-800 text-xl"
                    title="Mark as Done"
                  >
                    ✅
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;

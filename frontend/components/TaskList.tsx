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
    } catch (err: any) {
      console.error(
        "Error adding task:",
        err.response?.data?.error || err.message
      );
    }
  };

  // ✅ Fetch all tasks on mount
  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (err: any) {
      console.error(
        "Error fetching tasks:",
        err.response?.data?.error || err.message
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const removeTaskFun = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err: any) {
      console.error(
        "Error deleting task:",
        err.response?.data?.error || err.message
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <input
          type="text"
          className="border rounded text-center"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="ml-2 text-2xl" onClick={addTaskFun}>
          ➕
        </button>
      </div>

      <div>
        <p className="text-2xl text-center mt-3">All Tasks</p>
        <ul className="text-center mt-2">
          {tasks.map((task) => (
            <div className="flex justify-center gap-4 mt-2" key={task._id}>
              <li>
                {task.task} - {new Date(task.date).toLocaleDateString()}
              </li>
              <button
                onClick={() => removeTaskFun(task._id)}
                className="text-green-600 hover:text-green-800"
              >
                ✅
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;

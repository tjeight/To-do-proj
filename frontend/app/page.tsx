import TaskList from "@/components/TaskList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p className="text-center font-bold text-4xl">To Do List</p>

      <TaskList />
    </div>
  );
}

"use client";

import Table from "../components/Table";
import { useEffect, useState } from "react";
import { Task } from "@/components/UpdateForm";
import { createTask, getTasks } from "@/useServer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [todos, setTodos] = useState<Task[]>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      const res: Task[] = (await getTasks()) as unknown as Task[];
      setTodos(res);
    }
    fetchTodos();
  }, [update]);

  function handleSubmit(event: any) {
    event.preventDefault();
    createTask(new FormData(event.currentTarget));
    setUpdate(!update);
    // router.push("/");
  }

  return (
    <div className="flex flex-col items-center ">
      <header className="bg-black w-full py-2">
        <h4 className="text-white text-center text-2xl">Task Master</h4>
      </header>
      <main className="lg:w-4/6 flex flex-col items-center pt-5">
        {todos?.length > 0 ? (
          <Table todos={todos} />
        ) : (
          <p>There are no tasks. Create a new one below..</p>
        )}

        <form
          className="flex gap-2 flex-col items-center w-full pt-5"
          onSubmit={handleSubmit}
        >
          <h4>New task</h4>
          <input
            type="text"
            name="title"
            placeholder="New task title"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <input
            type="text"
            name="content"
            placeholder="New task description"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex justify-between gap-5">
            <button
              type="reset"
              className="border border-slate-300 text-red-600 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Reset Task
            </button>
            <button
              type="submit"
              className="border border-slate-300 text-black-600 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Add Task
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

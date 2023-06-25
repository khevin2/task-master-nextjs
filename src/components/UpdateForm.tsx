"use client";

import { getTask, updateTask, deleteTask } from "@/useServer";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState, useEffect } from "react";

type UpdateFormProps = {
  taskId: string;
};

export type Task = {
  title: string;
  content: string;
  id: string;
  createdAt?: Date;
  updatedat?: Date;
  complete: boolean;
};

export default function UpdateForm({ taskId }: UpdateFormProps) {
  // let task;
  // if (typeof taskId === "string") task = await fetchData(taskId);

  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    content: "",
    complete: false,
  });

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateTask(data);
    router.push("/");
  }

  function handleDelete() {
    deleteTask(taskId);
    router.push("/");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTask: Task = await getTask(taskId);
        setTask(fetchedTask);
      } catch (error) {
        // Handle error
      }
    }

    fetchData();
  }, [taskId]);
  return (
    <form
      className="flex gap-2 flex-col items-center w-full pt-5 mt-5"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="New task title"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        defaultValue={task?.title}
      />
      <input
        type="text"
        name="content"
        placeholder="New task description"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        defaultValue={task?.content}
      />
      <input type="hidden" name="id" value={taskId} readOnly />
      <div className="flex justify-between gap-5">
        <button
          type="button"
          className="border border-slate-300 bg-danger text-red-600 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="submit"
          className="border border-slate-300 text-black-600 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Save
        </button>
      </div>
    </form>
  );
}

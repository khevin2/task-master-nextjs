"use server";
import { prisma } from "@/db";

export async function updateTask(data: FormData) {
  const title = data.get("title")?.valueOf();
  const content = data.get("content")?.valueOf();
  const id: string = data.get("id")?.valueOf() as string;

  console.log(id);

  try {
    await prisma.todo.update({ where: { id }, data: { title, content } });
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getTask(id: string) {
  const task = await prisma.todo.findUnique({ where: { id } });
  if (!task) throw new Error("No task with this Id..");
  return task;
}

export async function createTask(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  const content = data.get("content")?.valueOf();
  if (typeof title !== "string" || title.length === 0)
    throw new Error("Invalid title");
  if (typeof content !== "string" || content.length === 0)
    throw new Error("Invalid content");

  await prisma.todo.create({ data: { title, content, complete: false } });
}

export async function getTasks() {
  return await prisma.todo.findMany();
}

export async function deleteTask(id: string) {
  return await prisma.todo.delete({ where: { id } });
}

export async function updateCompleteTask(id: string, complete: boolean) {
  return await prisma.todo.update({
    where: { id },
    data: { complete: !complete },
  });
}

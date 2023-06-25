import { updateCompleteTask } from "@/useServer";
import dayjs from "dayjs";
import Link from "next/link";
import { Task } from "./UpdateForm";

type Todo = {
  id: string;
  title: string;
  content: string;
  complete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type TableProps = {
  todos: Task[];
};

export default function Table({ todos }: TableProps) {
  function handleCheck(id: string, complete: boolean) {
    updateCompleteTask(id, complete);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Content</th>
          <th>Date Created</th>
          <th>Action</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.title}</td>
            <td>{todo.content}</td>
            <td>{dayjs(todo.createdAt).format("DD/MM/YYYY HH:mm")}</td>
            <td>
              <Link href={`/edit/${todo.id}`}>Edit</Link>
            </td>
            <td>
              <input
                id={todo.id}
                type="checkbox"
                className="cursor-pointer"
                defaultChecked={todo.complete}
                onChange={() => handleCheck(todo.id, todo.complete)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

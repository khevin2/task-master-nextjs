"use client";

import UpdateForm from "@/components/UpdateForm";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const taskId = params.id;
  if (typeof taskId === "undefined")
    return (
      <>
        <h5>No id provided ``{taskId}``</h5>
      </>
    );

  return (
    <div>
      <header className="bg-black w-full py-2">
        <h4 className="text-white text-center text-2xl">Edit | Task Master</h4>
      </header>
      <UpdateForm taskId={taskId} />
    </div>
  );
}

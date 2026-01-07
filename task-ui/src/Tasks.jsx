import { useEffect, useState } from "react";
import api from "./api";

export default function Tasks({ setAuth }) {
  const [tasks, setTasks] = useState("");
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await api.post("/tasks", { title });
    setTitle("");
    load();
  };

  const logout = async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {tasks.map(t => (
        <div key={t.id}>
          {t.title}
        </div>
      ))}
    </div>
  );
}

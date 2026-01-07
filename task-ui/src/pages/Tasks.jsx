import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../index.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);


  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const saveTask = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, { title,desc });
        setEditingId(null);
      } else {
        await api.post("/tasks", { title,desc });
      }

      setTitle("");
      setDesc("");
      setErrors({});
      fetchTasks();
    } catch (err) {
      if(err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }else{
        console.error(err);
      }
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDesc(task.description);
    setEditingId(task.id);
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="task-container">
        <h2>My Tasks</h2>

        <form onSubmit={saveTask} className="task-form">
          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => {
    setTitle(e.target.value);
    setErrors({}); // clear error while typing
  }}
            required
          />

          {errors.title && (
    <span className="error-text">{errors.title[0]}</span>
  )}

          <input
            type="text"
            placeholder="Enter task Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button>{editingId ? "Update" : "Add"}</button>
        </form>

        



        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(paginatedTasks) &&
              paginatedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>

                  <td>
                    <span
                      className={
                        task.status === 1 ? "status-done" : "status-pending"
                      }
                    >
                      {task.status === 1 ? "Completed" : "Pending"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>



<div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    Prev
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next
  </button>
</div>





      </div>
    </>
  );
}

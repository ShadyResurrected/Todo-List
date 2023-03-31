import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { server } from "../main";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              type="text"
              placeholder="Enter Title"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              type="text"
              placeholder="Enter Description"
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem title={i.title} descripiton={i.description} isCompleted={i.isCompleted}/>
        ))}
      </section>
    </div>
  );
};

export default Home;

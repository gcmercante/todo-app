import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "../components/Header";
import { Task } from "../components/Task";

import clipboard from "../assets/clipboard.svg";
import styles from "./Todo.module.css";

type TaskType = {
  id: string;
  content: string;
  done: boolean;
};

const apiTasks: TaskType[] = [
  {
    id: uuidv4(),
    content: "Fazer componente Header",
    done: true,
  },
  {
    id: uuidv4(),
    content: "Fazer css do componente Header",
    done: false,
  },
  {
    id: uuidv4(),
    content: "Fazer componente Task",
    done: true,
  },
];

export function Todo() {
  const initialTasksValue = useMemo(() => {
    let updatedTasks: TaskType[] = [];

    if (apiTasks.length) {
      updatedTasks = apiTasks.filter((task: TaskType) => !task.done);
      const taskToUpdate = apiTasks.filter((task: TaskType) => task.done);

      if (taskToUpdate) {
        updatedTasks = [...updatedTasks, ...taskToUpdate];
      }
    }

    return updatedTasks;
  }, [apiTasks]);

  const [tasks, setTasks] = useState(initialTasksValue);
  const [task, setTask] = useState("");

  const initialDoneValue = useMemo(() => {
    let count = 0;
    if (tasks.length) {
      tasks.forEach((task: TaskType) => {
        if (task && task.done) {
          count += 1;
        }
      });
    }

    return count;
  }, [tasks]);

  const [doneTasks, setDoneTasks] = useState(initialDoneValue);

  const emptyTask = task.length === 0;

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const newTask: TaskType = {
      id: uuidv4(),
      content: task,
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  }

  function handleTaskContent(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleDeleteTask(taskId: string) {
    let isDone = false;
    const updatedTasks = tasks.filter((task) => {
      if (task.id === taskId && task.done) {
        isDone = true;
      }

      return task.id !== taskId;
    });

    setTasks(updatedTasks);

    if (doneTasks > 0 && isDone) {
      setDoneTasks((state) => state - 1);
    }
  }

  function handleDoneTasks(checked: boolean, id: string) {
    const taskToUpdate = tasks.find((task) => {
      if (task.id === id) {
        task.done = checked;
      }

      return task.id === id;
    });

    const updatedTasks = tasks.filter((task) => task.id !== id);

    if (taskToUpdate) {
      if (checked) {
        setDoneTasks((state) => state + 1);
        setTasks([...updatedTasks, taskToUpdate]);
      } else {
        setTasks([taskToUpdate, ...updatedTasks]);
        setDoneTasks((state) => state - 1);
      }
    }
  }

  return (
    <div>
      <Header />
      <main className={styles.container}>
        <div className={styles.taskContainer}>
          <form className={styles.newTaskBar} onSubmit={handleCreateTask}>
            <input
              onChange={handleTaskContent}
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={task}
            />
            <button type="submit" disabled={emptyTask}>
              Criar
              <PlusCircle size={16} />
            </button>
          </form>
          <div className={styles.taskCount}>
            <div className={styles.taskCreated}>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.taskFinished}>
              <strong>Tarefas concluidas</strong>
              <span>
                {tasks.length === 0 ? 0 : `${doneTasks} de ${tasks.length}`}
              </span>
            </div>
          </div>
          {tasks.length ? (
            tasks.map((task) => {
              return (
                <Task
                  id={task.id}
                  content={task.content}
                  key={task.id}
                  done={task.done}
                  onDeleteTask={handleDeleteTask}
                  onChecked={handleDoneTasks}
                />
              );
            })
          ) : (
            <div className={styles.tasks}>
              <div>
                <img src={clipboard} />
                <div className={styles.empty}>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

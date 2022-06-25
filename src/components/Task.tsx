import { Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  content: string;
  onChecked(checked: boolean, id: string): void;
  onDeleteTask(id: string): void;
  done: boolean;
}

export function Task({
  id,
  content,
  onChecked,
  onDeleteTask,
  done,
}: TaskProps) {
  function handleDelete() {
    onDeleteTask(id);
  }

  function handleDoneTask() {
    onChecked(!done, id);
  }

  return (
    <div className={styles.task}>
      <div>
        <div className={styles.round}>
          <input
            type="checkbox"
            id={id}
            defaultChecked={done}
            onChange={() => {
              handleDoneTask();
            }}
          />
          <label htmlFor={id}></label>
        </div>
        <p className={done ? styles.contentDone : ""}>{content}</p>
      </div>
      <button className={styles.trash} onClick={handleDelete}>
        <Trash size={16} />
      </button>
    </div>
  );
}

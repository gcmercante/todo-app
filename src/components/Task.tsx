import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";

import styles from "./Task.module.css";

export function Task({ id, content, onChecked, onDeleteTask, done }: any) {
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

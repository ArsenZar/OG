import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 🟢 Окремий компонент для елемента
function SortableItem({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "12px 16px",
    marginBottom: "8px",
    border: "1px solid black",
    borderRadius: "12px",
    background: "#fff",
    cursor: "grab",
    listStyle: "none",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </li>
  );
}

// 🟢 Основний список
export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, content: "Стиковка + приварка обичайок S5 + S6" },
    { id: 2, content: "Проварка внутрішнього шва трактором" },
    { id: 3, content: "Приварка трубопроводів верхньої частини" },
    { id: 4, content: "Приварка трубопроводів дна" },
    { id: 5, content: "Гідротестування ємності" },
    { id: 6, content: "Фарбування швів та опорної юбки" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((prev) => {
        const oldIndex = prev.findIndex((task) => task.id === active.id);
        const newIndex = prev.findIndex((task) => task.id === over.id);

        const newTasks = arrayMove(prev, oldIndex, newIndex);

        // 🟢 Перезаписуємо ID відповідно до нового порядку
        return newTasks.map((task, index) => ({
          ...task,
          id: index + 1,
        }));
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Налаштування задач</h2>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul style={{ padding: 0, margin: 0 }}>
            {tasks.map((task) => (
              <SortableItem key={task.id} id={task.id} content={task.content} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

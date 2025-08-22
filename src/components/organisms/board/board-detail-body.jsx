import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useMoveTask } from "@/hooks/use-task";
import { useUpdateBoard } from "@/hooks/use-board";
import { cn } from "@/lib/utils";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColumnCard } from "../../molecules/board/column-card";
import { TaskForm } from "./task-form";
import { AddItemCard } from "@/components/molecules/board/add-item-card";

export const BoardDetailBody = ({
  currentBoard,
  handleCreateColumn,
  handleEditColumn,
  handleDeleteColumn,
  isListView,
}) => {
  const moveTask = useMoveTask(currentBoard._id);
  const reorderColumn = useUpdateBoard();
  const sensors = useSensors(useSensor(PointerSensor));

  const [localColumns, setLocalColumns] = useState(currentBoard.columns || []);
  const prevColumnsRef = useRef(localColumns);

  useEffect(() => {
    setLocalColumns(currentBoard.columns || []);
  }, [currentBoard.columns]);

  const [isOpen, setIsOpen] = useState(false);
  const [columnToAddTask, setColumnToAddTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const columnIds = useMemo(
    () => (localColumns || []).map((c) => c._id),
    [localColumns]
  );

  const handleAddTask = (column) => {
    setColumnToAddTask(column);
    setEditTask(null);
    setIsOpen(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsOpen(true);
  };

  const removeTaskFromColumn = (cols, columnId, taskId) => {
    const idx = cols.findIndex((c) => c._id === columnId);
    if (idx === -1) return cols;

    const col = cols[idx];
    const tasks = col.tasks || [];
    const tIdx = tasks.findIndex((t) => t._id === taskId);
    if (tIdx === -1) return cols;

    const next = [...cols];
    next[idx] = { ...col, tasks: tasks.filter((_, i) => i !== tIdx) };
    return next;
  };

  const addTaskToColumnEnd = (cols, columnId, task) => {
    const idx = cols.findIndex((c) => c._id === columnId);
    if (idx === -1) return cols;

    const col = cols[idx];
    const tasks = col.tasks || [];
    const next = [...cols];
    next[idx] = { ...col, tasks: [...tasks, task] };
    return next;
  };

  const findTask = (cols, columnId, taskId) => {
    const col = cols.find((c) => c._id === columnId);
    if (!col) return null;
    const tasks = col.tasks || [];
    return tasks.find((t) => t._id === taskId) || null;
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeColumnIndex = columnIds.indexOf(active.id);
    const overColumnIndex = columnIds.indexOf(over.id);
    const isColumnDrag = activeColumnIndex !== -1 && overColumnIndex !== -1;

    prevColumnsRef.current = localColumns;

    if (isColumnDrag) {
      const optimistic = arrayMove(
        localColumns,
        activeColumnIndex,
        overColumnIndex
      );
      setLocalColumns(optimistic);

      try {
        const newColumnIds = optimistic.map((x) => x._id);
        await reorderColumn.mutateAsync({
          id: currentBoard._id,
          columns: newColumnIds,
          title: currentBoard.title,
          description: currentBoard?.description,
        });
      } catch {
        setLocalColumns(prevColumnsRef.current);
      }
      return;
    }

    const fromColumnId = active.data?.current;
    const toColumnId = over.id;

    if (!fromColumnId || toColumnId === fromColumnId) return;

    const taskId = active.id;
    const task = findTask(localColumns, fromColumnId, taskId);
    if (!task) return;

    const removed = removeTaskFromColumn(localColumns, fromColumnId, taskId);
    const optimistic = addTaskToColumnEnd(removed, toColumnId, task);
    setLocalColumns(optimistic);

    try {
      await moveTask.mutateAsync({
        id: taskId,
        columnId: toColumnId,
      });
    } catch {
      setLocalColumns(prevColumnsRef.current);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex gap-6 pb-4 lg:min-h-[600px]",
          isListView ? "flex-col" : "overflow-x-auto"
        )}
      >
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={columnIds}
            strategy={
              isListView
                ? verticalListSortingStrategy
                : horizontalListSortingStrategy
            }
          >
            {localColumns.map((column) => (
              <ColumnCard
                key={column._id}
                currentBoard={{ ...currentBoard, columns: localColumns }}
                column={column}
                handleAddTask={handleAddTask}
                handleEditColumn={handleEditColumn}
                handleDeleteColumn={handleDeleteColumn}
                handleEditTask={handleEditTask}
                isListView={isListView}
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className={cn(!isListView && "flex-shrink-0 w-80")}>
          <AddItemCard
            onClick={handleCreateColumn}
            title="Add Column"
            className="!h-[193px]"
          />
        </div>
      </div>

      <TaskForm
        isOpen={isOpen}
        handleOpen={setIsOpen}
        boardId={currentBoard._id}
        column={columnToAddTask}
        defaultValue={editTask}
      />
    </>
  );
};

BoardDetailBody.propTypes = {
  currentBoard: PropTypes.object.isRequired,
  handleCreateColumn: PropTypes.func.isRequired,
  handleEditColumn: PropTypes.func.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired,
};

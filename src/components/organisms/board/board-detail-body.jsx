import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [columnToAddTask, setColumnToAddTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const handleAddTask = (column) => {
    setColumnToAddTask(column);
    setEditTask(null);
    setIsOpen(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsOpen(true);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    // reorder column
    if (!over || active.id === over.id) return;

    const activeColumnIndex = currentBoard.columns.findIndex(
      (col) => col._id === active.id
    );
    const overColumnIndex = currentBoard.columns.findIndex(
      (col) => col._id === over.id
    );

    // 👇 Check if it's a column reorder (they exist in columns array)
    const isColumnDrag = activeColumnIndex !== -1 && overColumnIndex !== -1;

    if (isColumnDrag) {
      const newColumns = arrayMove(
        currentBoard.columns,
        activeColumnIndex,
        overColumnIndex
      );

      const newColumnIds = newColumns.map((x) => x._id);

      await reorderColumn.mutateAsync({
        id: currentBoard._id,
        columns: newColumnIds,
        title: currentBoard.title,
        description: currentBoard?.description,
      });

      return;
    }

    // otherwise move task
    if (over.id === active.data.current) return;

    await moveTask.mutateAsync({
      id: active.id,
      columnId: over.id,
    });
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
            items={currentBoard.columns.map((col) => col._id)}
            strategy={
              isListView
                ? verticalListSortingStrategy
                : horizontalListSortingStrategy
            }
          >
            {currentBoard?.columns.map((column) => (
              <ColumnCard
                key={column._id}
                currentBoard={currentBoard}
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

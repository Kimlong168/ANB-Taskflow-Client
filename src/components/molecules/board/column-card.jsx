import PropTypes from "prop-types";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemControlMenu } from "@/components/atoms/item-control-menu";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./task-card";
import { AddItemCard } from "./add-item-card";
import { GripVertical } from "lucide-react";

export const ColumnCard = ({
  currentBoard,
  column,
  handleAddTask,
  handleEditColumn,
  handleDeleteColumn,
  handleEditTask,
  isListView,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
  });

  const {
    attributes,
    listeners,
    setNodeRef: columnSetNodeRef,
    transform,
    transition,
  } = useSortable({
    id: column._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={columnSetNodeRef}
      style={style}
      className={cn("flex-shrink-0", !isListView && "w-80")}
    >
      <div ref={setNodeRef}>
        <Card
          className={cn("h-full !bg-transparent", isOver && "!border-primary")}
        >
          <CardHeader
            className="rounded-t-lg bg-gray-100 mb-6"
            style={{
              backgroundColor: column?.color,
            }}
          >
            <div className="flex items-center justify-between">
              <CardTitle
                {...attributes}
                {...listeners}
                className="text-sm text-secondary w-full font-medium flex items-center gap-2 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-2">
                  <GripVertical /> {column.title}
                </div>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {column.tasks.length}
                </Badge>
              </CardTitle>

              <ItemControlMenu
                onEdit={() => handleEditColumn(column)}
                onDelete={() => handleDeleteColumn(column)}
              />
            </div>
          </CardHeader>

          <CardContent>
            <div
              className={cn(
                isListView && "grid gap-3 md:grid-cols-2 lg:grid-cols-4 pb-4"
              )}
            >
              {column.tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  currentBoard={currentBoard}
                  handleEditTask={handleEditTask}
                />
              ))}
            </div>

            <AddItemCard
              onClick={() => handleAddTask(column)}
              title="Add Task"
              className="!h-16"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

ColumnCard.propTypes = {
  currentBoard: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleEditColumn: PropTypes.func.isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired,
};

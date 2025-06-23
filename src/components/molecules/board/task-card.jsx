import PropTypes from "prop-types";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { LuFileEdit } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriorityBadge } from "@/components/atoms/priority-badge";
import { useDeleteTask } from "@/hooks/use-task";
import { handleDeleteItem } from "@/utils/handle-delete-item";
import { useDraggable } from "@dnd-kit/core";

export const TaskCard = ({ task, currentBoard, handleEditTask }) => {
  const deleteTask = useDeleteTask(currentBoard._id);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: task.columnId,
  });

  const handleDeleteTask = async () => {
    toast(`Are you sure to delete this task?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () =>
          handleDeleteItem(async () => {
            return await deleteTask.mutateAsync(task._id);
          }),
      },
      className:
        "!bg-red-500 !text-white [&>button]:!bg-white [&>button]:!text-red-500 [&>button]:!font-bold !font-primary",
    });
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="h-full"
      >
        <Card className="mb-3 hover:shadow-md transition-all cursor-grab active:cursor-grabbing !bg-transparent h-full">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm leading-tight text-foreground">
                {task.title}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {task.description}
            </p>
            <div className="flex items-center justify-between relative">
              <PriorityBadge status={task.priority} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        style={style}
        className="absolute right-3 bottom-3  flex justify-end items-center gap-1"
      >
        <Button
          onClick={() => handleEditTask(task)}
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          title="Edit Board"
        >
          <LuFileEdit className="h-3 w-3 text-green-600" />
        </Button>

        <Button
          onClick={handleDeleteTask}
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          title="Delete Board"
        >
          <Trash2 className="h-3 w-3 text-red-600" />
        </Button>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  currentBoard: PropTypes.object.isRequired,
  handleEditTask: PropTypes.func.isRequired,
};

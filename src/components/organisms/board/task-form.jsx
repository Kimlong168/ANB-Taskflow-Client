import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { notify } from "@/utils/toastify";
import { useCreateTask, useUpdateTask } from "@/hooks/use-task";
import { handleSubmitItem } from "@/utils/handle-submit-item";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/text-area";
import { Select } from "@/components/atoms/select";
import { FormWrapper } from "@/components/molecules/form-wrapper";

export const TaskForm = ({
  isOpen,
  handleOpen,
  boardId,
  column,
  defaultValue,
}) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      return notify("Column name is required", "error");
    }

    if (defaultValue) {
      await handleSubmitItem(() =>
        updateTask.mutateAsync({
          id: defaultValue._id,
          columnId: defaultValue.columnId,
          boardId,
          ...formData,
        })
      );
    } else {
      await handleSubmitItem(() =>
        createTask.mutateAsync({
          columnId: column._id,
          boardId,
          ...formData,
        })
      );
    }
    setFormData({ title: "", description: "", priority: 1 });
    handleOpen(false);
  };

  useEffect(() => {
    setFormData({
      title: defaultValue?.title || "",
      description: defaultValue?.description || "",
      priority: defaultValue?.priority || 1,
    });
  }, [defaultValue]);

  return (
    <>
      <FormWrapper
        isOpen={isOpen}
        handleOpen={handleOpen}
        title={defaultValue ? "Edit Task" : `Add New Task to ${column?.title}`}
        isUpdating={defaultValue}
        handleSubmit={handleSubmit}
        disabled={
          !formData.title.trim() || createTask.isLoading || updateTask.isLoading
        }
      >
        <Input
          name="title"
          label="Task Name"
          placeholder="Enter task name..."
          type="string"
          value={formData.title}
          onChange={handleChange}
          required={true}
        />

        <Select
          name="priority"
          label="Priority"
          options={[
            { value: 1, label: "Low" },
            { value: 2, label: "Medium" },
            { value: 3, label: "High" },
          ]}
          value={formData.priority}
          onChange={(v) => setFormData({ ...formData, priority: v })}
          placeholder="select priority"
          defaultValue={1}
          required={true}
        />

        <Textarea
          name="description"
          label="Description"
          placeholder="Enter task description..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </FormWrapper>
    </>
  );
};

TaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  column: PropTypes.object,
  defaultValue: PropTypes.object,
};

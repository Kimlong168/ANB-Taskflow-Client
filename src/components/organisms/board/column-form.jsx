import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { notify } from "@/utils/toastify";
import { useCreateColumn, useUpdateColumn } from "@/hooks/use-column";
import { handleSubmitItem } from "@/utils/handle-submit-item";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/ui/label";
import { FormWrapper } from "@/components/molecules/form-wrapper";

const COLORS = [
  "#bfbfbf",
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#A78BFA",
];

export const ColumnForm = ({ isOpen, handleOpen, boardId, defaultValue }) => {
  const createColumn = useCreateColumn();
  const updateColumn = useUpdateColumn();
  const [formData, setFormData] = useState({
    title: "",
    color: COLORS[0],
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
        updateColumn.mutateAsync({
          id: defaultValue._id,
          boardId,
          ...formData,
        })
      );
    } else {
      await handleSubmitItem(() =>
        createColumn.mutateAsync({
          boardId,
          ...formData,
        })
      );
    }
    setFormData({ title: "", color: COLORS[0] });
    handleOpen(false);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      boardId: boardId,
      title: defaultValue?.title || "",
      color: defaultValue?.color || COLORS[0],
    }));
  }, [defaultValue, boardId]);

  return (
    <FormWrapper
      isOpen={isOpen}
      handleOpen={handleOpen}
      title={defaultValue ? "Edit Column" : "Create New Column"}
      isUpdating={defaultValue}
      handleSubmit={handleSubmit}
      disabled={!formData.title.trim()}
    >
      <Input
        name="title"
        label="Column Name"
        placeholder="Enter column name..."
        type="string"
        value={formData.title}
        onChange={handleChange}
        required={true}
      />

      <Input
        name="color"
        label="Column Color"
        type="color"
        value={formData.color}
        onChange={handleChange}
      />

      <div>
        <Label className="mb-1 block">Or choose a color</Label>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, color }))}
              className={`w-8 h-8 rounded-full border-2 ${
                formData.color === color
                  ? "border-black dark:border-white"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </FormWrapper>
  );
};

ColumnForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
};

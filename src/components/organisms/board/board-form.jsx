import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCreateBoard, useUpdateBoard } from "@/hooks/use-board";
import { notify } from "@/utils/toastify";
import { handleSubmitItem } from "@/utils/handle-submit-item";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/text-area";
import { FormWrapper } from "@/components/molecules/form-wrapper";

export const BoardForm = ({ isOpen, handleOpen, defaultValue }) => {
  const createBoard = useCreateBoard();
  const updateBoard = useUpdateBoard();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      return notify("Board name is required", "error");
    }

    if (defaultValue) {
      await handleSubmitItem(() =>
        updateBoard.mutateAsync({
          id: defaultValue._id,
          ...formData,
        })
      );
    } else {
      await handleSubmitItem(() => createBoard.mutateAsync(formData));
    }
    setFormData({ title: "", description: "" });
    handleOpen(false);
  };

  useEffect(() => {
    setFormData({
      title: defaultValue?.title || "",
      description: defaultValue?.description || "",
    });
  }, [defaultValue]);

  return (
    <FormWrapper
      isOpen={isOpen}
      handleOpen={handleOpen}
      title={defaultValue ? "Edit Board" : "Create New Board"}
      isUpdating={defaultValue}
      handleSubmit={handleSubmit}
      disabled={!formData.title.trim()}
    >
      <Input
        name="title"
        label="Board Name"
        placeholder="Enter board name..."
        type="string"
        value={formData.title}
        onChange={handleChange}
        required={true}
      />
      <Textarea
        name="description"
        label="Description"
        placeholder="Enter board description..."
        value={formData.description}
        onChange={handleChange}
        rows={4}
      />
    </FormWrapper>
  );
};

BoardForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  defaultValue: PropTypes.object,
};

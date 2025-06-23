import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useBoard } from "@/hooks/use-board";
import { useDeleteColumn } from "@/hooks/use-column";
import { handleDeleteItem } from "@/utils/handle-delete-item";
import { BoardDetailHeader } from "@/components/molecules/board/board-detail-header";
import { Loading } from "@/components/atoms/loading";
import { ColumnForm } from "@/components/organisms/board/column-form";
import { MetadataHeader } from "@/components/atoms/metadata-header";
import { BoardDetailBody } from "@/components/organisms/board/board-detail-body";

const BoardDetail = () => {
  const { id } = useParams();
  const deleteColumn = useDeleteColumn(id);
  const { data, isLoading } = useBoard(id);
  const [isOpen, setIsOpen] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [editColumn, setEditColumn] = useState(null);

  const handleCreateColumn = () => {
    setIsOpen(true);
    setEditColumn(null);
  };

  const handleEditColumn = (column) => {
    setEditColumn(column);
    setIsOpen(true);
  };

  const handleDeleteColumn = async (column) => {
    toast(`Are you sure to delete ${column.title}?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () =>
          handleDeleteItem(async () => {
            return await deleteColumn.mutateAsync(column._id);
          }),
      },
      className:
        "!bg-red-500 !text-white [&>button]:!bg-white [&>button]:!text-red-500 [&>button]:!font-bold !font-primary",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MetadataHeader title={data.title} />
      <BoardDetailHeader
        isListView={isListView}
        setIsListView={setIsListView}
        currentBoard={data}
      />

      <BoardDetailBody
        currentBoard={data}
        handleCreateColumn={handleCreateColumn}
        handleEditColumn={handleEditColumn}
        handleDeleteColumn={handleDeleteColumn}
        isListView={isListView}
      />

      <ColumnForm
        isOpen={isOpen}
        handleOpen={setIsOpen}
        boardId={id}
        defaultValue={editColumn}
      />
    </>
  );
};

export default BoardDetail;

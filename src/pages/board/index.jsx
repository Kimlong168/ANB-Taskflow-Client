import { useState } from "react";
import { toast } from "sonner";

import { Loading } from "@/components/atoms/loading";
import { BoardForm } from "@/components/organisms/board/board-form";
import { BoardCard } from "@/components/molecules/board/board-card";
import { BoardHeader } from "@/components/molecules/board/board-header";
import { handleDeleteItem } from "@/utils/handle-delete-item";
import { useBoards, useDeleteBoard } from "@/hooks/use-board";
import { MetadataHeader } from "@/components/atoms/metadata-header";
import { AddItemCard } from "@/components/molecules/board/add-item-card";

const Boards = () => {
  const deleteBoard = useDeleteBoard();
  const { data, isLoading } = useBoards();
  const [isOpen, setIsOpen] = useState(false);
  const [editBoard, setEditBoard] = useState(null);

  const handleCreateBoard = () => {
    setIsOpen(true);
    setEditBoard(null);
  };

  const handleEditBoard = (board) => {
    setEditBoard(board);
    setIsOpen(true);
  };

  const handleDeleteBoard = async (board) => {
    toast(`Are you sure to delete ${board.title}?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () =>
          handleDeleteItem(async () => {
            return await deleteBoard.mutateAsync(board._id);
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
      <MetadataHeader title="TaskFlow | Boards" />
      <BoardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-5 gap-6">
        <AddItemCard
          onClick={handleCreateBoard}
          title="Add Board"
          className="min-h-28"
        />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            handleEditBoard={handleEditBoard}
            handleDeleteBoard={handleDeleteBoard}
          />
        ))}
      </div>

      <BoardForm
        isOpen={isOpen}
        handleOpen={setIsOpen}
        defaultValue={editBoard}
      />
    </>
  );
};

export default Boards;

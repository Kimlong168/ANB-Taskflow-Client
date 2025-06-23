import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../api/axiosClient";

export const useCreateColumn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (column) => {
      const response = await axiosClient.post("/columns", column);
      return response.data;
    },
    {
      onSuccess: (_, column) => {
        queryClient.invalidateQueries("columns");
        queryClient.invalidateQueries(["board", column.boardId]);
      },
    }
  );
};

export const useUpdateColumn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (column) => {
      const response = await axiosClient.put(`/columns/${column.id}`, column);
      return response.data;
    },

    {
      onSuccess: (_, column) => {
        queryClient.invalidateQueries("columns");
        queryClient.invalidateQueries(["board", column.boardId]);
      },
    }
  );
};

export const useDeleteColumn = (boardId) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const response = await axiosClient.delete(`/columns/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("columns");
        queryClient.invalidateQueries(["board", boardId]);
      },
    }
  );
};

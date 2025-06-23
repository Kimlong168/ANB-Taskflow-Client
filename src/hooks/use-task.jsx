import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../api/axiosClient";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (task) => {
      const response = await axiosClient.post("/tasks", task);
      return response.data;
    },
    {
      onSuccess: (_, task) => {
        queryClient.invalidateQueries("tasks");
        queryClient.invalidateQueries(["board", task.boardId]);
      },
    }
  );
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (task) => {
      const response = await axiosClient.put(`/tasks/${task.id}`, task);
      return response.data;
    },

    {
      onSuccess: (_, task) => {
        queryClient.invalidateQueries("tasks");
        queryClient.invalidateQueries(["board", task.boardId]);
      },
    }
  );
};

export const useMoveTask = (boardId) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (task) => {
      const response = await axiosClient.put(`/tasks/${task.id}/move`, task);
      return response.data;
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        queryClient.invalidateQueries(["board", boardId]);
      },
    }
  );
};

export const useDeleteTask = (boardId) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const response = await axiosClient.delete(`/tasks/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        queryClient.invalidateQueries(["board", boardId]);
      },
    }
  );
};

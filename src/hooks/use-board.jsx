import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../api/axiosClient";

export const useBoards = () => {
  return useQuery(
    ["boards"],
    async () => {
      const response = await axiosClient.get(`/boards`);
      return response.data;
    },
    {
      select: (response) => {
        const formatedData = response.data;
        return formatedData;
      },
    }
  );
};

export const useBoard = (id) => {
  return useQuery(
    ["board", id],
    async () => {
      const response = await axiosClient.get(`/boards/${id}`);
      return response.data;
    },
    {
      select: (response) => {
        const formatedData = response.data;
        return formatedData;
      },
    }
  );
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (board) => {
      const response = await axiosClient.post("/boards", board);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("boards");
      },
    }
  );
};

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (board) => {
      const response = await axiosClient.put(`/boards/${board.id}`, board);
      return response.data;
    },

    {
      onSuccess: (_, board) => {
        queryClient.invalidateQueries("boards");
        queryClient.invalidateQueries(["board", board.id]);
      },
    }
  );
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const response = await axiosClient.delete(`/boards/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("boards");
      },
    }
  );
};

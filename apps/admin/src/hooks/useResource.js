import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useSingletonResource(key, endpoint) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await api.get(`/admin/${endpoint}`);
      return response.data.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.put(`/admin/${endpoint}`, payload);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([key], data);
    },
  });

  return { ...query, save: mutation };
}

export function useCollectionResource(key, endpoint) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await api.get(`/admin/${endpoint}`);
      return response.data.data;
    },
  });

  const createItem = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post(`/admin/${endpoint}`, payload);
      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  const updateItem = useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await api.put(`/admin/${endpoint}/${id}`, payload);
      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  const deleteItem = useMutation({
    mutationFn: async (id) => api.delete(`/admin/${endpoint}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  return { ...query, createItem, updateItem, deleteItem };
}

export function useUploadFile() {
  return useMutation({
    mutationFn: async ({ file, kind = 'image' }) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post(`/admin/upload?kind=${kind}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },
  });
}

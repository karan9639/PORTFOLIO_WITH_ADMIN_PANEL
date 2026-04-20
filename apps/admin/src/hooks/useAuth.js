import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useAuth() {
  return useQuery({
    queryKey: ['admin-auth'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data.data.admin;
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/login', payload);
      return response.data.data.admin;
    },
    onSuccess: (admin) => {
      queryClient.setQueryData(['admin-auth'], admin);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => api.post('/auth/logout'),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['admin-auth'] });
    },
  });
}

import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useSubmitMessage() {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/public/messages', payload);
      return response.data;
    },
  });
}

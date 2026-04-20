import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useSiteData() {
  return useQuery({
    queryKey: ['site-data'],
    queryFn: async () => {
      const response = await api.get('/public/site');
      return response.data.data;
    },
  });
}

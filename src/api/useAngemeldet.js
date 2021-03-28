import { useQueryClient } from 'react-query';
import { useCreateMutation, useCreateQuery } from '../util/api';

const useAngemeldet = () => {
  return useCreateQuery('angemeldet', '/api/angemeldet');
};

export const useCreateAnmeldung = () => {
  const queryClient = useQueryClient();

  return useCreateMutation('/api/angemeldet', 'post', () => {
    queryClient.invalidateQueries('angemeldet');
  });
};

export const useDeleteAnmeldung = () => {
  const queryClient = useQueryClient();

  return useCreateMutation('/api/angemeldet', 'delete', () => {
    queryClient.invalidateQueries('angemeldet');
  });
};

export default useAngemeldet;

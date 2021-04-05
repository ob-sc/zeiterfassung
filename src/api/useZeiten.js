import { useQueryClient } from 'react-query';
import useHomeContext from '../context/HomeContext';
import { useCreateMutation, useCreateQuery } from '../util/api';

const useZeiten = () => {
  return useCreateQuery('zeiten', '/api/zeiten');
};

export const useGetMax = () => {
  const { updateMax } = useHomeContext();

  return useCreateMutation('/api/zeiten/max', 'post', (data) => {
    updateMax(data);
  });
};

export const useEintragen = () => {
  const queryClient = useQueryClient();

  return useCreateMutation('/api/zeiten', 'post', () => {
    queryClient.invalidateQueries('zeiten');
  });
};

export const useDeleteZeit = () => {
  const queryClient = useQueryClient();

  return useCreateMutation('/api/zeiten', 'delete', () => {
    queryClient.invalidateQueries('zeiten');
  });
};

export default useZeiten;

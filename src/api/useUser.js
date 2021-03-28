import { navigate } from '@reach/router';
import { useCreateMutation, useCreateQuery } from '../util/api';

const useUser = () => {
  return useCreateQuery('user', '/api/user');
};

export const useCreateUser = () => {
  return useCreateMutation('/api/user', 'post', () => {
    navigate('/login');
  });
};

export default useUser;

import {useMutation, useQuery} from 'react-query';
import axios, {AxiosResponse} from 'axios';
import {AddTaskRequestBody, EditTaskRequestArgs, Task} from '../types/api';

const api = axios.create({
  baseURL: `https://todo-list-fullstack-ph.herokuapp.com/v1`
});

export const useTasks = () => {
  return useQuery<AxiosResponse<Task[]>, Error>(
    'tasks',
    async () => {
      const res = await api.get('/tasks');
      return res.data;
    },
    {
      enabled: true
    }
  );
};

export const useGetTaskById = (id?: number) => {
  return useQuery<AxiosResponse<Task>, Error>(
    'taskDetail',
    async () => {
      if (id) {
        const res = await api.get(`/tasks/${id}`);
        return res.data;
      }
    },
    {
      enabled: true
    }
  );
};

export const useAddTask = () => {
  return useMutation(
    async ({title}: AddTaskRequestBody) => {
      const response = await api.post('/tasks', {title});
      return response.data;
    },
    {retry: 0}
  );
};

export const useDeleteTaskById = () => {
  return useMutation(
    'tasks',
    async ({id}: {id: number}) => {
      const res = await api.delete(`/tasks/${id}`);
      return res.data;
    },
    {retry: 0}
  );
};

export const useEditTask = () => {
  return useMutation(
    'tasks',
    async ({id, title}: EditTaskRequestArgs) => {
      const res = await api.put(`/tasks/${id}`, {title});
      return res.data;
    },
    {retry: 0}
  );
};

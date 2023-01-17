export type Task = {
  id: number;
  title: string;
  createdAt: string;
};

export type AddTaskRequestBody = {
  title: string;
};

export type EditTaskRequestArgs = {
  id: number;
  title: string;
};

export type Task = {
  id: string;
  created_at: string;
  title: string;
  user_id: string | undefined;
};

export type Notice = {
  id: string;
  created_at: string;
  content: string;
  user_id: string | undefined;
};

const test: Task[] = [
  {
    id: "test1",
    created_at: "111",
    title: "testtitle",
    user_id: undefined,
  },
  {
    id: "test2",
    created_at: "111",
    title: "testtitle",
    user_id: undefined,
  },
  {
    id: "test3",
    created_at: "111",
    title: "testtitle",
    user_id: undefined,
  },
];

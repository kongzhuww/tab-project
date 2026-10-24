import { reactive } from "vue";

export interface TodoistTaskDetailState {
  open: boolean;
  loading: boolean;
  saving: boolean;
  error: boolean;
  status: string;
  taskId: string;
  context: string;
  url: string;
  title: string;
  description: string;
  dueDate: string;
}

export const todoistTaskDetailState = reactive<TodoistTaskDetailState>({
  open: false, loading: false, saving: false, error: false, status: "", taskId: "", context: "", url: "", title: "", description: "", dueDate: ""
});

type Handler = (action: "close" | "save", payload?: any) => void;
const handlers = new Set<Handler>();

export const todoistTaskDetailController = {
  state: todoistTaskDetailState,
  open(partial: Partial<TodoistTaskDetailState>) { Object.assign(todoistTaskDetailState, partial, { open: true }); },
  update(partial: Partial<TodoistTaskDetailState>) { Object.assign(todoistTaskDetailState, partial); },
  close() { handlers.forEach((handler) => handler("close")); },
  save(payload: { title: string; description: string; dueDate: string }) { handlers.forEach((handler) => handler("save", payload)); },
  onAction(handler: Handler) { handlers.add(handler); return () => handlers.delete(handler); }
};

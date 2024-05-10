export type CreateTodo = {
    title: string;
    done: boolean;
    userEmail: string;
}
export type Todo = {
    title: string;
    done: boolean;
    userEmail: string;
    id: string;
}
export type UpdateTodo = CreateTodo;

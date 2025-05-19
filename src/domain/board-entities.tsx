class TaskEntity {
    id!: number;
    title!: string;
    description!: string;
    assignee?: string;
    boardId?: number;
}

class BoardEntity {
    id!: number;
    title!: string;
}

export { TaskEntity, BoardEntity };
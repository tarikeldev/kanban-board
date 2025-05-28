class TaskEntity {
    id!: number;
    title!: string;
    description!: string;
    username?: string;
    boardId?: number;
    userId?: number;
    createdAt!: Date;
    priority?: number;
}

class BoardEntity {
    id!: number;
    title!: string;
}

export { TaskEntity, BoardEntity };
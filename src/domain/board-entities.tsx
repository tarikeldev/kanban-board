class TaskEntity {

    id!: number;
    title!:  string;
    assignee?: string;
    boardId?: number;

}

export default   TaskEntity
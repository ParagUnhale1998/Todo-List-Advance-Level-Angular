export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    createdDate: Date;
    category: string;
    priority: 'Low' | 'Medium' | 'High';
    completed: boolean;
}

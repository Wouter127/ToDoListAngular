import { Status } from "./status";

export interface ListItem {
    id: number,
    listId: number,
    title: string,
    description: string,
    date: string,
    statusId: number,
    order: number,
}
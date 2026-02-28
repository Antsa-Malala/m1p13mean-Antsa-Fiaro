import { User } from "./user";

export interface Box {
    _id?: string;
    floor?: number;
    number?: number;
    status?: string;
    image?: string;
    shop?: User;
}
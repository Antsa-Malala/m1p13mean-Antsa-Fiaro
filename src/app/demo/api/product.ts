import { Category } from "./category";
import { User } from "./user";
import { Variant } from "./variant";

export interface Product {
    _id?: string;
    name?: string;
    description?: string;
    category?: Category;
    brand?: string;
    image?: string;
    status?: string;
    shop?: User;
    variants? : Variant[];
    price?: number;
    stock?: number;
}

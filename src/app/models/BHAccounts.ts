import { Reports } from "./Reports";
import { Restaurant } from "./Restaurant";

export class BHAccounts{
    _id?:string | null;
    username:string;
    password:string;
    restaurant?:Restaurant;
    reports ?:Reports;         
}
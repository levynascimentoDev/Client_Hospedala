
export interface User {
    id:number,
    name:string
    email:string,
    icon?:string,
    admin:boolean
}

export interface hostData {
    title:string;
    type:"apartamento" | "casa" | "quarto" | "microcasa" | "condominio";
    default_value:number;
    region:string;
    review:{
        total:number,
        media:number;
    }
    images:string[];
}
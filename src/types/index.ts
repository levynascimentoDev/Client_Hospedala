
export interface User {
    id:number;
    given_name:string;
    family_name:string;
    email:string;
    icon?:string;
    role:"user" | "Host" | "admin";
}

export interface Place {
    id:string;
    title:string;
    description:string;
    type:string;
    region:string;
    sigla:string;
    city:string;
    max_people:number;
    default_value:number;
    owner_id:number;
    lat:string;
    lon:string;
    available:boolean;
}

export interface placeRequests {
    id:string;
    title:string;
    default_value:number;
    image:string;
    city:string;
    type:string
}


export interface locationValue {
    name:string;
    sigla:string;   
}


export interface ibgeLocationPlaces {
    citys:locationValue[];
    states:locationValue[];
}
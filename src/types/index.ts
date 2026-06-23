
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

export interface currentLoc {
    region?:string;
    city?:string;
}

export interface CheckoutDate {
    check_in:Date | null;
    check_out:Date | null;
}

export interface Region {
    state:string | null;
    city:string | null;
}

export interface Guests {
    children:number;
    adult:number;
    baby:number;
    animal:number;
}


export interface Services {
    wifi:boolean;
    tv:boolean;
    parking:boolean;
    air:boolean;
    heater:boolean;
    pool:boolean;
    gym:boolean;
    grill:boolean;
    jacuzze:boolean;
    breakfast:boolean;
    bedlinen:boolean;
    safe:boolean;
    reception:boolean;
    wheelchairAccessibility:boolean;
    elevator:boolean;
    crib:boolean;
    balcony:boolean;
    cityView:boolean;
    seaView:boolean;
}

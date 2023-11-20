export interface signUp {
    name : string,
    email : string
    password: string,
}

export interface LogIn {
    email : String,
    password : String;
}

export interface Product {
    name: string,
    price : number,
    category : string,
    color : string,
    description : string,
    image : string,
    id : number,
    quantity : undefined | number,
    productId : undefined | number
}

export interface Cart {
    name: string,
    price : number,
    category : string,
    color : string,
    description : string,
    image : string,
    id : number | undefined,
    quantity : undefined | number,
    userId : number,
    productId : number
}

export interface PriceSummary {
    price : number,
    discount : number,
    tax : number,
    total : number,
    delivery : number
}

export interface Order {
    email : string,
    address : string,
    totalPrice : number,
    userId : number,
    id : number | undefined
}
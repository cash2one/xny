export interface ILeftData{
    title:string;
    logo:string;
    module:string;
    menu:Array<IMenu>;
}

export interface IMenu{
    name:string;
    url:string;
    fonticon:string;
}
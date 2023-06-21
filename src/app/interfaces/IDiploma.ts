export interface IDiplomas{
    id:number,
    diploma_ar_name:string,
    diploma_en_name:string,
    price:number,
    from_date:string,
    to_date:string,
    diploma_description:string,
    diploma_attach:string,
    category:[
        {
            courseCategory_id:number,
            ar_name:string,
            en_name:string,
            state:boolean
        }
    ]

}
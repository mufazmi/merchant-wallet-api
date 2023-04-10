

class MerchantDto{
    
    id:string;
    name:string;
    mobile:string;

    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.mobile = data.mobile
    }

}

export default MerchantDto
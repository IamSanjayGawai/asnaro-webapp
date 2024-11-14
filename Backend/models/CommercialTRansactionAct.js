import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommercialTransActSchema = new Schema({

        distributor:{ type:String},
        operationManager:{ type:String},
        postCode:{ type:String},
        location:{ type:String},
        telephone:{ type:String},
        fax:{ type:String},
        email:{ type:String},
        url:{ type:String},
        requiredFees:{ type:String},
        howToOrder:{ type:String},
        paymentMethod : { type:String},
        dueDateForPayment:{ type:String},
        deliveryTime:{ type:String},
        aboutReturnExchange:{ type:String},
      

},
{timestamps: true}
)


export default mongoose.model("CommercialTransAct", CommercialTransActSchema);

















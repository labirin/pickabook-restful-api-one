import mongoose,{Schema} from 'mongoose'
const {ObjectId}=mongoose.Schema.Types
const labelSchema=new Schema({
  path:{
    type:String,
    trim:true,
    required:[true,'path to the label is required']
  },
  libName:{
    type:String,
    trim:true
  },
  user:{
    type:ObjectId,
    ref:'User'
  }
})

new Schema({ arr: [String] }, { usePushEach: true });

labelSchema.methods={
  toJSON(){
    return{
      _id:this._id,
      path:this.path,
      libName:this.libName,
      user:this.user,
      createdAt:this.createdAt,
      updatedAt:this.updatedAt
    }
  }
}
labelSchema.statics={
  list({skip=0,limit=5}={}){
    return this.find()
              .sort({craetedAt:-1})
              .skip(skip)
              .limit(limit)

  },
  createLabel(args,user){
    return this.create({
      ...args,
      user
    })
  }
}

export default mongoose.model('Label',labelSchema);

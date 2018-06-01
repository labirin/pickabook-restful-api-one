import Label from './label.model'
import httpStatus from 'http-status'
import User from '../users/user.model'
/**
	 * @api {post} /api/v1/qrcode Add a new wechat_Qrcode
	 * @apiDescription Add a new wechat_qrcode for a given user
	 * @apiName addQrcode
	 * @apiGroup qrcode
	 *
	 * @apiParam {String} path The path to the qrcode image
	 *
	 * @apiSampleRequest /api/v1/qrcode
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "code":0,
   *        "data":[]
   *    }
	 */
export async function addLabel(req,res,next) {
  const label= await Label.createLabel(req.body,req.user._id)
  const user= await User.findById(req.user._id)
  console.log("before user.label.push")
  console.log("something failed when pushing")
  //user.qrcode.push(qrcode)
  user.label = user.label.concat([label])
  console.log("after user.qrcode.push")
  console.log(user.label)
  await user.save()
  console.log("checkin1")

  res.status(httpStatus.CREATED).json({
    code:0,
    data:label,
    
  })
  console.log("checkin2")
}
/**
	 * @api {get} /ap1/v1/qrcode/:qrcodeId Get a User's Qrcode information
	 * @apiDescription Get a User's qrcode information using the unique id
	 * @apiName getQrcode
	 * @apiGroup qrcode
	 *
	 * @apiParam {String} id The unique ID
	 *
	 * @apiSampleRequest /api/v1/qrcode/:qrcodeId
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
  *
	 */
export async function getLabel(req,res,next){
  const {id}=req.params
  const label= await Label.findById(id)
  res.status(httpStatus.OK).json({
    code:0,
    data:label
  })
}
/**
	 * @api {patch} /api/v1/qrcode Updates a wechat_Qrcode
	 * @apiDescription Updates a wechat_qrcode for a given user
	 * @apiName updateQrcode
	 * @apiGroup qrcode
	 *
	 * @apiParam {String} path The path to the qrcode image
	 *
	 * @apiSampleRequest /api/v1/qrcode
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "code":0,
   *        "data":[]
   *    }
	 */
export async function updateLabel(req,res,next){
  const {id}=req.params
  const label= await Label.findById(id)
  if(label.user.equals(req.user._id))
  {
    Object.keys(req.body).forEach(key=>{
      label[key]=req.body[key]
    })
    await label.save()
  }else{
    res.status(httpStatus.UNAUTHORIZED)
  }
  res.status(httpStatus.OK).json({
    code:0,
    data:label
  })
}

/**
	 * @api {delete} /api/v1/qrcode/:qrcodeIs Deletes a wechat_Qrcode
	 * @apiDescription Delete a wechat_qrcode for a given user
	 * @apiName deleteQrcode
	 * @apiGroup qrcode
	 *
	 * @apiParam {String} id The unique ID of the given User's qrcode
	 *
	 * @apiSampleRequest /api/v1/qrcode/:qrcodeId
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "code":0,
   *        "message:"sucessfully deleted qrcode"
   *    }
	 */
export async function deleteLabel(req,res,next){
  const {id}=req.params
  const label= await Label.findById(id)
  if(label.user.equals(req.user._id))
  {
    await label.remove()
  }else{
    res.status(httpStatus.UNAUTHORIZED)
  }
  res.status(httpStatus.OK).json({
    code:0
  })
}
/**
	 * @api {get} /api/v1/qrcode Get all wechat_Qrcodes
	 * @apiDescription Get all wechat_Qrcodes of users
	 * @apiName getAllQrcode
	 * @apiGroup qrcode
	 *
	 * @apiParam {Number} limit The number of qrcodes to return
	 * @apiParam {Number} skip The number of qrcodes to skip
	 *
	 * @apiSampleRequest /api/v1/qrcode
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *      "code":0,
   *      "data":[{},{}]
	 *     }
	 */
export async function getAllLabel(req,res,next)
{
  const limit=parseInt(req.query.limit)
  const skip=parseInt(req.query.skip)
  const label= await Label.list({limit,skip})
  res.status(httpStatus.OK).json({
    code:0,
    data:label
  })
}

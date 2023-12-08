import catchAsync from '../utils/catchAsync.js'
import {query} from "@ifyour/deeplx";


export const translate = catchAsync(async(req,res)=>{
  const result = await query(req.body)
  res.json(result)
})
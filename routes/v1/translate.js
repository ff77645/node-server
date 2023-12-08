import { Router } from "express"
import { translate } from "../../controller/translate.js"
const router = new Router()


router.get('/',(req,res)=>{
  res.end('Please use post method to request')
})

router.post('/',translate)


export default router
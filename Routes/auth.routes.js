import { signin,signup } from "../controller/authcontroller.js";
import { checkduplicateusernameoremail, checkrolesexisted} from "../middleware/verifysignup.js";
import express from 'express';
const router=express.Router();


// export default authenticate(app)=>{
//     app.use((req,res,next)=>{
//         res.header(
//             "Access-control-Allow-header",
//             "x-access-token",
//             "origin",
//             "Content-Type",
//             "Accept"
//         );
//         next();
//     })
//     app.post("/api/auth/signup",[
//         verifysignup.checkduplicateusernameoremail,verifysignup.checkrolesexisted
//     ],controller.signup)
//     app.post("/api/auth/signup",controller.signin)
// }

router.post("/signup",[checkduplicateusernameoremail,checkrolesexisted], signup)
router.post("/signin",signin)

export default router
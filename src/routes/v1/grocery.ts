import Grocery from "../../controllers/grocery";
import { VALIDATE_MODULE_NAME } from "../../config/constants";
import { Router } from "express";
import { validator } from "../../controllers/validators/index";
const GROCERY = VALIDATE_MODULE_NAME.GROCERY;

const router = Router();

router.post('/fetch', validator(GROCERY.module, GROCERY.route.FETCH), Grocery.fetch);
router.post('/add', validator(GROCERY.module, GROCERY.route.ADD), Grocery.add);

export default router;
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '..', '.env')});

import './boot/index';
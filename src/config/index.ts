import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

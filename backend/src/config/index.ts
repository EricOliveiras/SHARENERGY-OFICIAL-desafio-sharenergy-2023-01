import * as dotenv from 'dotenv';

dotenv.config();

export const port = <string>process.env.PORT;
export const secret = <string>process.env.SECRET;

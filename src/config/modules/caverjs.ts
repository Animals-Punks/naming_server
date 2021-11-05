import { registerAs } from '@nestjs/config';

export default registerAs('caverjs', () => ({
    endPoint: process.env.CAVERJS_ENDPOINT || '',
}));

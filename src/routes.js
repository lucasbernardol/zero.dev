import { Router } from 'express';
import shorten from '@app/modules/shorten/shorten.routes';

const router = Router();

router.use('/api', shorten);

export { router };

import { Router, Request, Response } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true });
});

router.use('/users', userRoutes)

export default router;
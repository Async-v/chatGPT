import express from 'express';
import cookieParser from 'cookie-parser';

/* Routes */
import authRoutes from '../routes/auth.routes.js'
import chatRoutes from '../routes/chat.routes.js'

const app = express();

/* using middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

/* Using Routes */
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

export default app;
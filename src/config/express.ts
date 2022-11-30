import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import router from '../app/api/index';

const exp = () => {
    const app = express();

    app
        .use(json())
        .use(urlencoded({ extended: true }))
        .use(compression())
        .use(cors())
        .use(methodOverride())
        .use(express.static('public'));
    app.use(router);
    return app;
};

export default exp;

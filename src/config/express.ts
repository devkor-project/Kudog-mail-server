import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';

const exp = () => {
    const app = express();

    app
        .use(json())
        .use(urlencoded({ extended: true }))
        .use(compression())
        .use(cors())
        .use(methodOverride())
        .use(express.static('public'));

    return app;
};

export default exp;

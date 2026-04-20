import express, {Express, Request, Response} from "express";
import {videoRouter} from "./videos/routers/video.router";
import {testingRouter} from "./testing/routers/testing.router";
import {HttpStatus} from "./core/types/http-statuses";

export const setupApp = (app: Express) => {

    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send("Hello world!");
    });

    app.use('/videos', videoRouter);
    app.use('/testing', testingRouter);

    return app;
};
import express, { Express, Request, Response } from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {db} from "./db/in-memory.db";
import {Video} from "./videos/types/video";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send("Hello world!");
    });

    app.get("/videos", (req: Request, res: Response) => {
        // возвращаем все видео
        res.status(HttpStatus.Ok_200).send(db.videos);
    });

    app.get("/videos/:id", (req: Request<{id: string}>,
                            res: Response<Video | null>
    ) => {
        // ищем видео в бд по id
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            res.sendStatus(HttpStatus.NotFound_404);
            return;
        }
        // возвращаем ответ
        res.status(HttpStatus.Ok_200).send(video);
    });

    app.post("/videos", (req: Request, res: Response) => {
        //1) проверяем приходящие данные на валидность
        //2) создаем newVideo
        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            createdAt: new Date(),
            ...req.body
        };
        //3) добавляем newVideo в БД
        db.videos.push(newVideo);
        //4) возвращаем ответ
        res.status(HttpStatus.Created_201).send(newVideo);
    });

    app.get('/testing', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send('testing url');
    });

    app.delete("/testing/all-data", (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent_204);
    });

    return app;
};
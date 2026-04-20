import express, { Express, Request, Response } from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {db} from "./db/in-memory.db";
import {Resolutions, Video} from "./videos/types/video";
import {videoInputDtoValidation} from "./videos/validation/videoInputDtoValidation";
import {createErrorMessages} from "./core/utils/error.utils";

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

    app.get("/videos/:id", (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const video = db.videos.find((v) => v.id === id);

        if (!video) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ field: 'id', message: 'Video not found' }])
                );
            return;
        }

        res.status(HttpStatus.Ok_200).send(video);
    });

    app.post("/videos", (req: Request, res: Response) => {
        const errors = videoInputDtoValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest_400).send(createErrorMessages(errors));
            return;
        }

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: req.body.availableResolutions
        };
        db.videos.push(newVideo);
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
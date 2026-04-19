import express, { Express } from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {db} from "./db/in-memory.db";
import {Video} from "./videos/types/video";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok_200).send("Hello world!");
    });

    app.get("/videos", (req, res) => {
        // возвращаем все видео
        res.status(HttpStatus.Ok_200).send(db.videos);
    });

    app.get("/videos/:id", (req, res) => {
        // ищем видео в бд по id
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            return res.status(HttpStatus.NotFound_404).send({ message: "Video not found" });
        }
        // возвращаем ответ
        res.status(HttpStatus.Ok_200).send(video);
    });

    app.post("/videos", (req, res) => {
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
        res.status(HttpStatus.Ok_200).send(newVideo);
    });

    app.delete("/testing/all-data", (req, res) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent_204);
    });

    return app;
};
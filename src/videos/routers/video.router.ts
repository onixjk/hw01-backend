import {Request, Response, Router} from 'express';
import {Resolutions, Video} from "../types/video";
import {HttpStatus} from "../../core/types/http-statuses";
import {db} from "../../db/in-memory.db";
import {createErrorMessages} from "../../core/utils/error.utils";
import {videoInputModelValidation} from "../validation/videoInputModelValidation";
import {testingRouter} from "../../testing/routers/testing.router";
import {UpdateVideoInputModel} from "../model/update-video-input-model";

export const videoRouter = Router({});

videoRouter.get("", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok_200).send(db.videos);
});

videoRouter.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const video = db.videos.find((v) => v.id === id);

    if (!video) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessages([{field: 'id', message: 'Video not found'}])
            );
        return;
    }

    res.status(HttpStatus.Ok_200).send(video);
});

videoRouter.post("", (req: Request, res: Response) => {
    const errors = videoInputModelValidation(req.body);

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

videoRouter.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessages([{field: 'id', message: 'Vehicle not found'}]),
            );
        return;
    }

    const errors = videoInputModelValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest_400).send(createErrorMessages(errors));
        return;
    }

    const video = {
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: new Date(),
        publicationDate: req.body.publicationDate,
        availableResolutions: req.body.availableResolutions
    };

    res.sendStatus(HttpStatus.NoContent_204);
})

videoRouter.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessages([{field: 'id', message: 'Video not found'}])
            );
        return;
    }
    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent_204);
});

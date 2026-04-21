import {Request, Response, Router} from 'express';
import {Resolutions, Video} from "../types/video";
import {HttpStatus} from "../../core/types/http-statuses";
import {db} from "../../db/in-memory.db";
import {createErrorMessages} from "../../core/error/error.utils";
import {videoInputModelValidation, videoUpdateModelValidation} from "../validation/videoInputModelValidation";

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

    const publicationDate = new Date();
    publicationDate.setDate(publicationDate.getDate() + 1);

    const newVideo: Video = {
        id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    db.videos.push(newVideo);
    res.status(HttpStatus.Created_201).send(newVideo);
});
videoRouter.put("/:id", (req: Request, res: Response) => {
    const errors = videoUpdateModelValidation(req.body);
    const id = Number(req.params.id);
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessages([{field: 'id', message: 'Video not found'}]),
            );
        return;
    }

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest_400).send(createErrorMessages(errors));
        return;
    }

    const video = db.videos[index]
    const createdAt = new Date()
    const publicationDate = new Date();

    publicationDate.setDate(publicationDate.getDate() + 1);

    video.title = req.body.title;
    video.author = req.body.author;
    video.canBeDownloaded = req.body.canBeDownloaded ?? false;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.createdAt = createdAt.toISOString();
    video.publicationDate = req.body.publicationDate ?? publicationDate.toISOString();
    video.availableResolutions = req.body.availableResolutions;

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
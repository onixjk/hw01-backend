import {Request, Response, Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {db} from "../../db/in-memory.db";

export const testingRouter = Router()

testingRouter.get('/', (req: Request, res: Response) => {
    res.status(HttpStatus.Ok_200).send('testing url');
});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent_204);
});
import {Resolutions} from "../types/video";

export type UpdateVideoInputModel = {
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number;
    publicationDate: Date;
    availableResolutions: Resolutions;
}
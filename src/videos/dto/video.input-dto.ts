import {AvailableResolutions} from "../types/video";

export type VideoInputDto = {
    title: "string";
    author: "string";
    canBeDownloaded: boolean;
    minAgeRestriction: number;
    publicationDate: Date;
    availableResolutions: AvailableResolutions[];
};
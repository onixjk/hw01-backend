import {Resolutions} from "../types/video";

export type VideoInputModel = {
    title: "string";
    author: "string";
    availableResolutions: Resolutions[];
};
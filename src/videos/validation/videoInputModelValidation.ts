import {FieldError} from "../../core/error/types/fieldError";
import {CreateVideoInputModel} from "../model/create-video-input.model";
import {Resolutions, Video} from "../types/video";

export const videoInputModelValidation = (data: Video): FieldError[] => {
    const errors: FieldError[] = [];

    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }

    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }

    if (typeof data.canBeDownloaded !== 'boolean'
    ) {
        errors.push({ field: 'canBeDownloaded', message: 'Invalid canBeDownloaded' });
    }




    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be array',
        });
    } else if (data.availableResolutions.length) {
        const existingResolution = Object.values(Resolutions);
        if (data.availableResolutions.length > existingResolution.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                field: 'availableResolutions',
                message: 'Invalid availableResolutions'
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolution.includes(resolution)) {
                errors.push({
                    field: 'resolution',
                    message: 'Invalid vehicleResolution:' + resolution,
                });
                break;
            }
        }
    }

    return errors;
};
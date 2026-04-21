import {FieldError} from "../../core/error/types/fieldError";
import {CreateVideoInputModel} from "../model/create-video-input.model";
import {Resolutions, Video} from "../types/video";
import {UpdateVideoInputModel} from "../model/update-video-input-model";

export const videoInputModelValidation = (data: Video): FieldError[] => {
    const errors: FieldError[] = [];

    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ message: 'Invalid title', field: 'title' });
    }

    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ message: 'Invalid author', field: 'author' });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            message: 'availableResolutions must be array',
            field: 'availableResolutions'
        });
    } else if (data.availableResolutions.length) {
        const existingResolution = Object.values(Resolutions);
        if (data.availableResolutions.length > existingResolution.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                message: 'Invalid availableResolutions',
                field: 'availableResolutions'
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolution.includes(resolution)) {
                errors.push({
                    message: 'Invalid vehicleResolution:' + resolution,
                    field: 'availableResolutions',
                });
                break;
            }
        }
    }

    return errors;
};

export const videoUpdateModelValidation = (data: UpdateVideoInputModel): FieldError[] => {
    const errors: FieldError[] = [];

    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ message: 'Invalid title', field: 'title' });
    }

    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ message: 'Invalid author', field: 'author' });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            message: 'availableResolutions must be array',
            field: 'availableResolutions'
        });
    } else if (data.availableResolutions.length) {
        const existingResolution = Object.values(Resolutions);
        if (data.availableResolutions.length > existingResolution.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                message: 'Invalid availableResolutions',
                field: 'availableResolutions'
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolution.includes(resolution)) {
                errors.push({
                    message: 'Invalid vehicleResolution:' + resolution,
                    field: 'availableResolutions',
                });
                break;
            }
        }
    }

    if (typeof data.canBeDownloaded !== 'boolean'
    ) {
        errors.push({ message: 'Invalid canBeDownloaded', field: 'canBeDownloaded' });
    }

    if (!data.minAgeRestriction ||
        typeof data.minAgeRestriction !== 'number' ||
        data.minAgeRestriction < 1 ||
        data.minAgeRestriction > 18
    ) {
        errors.push({ message: 'Invalid minAgeRestriction', field: 'minAgeRestriction' });
    }

    if (!data.publicationDate ||
        typeof data.author !== 'string'
    ) {
        errors.push({ message: 'Invalid publicationDate', field: 'publicationDate' });
    }

    return errors;
};
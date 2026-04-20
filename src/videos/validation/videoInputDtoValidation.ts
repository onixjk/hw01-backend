import {FieldError} from "../types/fieldError";
import {VideoInputModel} from "../model/video-input.model";
import {Resolutions} from "../types/video";

export const videoInputDtoValidation = (data: VideoInputModel): FieldError[] => {
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
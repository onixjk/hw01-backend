import { FieldError } from "./types/fieldError";

export const createErrorMessages = (errors: FieldError[]): { errorsMessages: FieldError[] } => {
    return { errorsMessages: errors };
}
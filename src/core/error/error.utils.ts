import { FieldError } from "./types/fieldError";

export const createErrorMessages = (errors: FieldError[]): { errorMessage: FieldError[] } => {
    return { errorMessage: errors };
}
import { FieldError } from "../../videos/types/fieldError";

export const createErrorMessages = (
    errors: FieldError[]
): { errorMessage: FieldError[] } => {
    return { errorMessage: errors };
}
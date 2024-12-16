import { v4 as uuidv4 } from 'uuid';

export function generateId(key: string) {
    const randomPart = uuidv4().slice(0, 4); // Extract the first 4 characters of the UUID
    return `${key}-${randomPart}`;
}



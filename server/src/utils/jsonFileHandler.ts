import fs from 'fs/promises';
import path from 'path';

export class JsonFileHandler {
    private filePath: string;

    constructor(filename: string) {
        this.filePath = path.join(__dirname, '..', 'config', filename);
    }

    async readFile(): Promise<any[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async writeFile(data: any[]): Promise<void> {
        await fs.writeFile(
            this.filePath,
            JSON.stringify(data, null, 2),
            'utf-8'
        );
    }
}

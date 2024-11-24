export class Activity{
    public created(fields1: string,fields2:string): string {
        return `added ${fields1} to ${fields2}`;
    }

    public removed(fields1: string): string {
        return `deleted ${fields1}`;
    }
}


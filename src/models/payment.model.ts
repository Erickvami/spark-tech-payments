
export class Payment {
    id: number = 0;
    reference: string = '';
    quantity?: number;
    sender?: string | null;
    receiver?: string | null;
    isDeleted: boolean = false;
}
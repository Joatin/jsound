

export interface Hall {
    id?: string;
    name: string;
    address: string;
    address2: string;
    zipCode: string;
    city: string;
    controllerId?: string;
}

export function getEmptyHall(): Hall{
    return {
        name: '',
        address: '',
        address2: '',
        zipCode: '',
        city: ''
    }
}
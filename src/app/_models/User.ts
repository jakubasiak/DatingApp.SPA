import { Photo } from './Photo';
export interface User {
    id: number;
    userName: string;
    gender: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    introduction?: string;
    lookingFor?: string;
    intrests?: string;
    city: string;
    country: string;
    photoUrl: string;
    photos?: Photo[];
}

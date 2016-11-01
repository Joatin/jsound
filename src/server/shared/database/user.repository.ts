import {Observable} from "rxjs";
import {User} from "../../../shared/models/user.model";


export interface UserRepository {
    getUsersByUsername(username: string): Observable<User>;
    getUserById(userId: string): Observable<User>;
}
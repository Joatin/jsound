import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable, Observer} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authServive: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create((observer: Observer)=>{
            let sub = this.authServive.isAuthenticated().subscribe((value)=>{
                if(value !== null){
                    if(value === false){
                        this.router.navigate(['/login']);
                    }
                    observer.next(value);
                    observer.complete();

                    // sub.unsubscribe();
                }
            })
        });
    }
}
import { computed, signal } from "@angular/core";

import { JwtHelperService } from "@auth0/angular-jwt";


export class Token {
    // private jwtHelper = new JwtHelperService();

    private jwt = signal<string | null>(null);
    private token = computed(() => this.jwt());

    constructor( private jwtToken: string | null, private jwtHelper = new JwtHelperService() ) {
        this.jwt.update(() => this.jwtToken);
    };

    isEmpty = () => {
        return !this.token();
    }

    hasValidFormat = () => {
        if( !this.token() ) return false;

        try {
            return !!this.jwtHelper.decodeToken( this.token()! );
        } catch (error) {
            return false;
        }
    }

    isExpired = () => {
        return this.jwtHelper.isTokenExpired( this.token() );
    }

    isTokenValid = () => {
        return !this.isEmpty() && this.hasValidFormat() && !this.isExpired();
    };

    decodeToken = () => {
        const isTokenOk = this.isTokenValid();

        if( !isTokenOk ) return false;

        return this.jwtHelper.decodeToken( this.token()! );
    };
}
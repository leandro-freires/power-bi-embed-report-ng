export interface ResponseToken {

    id_token: string;

    // The signed JSON Web Token (JWT) that you requested.
    access_token: string;

    // An OAuth 2.0 refresh token. The app can use this token to acquire additional tokens after the current token expires.
    refresh_token: string;

    // The token type value. The only type that Azure AD supports is Bearer.
    token_type: string;

    // The scopes that the token is valid for.
    scope: string;

    // The length of time that the token is valid (in seconds).
    expires_in: number;

    // The token expire timestamp in Unix epoch time.
    expires_on: number;

}

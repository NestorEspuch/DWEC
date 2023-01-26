import { SERVER } from "../constants";
import { TokenResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";
import { Http } from "./http.class";

export class AuthService {
    private http: Http;
    constructor() {
        this.http = new Http();
    }
    async login(userLogin: UserLogin): Promise<void> {
        return this.http.post(SERVER + "/auth/login", userLogin);
    }
    async register(userInfo: User): Promise<void> {
        return this.http.post(SERVER + "/auth/register", userInfo);
    }
    async checkToken(token: string): Promise<void> {
        localStorage.setItem("token", token);
    }
    async validateToken(): Promise<TokenResponse> {
        return this.http.get(SERVER + "/auth/validate");
    }
    static logout(): void {
        const logout = document.getElementById("logout");
        logout.addEventListener("click", () => {
            localStorage.removeItem("token");
            location.assign("../../index.html");
        });
    }
}

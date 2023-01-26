import { SERVER } from "../constants";
import { UserResponse } from "../interfaces/responses";
import { Http } from "./http.class";

export class UserService {
    private http: Http;
    constructor() {
        this.http = new Http();
    }

    async getProfile(id?: number): Promise<UserResponse> {
        if (!id) {
            return this.http.get(SERVER + "/users/me");
        } else {
            return this.http.get(SERVER + "/users/" + id);
        }
    }
    async saveProfile(name: string, email: string): Promise<void> {
        return this.http.put(SERVER + "/users/me", { name, email });
    }
    async saveAvatar(avatar: string): Promise<string> {
        return this.http.put(SERVER + "/users/me/avatar", { avatar });
    }
    async savePassword(password: string): Promise<void> {
        return this.http.put(SERVER + "/users/me/password", { password });
    }
}

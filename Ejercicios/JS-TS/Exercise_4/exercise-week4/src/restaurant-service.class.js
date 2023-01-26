import { SERVER } from "./constants.js";
import { Http } from "./http.js";

export class RestaurantService {
    #http;
    constructor() {
        this.#http = new Http();
    }

    getAll() {
        return this.#http.get(`${SERVER}/restaurants`);
    }

    post(restaurant){
        return this.#http.post(`${SERVER}/restaurants`, restaurant);
    }

    delete(id) {
        return this.#http.delete(`${SERVER}/restaurants/${id}`)
            .catch(error => error);
    }
}
import { SERVER } from "../constants";
import { Comment } from "../interfaces/comment";
import { CommentsResponse, RestaurantResponse, RestaurantsResponse } from "../interfaces/responses";
import { Restaurant } from "../interfaces/restaurant";
import { Http } from "./http.class";

export class RestaurantService {

    private http: Http;
    constructor() {
        this.http = new Http();
    }

    getAll(): Promise<RestaurantsResponse> {
        return this.http.get(SERVER + "/restaurants");
    }
    
    get(id: number): Promise<RestaurantResponse> {
        return this.http.get(SERVER + "/restaurants/" + id);
    }

    post(restaurant: Restaurant): Promise<Restaurant> {
        return this.http.post(SERVER + "/restaurants", restaurant);
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(SERVER + "/restaurants/" + id).catch(e => e);
    }

    async getComments(restaurantId: number): Promise<CommentsResponse> {
        return this.http.get(SERVER + "/restaurants/"+restaurantId+"/comments");
    }
    async addComment(restaurantId: number, comment: Comment): Promise<Comment> {
        return this.http.post(SERVER + "/restaurants/"+restaurantId+"/comments",comment);
    }
}

import axios from "axios";

const BASE_URL = "https://react-marvel-backend.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class BackendAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {Authorization: `Bearer ${BackendAPI.token}`};
    const params = method === "get" ? data : {};

    try {
      return (await axios({url, method, data, params, headers})).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //Character Routes

  /** Get all characters */

  static async getCharacters() {
    let res = await this.request(`characters`)
    return res.characters
  }

  //Comics Routes

  /** Search Comics featuringtwo characters */

  static async searchComics(charOneId, charTwoId, offset) {
    let res = await this.request(`comics/search/${charOneId}/${charTwoId}/${offset}`)
    return res.comics
  }

  /** Get all comics on a users reading list */

  static async getComics(username) {
    let res = await this.request(`comics/${username}`)
    return res.comics
  }

  // Auth/User Routes

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Add comic to users readinglist */

  static async addReadingList(username, comicId) {
    let res = await this.request(`users/${username}/comics/${comicId}`, {}, "post");
    return res.user;
  }
}

export default BackendAPI;

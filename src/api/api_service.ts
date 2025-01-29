import axios from "axios";
import {
  FlightOfferRequestParams,
  FlightOfferResponse,
  TokenResponse,
} from "../models/flight_api";
import { Config } from "../config";
import { Signale } from "signale";

const config = Config.getInstance();
const logger = new Signale();

export class ApiService {
  /**
   * Retrieves an access token using client credentials grant type.
   *
   * @returns {Promise<TokenResponse>} - A promise that resolves to an object containing the access token.
   * @throws {Error} - Throws an error if the request to fetch the access token fails.
   */
  public static async getAccessToken(): Promise<TokenResponse> {
    try {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const data = new URLSearchParams({
        client_id: `${config.clientId}`,
        client_secret: `${config.clientSecret}`,
        grant_type: "client_credentials",
      });

      const response = await axios.post(config.tokenUrl, data, { headers });
      const tokenResponse: TokenResponse = {
        access_token: response.data.access_token,
      };
      return tokenResponse;
    } catch (error) {
      logger.fatal("Error getting token", error);
      throw error;
    }
  }

  /**
   * Fetches flight information based on the provided parameters and authorization token.
   * @param {FlightOfferRequestParams} params - The parameters for the flight offer request (e.g., origin, destination, dates, etc.).
   * @param {string} token - The authorization token required to authenticate the request.
   * @returns {Promise<FlightOfferResponse>} - A promise that resolves to the flight offer response data.
   * @throws {Error} - Throws an error if the request to fetch flight offers fails.
   */
  public static async getFlightInformation(
    params: FlightOfferRequestParams,
    token: string
  ): Promise<FlightOfferResponse> {
    try {
      const { data } = await axios.get(config.flightOffersUrl, {
        headers: {
          Authorization: token,
        },
        params,
      });

      return data;
    } catch (error) {
      logger.fatal("Error fetching flight offers:", error);
      throw new Error("Failed to fetch flight offers");
    }
  }
}

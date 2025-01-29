import axios from "axios";
import { ApiService } from "../api/api_service";
import {
  FlightOfferRequestParams,
  TokenResponse,
  FlightOfferResponse,
} from "../models/flight_api";
import { Config } from "../config";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ApiService", () => {
  const config = Config.getInstance();

  beforeAll(() => {
    config.clientId = "testClientId";
    config.clientSecret = "testClientSecret";
    config.tokenUrl = "https://api.example.com/token";
    config.flightOffersUrl = "https://api.example.com/flights";
  });

  describe("getAccessToken", () => {
    it("should fetch an access token successfully", async () => {
      const mockTokenResponse = { access_token: "testAccessToken" };
      mockedAxios.post.mockResolvedValueOnce({ data: mockTokenResponse });

      const result: TokenResponse = await ApiService.getAccessToken();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        config.tokenUrl,
        expect.any(URLSearchParams),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      expect(result).toEqual(mockTokenResponse);
    });

    it("should throw an error when the token request fails", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Token request failed"));

      await expect(ApiService.getAccessToken()).rejects.toThrow(
        "Token request failed"
      );
      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    });
  });

  describe("getFlightInformation", () => {
    const mockParams: FlightOfferRequestParams = {
      originLocationCode: 'MAD',
      destinationLocationCode: 'BCN',
      departureDate: '2025-01-25',
      adults: 1,
      returnDate: '',
      max: 0
  };

    const mockToken = "Bearer testAccessToken";

    it("should fetch flight offers successfully", async () => {
      const mockParams: FlightOfferRequestParams = {
        originLocationCode: 'MAD',
        destinationLocationCode: 'BCN',
        departureDate: '2025-01-25',
        adults: 1,
        returnDate: '',
        max: 0
    };
      mockedAxios.get.mockResolvedValueOnce({ data: mockParams });

      const result: FlightOfferResponse = await ApiService.getFlightInformation(
        mockParams,
        mockToken
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(config.flightOffersUrl, {
        headers: { Authorization: mockToken },
        params: mockParams,
      });
      expect(result).toEqual(mockParams);
    });

    it("should throw an error when fetching flight offers fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Flight request failed"));

      await expect(
        ApiService.getFlightInformation(mockParams, mockToken)
      ).rejects.toThrow("Failed to fetch flight offers");
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });
  });
});

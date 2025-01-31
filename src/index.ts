import express, { Request, Response } from "express";
import { ApiService } from "./api/api_service";
import { Config } from "./config";
import { Signale } from "signale";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
const app = express();
const config = Config.getInstance();
const logger = new Signale();
app.use(express.json());

/**
 * Handles the login request by receiving an object from the client, fetching an access token,
 * and returning the received object along with the token in the response.
 * @function
 * @async
 * @param {Object} req - The request object containing the client's request data.
 * @param {Object} req.body - The body of the request, expected to contain the login data.
 * @param {Object} res - The response object used to send data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the received object and the access token.
 *
 */
const loginHandler = async (req: Request, res: Response) => {
  const receivedObject = req.body;
  const token = await ApiService.getAccessToken();

  res.status(200).json({
    message: receivedObject,
    data: token,
  });
};

/**
 * Fetches flight information based on the provided parameters and authorization token
 * @param {FlightOfferRequestParams} params - The parameters for the flight offer request (e.g., origin, destination, dates, etc.).
 * @param {string} token - The authorization token required to authenticate the request.
 * @returns {Promise<FlightOfferResponse>} - A promise that resolves to the flight offer response data.
 * @throws {Error} - Throws an error if the request to fetch flight offers fails.
 */
const flightOffersHandler = async (req: Request, res: Response) => {
  const { params } = req.body;
  const token = req.headers.authorization;

  if (!params || !token) {
    return res.status(400).json({ error: "Params or token missed" });
  }

  const cacheKey = JSON.stringify({ params, token });
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }
  
  try {
    const flightOffers = await ApiService.getFlightInformation(params, token);
    cache.set(cacheKey, flightOffers);
    res.json(flightOffers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
app.post("/login", loginHandler);

app.get("/flight-offers", flightOffersHandler);

app.listen(config.port || 5000, () => {
  logger.info(`Server running at http://localhost:${config.port}`);
});

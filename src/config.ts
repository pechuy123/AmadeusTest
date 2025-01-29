import * as dotenv from "dotenv";

dotenv.config();

export interface ConfigData {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  flightOffersUrl: string;
  port: string;
}

export class Config {
  private static instance: ConfigData | undefined;

  private constructor() {}

  public static getInstance(): ConfigData {
    if (!Config.instance) {
      Config.instance = Config.initConfig();
    }
    return Config.instance;
  }
  public static resetInstance(): void {
    Config.instance = undefined;
  }

  private static initConfig(): ConfigData {
    return {
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      tokenUrl: process.env.TOKEN_URL || "",
      flightOffersUrl: process.env.FLIGHT_OFFERS_URL || "",
      port: process.env.PORT || "",
    };
  }
}

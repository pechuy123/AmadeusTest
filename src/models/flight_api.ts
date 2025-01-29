export interface FlightOfferRequestParams {
  departureDate: string;
  returnDate: string;
  adults: number;
  max: number;
  originLocationCode: string;
  destinationLocationCode: string;
}

export interface FlightOfferResponse {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: AirportDetails;
  arrival: AirportDetails;
  carrierCode: string;
  number: string;
  aircraft: { code: string };
  duration: string;
  stops: number;
}

export interface AirportDetails {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees?: Fee[];
  grandTotal: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetails[];
}

export interface FareDetails {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  includedCheckedBags?: { weight: number; weightUnit: string };
}

export interface TokenResponse {
  access_token: string;
}

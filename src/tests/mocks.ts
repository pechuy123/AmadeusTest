import { FlightOfferResponse } from "../models/flight_api";

export const mockFlightOfferResponse: FlightOfferResponse = {
  type: "flight-offer",
  id: "1",
  source: "GDS",
  instantTicketingRequired: false,
  nonHomogeneous: false,
  oneWay: false,
  lastTicketingDate: "2025-01-25",
  numberOfBookableSeats: 5,
  itineraries: [
    {
      duration: "PT2H30M",
      segments: [
        {
          departure: {
            iataCode: "MEX",
            terminal: "1",
            at: "2025-01-25T10:00:00",
          },
          arrival: {
            iataCode: "CUN",
            terminal: "2",
            at: "2025-01-25T12:30:00",
          },
          carrierCode: "AM",
          number: "123",
          aircraft: { code: "737" },
          duration: "PT2H30M",
          stops: 0,
        },
      ],
    },
  ],
  price: {
    currency: "MXN",
    total: "2500.00",
    base: "2000.00",
    fees: [
      {
        amount: "100.00",
        type: "SUPPLIER",
      },
      {
        amount: "50.00",
        type: "TICKETING",
      },
    ],
    grandTotal: "2650.00",
  },
  pricingOptions: {
    fareType: ["PUBLISHED"],
    includedCheckedBagsOnly: true,
  },
  validatingAirlineCodes: ["AM"],
  travelerPricings: [
    {
      travelerId: "1",
      fareOption: "STANDARD",
      travelerType: "ADULT",
      price: {
        currency: "MXN",
        total: "2500.00",
        base: "2000.00",
        grandTotal: "2650.00",
      },
      fareDetailsBySegment: [
        {
          segmentId: "1",
          cabin: "ECONOMY",
          fareBasis: "Y",
          includedCheckedBags: {
            weight: 25,
            weightUnit: "KG",
          },
        },
      ],
    },
  ],
};

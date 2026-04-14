export interface B2BPush {
  id: string;
  originalJobId: string;
  specs: string; // e.g., "50yds Flex, High Res, No Eyelets"
  deadline: string;
  suggestedBargainPrice?: number; // What you ARE willing to pay the other firm
  status: "PENDING" | "ACCEPTED" | "NEGOTIATING" | "REJECTED";
}

export interface NegotiationMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isOffer?: boolean;
  offerAmount?: number;
}

export interface B2BNegotiation {
  jobId: string;
  partnerFirmId: string;
  currentOffer: number;
  status: "OPEN" | "ACCEPTED" | "REJECTED";
  messages: NegotiationMessage[];
}

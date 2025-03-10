export interface User {
  _id?: string;
  googleId?: string;
  email?: string;
  name?: string;
  password?: string;
  profilePic?: string[];
  kyc?: KycResponse;
  verified?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface KycResponse {
  sessionId: string;
  sessionNumber: number;
  sessionToken: string;
  vendorData: string;
  status:
    | "Not Started"
    | "In Progress"
    | "Completed"
    | "Approved"
    | "Declined"
    | "Expired"
    | "Abandoned";
  url: string;
}

export interface KycSessionDecisionResponse {
  sessionId: string;
  sessionNumber: number;
  sessionToken: string;
  status:
    | "Not Started"
    | "In Progress"
    | "Completed"
    | "Approved"
    | "Declined"
    | "Expired"
    | "Abandoned";
}

// # Verification status types
// Not Started: The session has been created but the verification process has not begun.
// In Progress: The user is currently undergoing the verification process.
// Completed: The verification process is finished, but the results may not be available yet.
// Approved: The verification was successful, and the user's identity has been confirmed.
// Declined: The verification failed, and the user's identity could not be confirmed.
// Expired: The session has timed out or expired.
// Abandoned: The user did not complete the verification process.

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

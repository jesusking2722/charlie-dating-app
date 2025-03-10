const User = require("../models/User");

const fetchClientToken = async () => {
  const url = process.env.KYC_GET_ACCESS_TOKEN_BASE_URL + "/auth/v2/token/";
  const clientID = process.env.KYC_CLIENT_ID;
  const clientSecret = process.env.KYC_CLIENT_SECRET;

  const encodedCredentials = Buffer.from(
    `${clientID}:${clientSecret}`
  ).toString("base64");
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      console.error("Error fetching client token:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
};

const createSession = async (token) => {
  const BASE_URL = process.env.KYC_SESSION_BASE_URL;
  const url = `${BASE_URL}/v1/session/`;
  if (!token) {
    console.error("Error fetching client token");
  } else {
    const body = {
      vendor_data: "your-vendor-data",
      callback: "http://192.168.0.2:5000",
      features: "OCR + FACE",
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (response.status === 201 && data) {
        return data;
      } else {
        console.error("Error creating session:", data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      throw error;
    }
  }
};

const startKycVerification = async (req, res) => {
  try {
    const accessToken = await fetchClientToken();
    const userId = req.user.id;
    console.log("userId", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    if (user.kyc.sessionId) {
      return res.json({
        data: user.kyc,
        success: true,
        message: "User's session is existing",
      });
    }
    const session = await createSession(accessToken);
    if (!session) {
      return res.json({ message: "Verification is failed" });
    }
    const {
      session_id,
      session_number,
      session_token,
      vendor_data,
      status,
      url,
    } = session;

    const data = {
      sessionId: session_id,
      sessionNumber: session_number,
      sessionToken: session_token,
      vendorData: vendor_data,
      status,
      url,
    };
    user.kyc = data;
    await user.save();
    res.json({ data, success: true, message: "Verification is started" });
  } catch (error) {
    console.log("start kyc verification error: ", error);
  }
};

const getSessionDecision = async (sessionId) => {
  const BASE_URL = process.env.KYC_SESSION_BASE_URL;
  const endpoint = `${BASE_URL}/v1/session/${sessionId}/decision/`;
  const accessToken = await fetchClientToken();

  if (!accessToken) {
    console.error("Error fetching client token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers,
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.error("Error fetching session decision:", data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
      throw err;
    }
  }
};

const fetchSessionDecision = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await getSessionDecision(sessionId);
    if (!session) {
      return res.json({ message: "Invalid session" });
    }
    const { session_id, session_number, session_token, status } = session;
    const data = {
      sessionId: session_id,
      sessionNumber: session_number,
      sessionToken: session_token,
      status,
    };
    res.json({
      data,
      message: "Fetched session successfully",
      success: true,
    });
  } catch (error) {
    console.log("fetch session decision error: ", error);
  }
};

module.exports = { startKycVerification, fetchSessionDecision };

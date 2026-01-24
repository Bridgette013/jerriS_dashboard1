const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-dashboard-auth",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Simple auth check - verify the dashboard password header
  const authHeader = event.headers["x-dashboard-auth"];
  const expectedPassword = process.env.DASHBOARD_PASSWORD;

  if (!expectedPassword) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server not configured" })
    };
  }

  if (authHeader !== expectedPassword) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  // Get the blob store
  const store = getStore("dashboard-data");
  const userKey = "jerri-dashboard"; // Single user dashboard

  try {
    if (event.httpMethod === "GET") {
      // Fetch user data
      const data = await store.get(userKey, { type: "json" });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data || {
          todos: [],
          notes: "",
          focus: "",
          stats: { followers: "", monthlyEarnings: "", pendingPayout: "" },
          calendar: [],
          links: [],
          ideas: []
        })
      };
    }

    if (event.httpMethod === "POST") {
      // Save user data
      const body = JSON.parse(event.body);

      // Validate the data structure
      const validKeys = ["todos", "notes", "focus", "stats", "calendar", "links", "ideas"];
      const sanitizedData = {};

      for (const key of validKeys) {
        if (body[key] !== undefined) {
          sanitizedData[key] = body[key];
        }
      }

      // Get existing data and merge
      const existingData = await store.get(userKey, { type: "json" }) || {};
      const mergedData = { ...existingData, ...sanitizedData };

      await store.setJSON(userKey, mergedData);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: mergedData })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };

  } catch (error) {
    console.error("Data function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};

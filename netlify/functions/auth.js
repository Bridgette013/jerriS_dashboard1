exports.handler = async (event, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  const expectedPassword = process.env.DASHBOARD_PASSWORD;

  if (!expectedPassword) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server not configured" })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { password } = body;

    if (password === expectedPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, error: "Invalid password" })
    };

  } catch (error) {
    console.error("Auth function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};

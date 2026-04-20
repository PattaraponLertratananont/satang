exports.handler = async (event) => {
  const year = event.queryStringParameters.year || new Date().getFullYear();
  // ดึง Key จาก Environment Variable ของ Netlify
  const CLIENT_ID = process.env.BOT_CLIENT_ID; 

  try {
    const response = await fetch(
      `https://gateway.api.bot.or.th/financial-institutions-holidays/?year=${year}`,
      {
        headers: {
          'accept': 'application/json',
          'x-ibm-client-id': CLIENT_ID
        }
      }
    );

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch holidays' })
    };
  }
};

import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  app.post('/api/subscribe', async (req, res) => {
    console.log('Subscribe endpoint called with:', { email: req.body.email });

    try {
      const { email } = req.body;

      if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        console.log('Invalid email format:', email);
        return res.status(400).json({ message: 'Invalid email address' });
      }

      const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
      const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

      if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Missing Airtable credentials:', {
          hasApiKey: !!AIRTABLE_API_KEY,
          hasBaseId: !!AIRTABLE_BASE_ID
        });
        return res.status(500).json({ message: 'Configuration error' });
      }

      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Emails`;

      console.log('Attempting Airtable request:', {
        url: airtableUrl,
        method: 'POST',
        hasAuth: !!AIRTABLE_API_KEY
      });

      const response = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Email': email
              }
            }
          ]
        })
      });

      const responseText = await response.text();
      console.log('Airtable response:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });

      if (!response.ok) {
        // Try to parse the error response as JSON
        let errorDetail;
        try {
          errorDetail = JSON.parse(responseText);
        } catch {
          errorDetail = responseText;
        }

        console.error('Airtable API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorDetail
        });

        if (response.status === 404) {
          return res.status(500).json({ 
            message: 'Error: Table "Emails" not found. Please verify the table name in Airtable.'
          });
        } else if (response.status === 401 || response.status === 403) {
          return res.status(500).json({ 
            message: 'Error: Authentication failed. Please verify your Airtable API key and permissions.'
          });
        }

        throw new Error(`Airtable API Error: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Successfully saved to Airtable:', {
        recordId: data.records?.[0]?.id
      });

      return res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('Subscription error:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
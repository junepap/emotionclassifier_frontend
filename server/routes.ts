import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", async (req, res) => {
    try {
      const { text } = z.object({ text: z.string() }).parse(req.body);

      const response = await fetch("https://emotionclassifier.71762231004.workers.dev/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const apiData = await response.json();

      // Transform API response to match our schema
      const enrichedData = {
        ...apiData,
        topics: {
          ...apiData.topics,
          // Add relevance scores (default to 0.5 for now)
          relevance: Object.fromEntries(
            apiData.topics.main.map(topic => [topic, 0.5])
          ),
          // Add emotion correlations (empty for now)
          emotionCorrelation: Object.fromEntries(
            apiData.topics.main.map(topic => [topic, {}])
          )
        },
        // Ensure emotions have confidence scores
        emotions: {
          primary: {
            ...apiData.emotions.primary,
            confidence: 0.8 // Default confidence score
          },
          ...(apiData.emotions.secondary && {
            secondary: {
              ...apiData.emotions.secondary,
              confidence: 0.6 // Lower confidence for secondary emotions
            }
          })
        }
      };

      res.json(enrichedData);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
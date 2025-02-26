import { z } from "zod";

export const emotionSchema = z.object({
  emotion: z.string(),
  activation: z.enum(["High", "Medium", "Low"]),
  intensity: z.number(),
  confidence: z.number().min(0).max(1)
});

export const topicSchema = z.object({
  main: z.array(z.string()),
  subtopics: z.record(z.array(z.string())),
  relevance: z.record(z.number().min(0).max(1)),
  emotionCorrelation: z.record(z.record(z.number().min(0).max(1)))
});

export const adorescoreSchema = z.object({
  overall: z.number(),
  breakdown: z.record(z.number()),
  trend: z.array(z.object({
    timestamp: z.string(),
    score: z.number()
  }))
});

export const analysisResponseSchema = z.object({
  emotions: z.object({
    primary: emotionSchema,
    secondary: emotionSchema.optional()
  }),
  topics: topicSchema,
  adorescore: adorescoreSchema
});

export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;
export type Emotion = z.infer<typeof emotionSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type Adorescore = z.infer<typeof adorescoreSchema>;
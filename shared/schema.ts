import { z } from "zod";

export const emotionSchema = z.object({
  emotion: z.string(),
  activation: z.string(),
  intensity: z.number()
});

export const topicSchema = z.object({
  main: z.array(z.string()),
  subtopics: z.record(z.array(z.string()))
});

export const adorescoreSchema = z.object({
  overall: z.number(),
  breakdown: z.record(z.number())
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

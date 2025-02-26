import type { Emotion } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const EMOTION_COLORS = {
  Joy: "bg-green-500",
  Serenity: "bg-blue-400",
  Ecstasy: "bg-purple-500",
  Disappointment: "bg-orange-400",
  Surprise: "bg-yellow-500",
  Amazement: "bg-pink-500",
  Grief: "bg-red-500"
};

const ACTIVATION_COLORS = {
  High: "bg-red-200",
  Medium: "bg-yellow-200",
  Low: "bg-blue-200"
};

interface EmotionDisplayProps {
  emotions: {
    primary: Emotion;
    secondary?: Emotion;
  };
}

function EmotionCard({ emotion, type }: { emotion: Emotion, type: "primary" | "secondary" }) {
  return (
    <div className="space-y-3 p-4 border rounded-lg bg-card">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-medium">{type === "primary" ? "Primary" : "Secondary"}: {emotion.emotion}</span>
          <Badge className={`ml-2 ${ACTIVATION_COLORS[emotion.activation]}`}>
            {emotion.activation}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">
          Confidence: {(emotion.confidence * 100).toFixed(1)}%
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Intensity</span>
          <span>{(emotion.intensity * 100).toFixed(1)}%</span>
        </div>
        <Progress 
          value={emotion.intensity * 100} 
          className={`h-2 ${EMOTION_COLORS[emotion.emotion as keyof typeof EMOTION_COLORS] || "bg-gray-400"}`}
        />
      </div>
    </div>
  );
}

export default function EmotionDisplay({ emotions }: EmotionDisplayProps) {
  const { primary, secondary } = emotions;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Emotion Analysis</h2>
        <p className="text-sm text-muted-foreground">
          Analysis of emotional content with activation levels and confidence scores
        </p>
      </div>

      <div className="space-y-4">
        <EmotionCard emotion={primary} type="primary" />
        {secondary && <EmotionCard emotion={secondary} type="secondary" />}
      </div>
    </div>
  );
}
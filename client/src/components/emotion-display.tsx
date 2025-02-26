import type { Emotion } from "@shared/schema";
import { Progress } from "@/components/ui/progress";

const EMOTION_COLORS = {
  Joy: "bg-green-500",
  Serenity: "bg-blue-400",
  Ecstasy: "bg-purple-500",
  Disappointment: "bg-orange-400"
};

interface EmotionDisplayProps {
  emotions: {
    primary: Emotion;
    secondary?: Emotion;
  };
}

export default function EmotionDisplay({ emotions }: EmotionDisplayProps) {
  const { primary, secondary } = emotions;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Emotion Analysis</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Primary: {primary.emotion}</span>
            <span className="text-sm text-gray-500">
              Activation: {primary.activation}
            </span>
          </div>
          <Progress 
            value={primary.intensity * 100} 
            className={`h-2 ${EMOTION_COLORS[primary.emotion as keyof typeof EMOTION_COLORS] || "bg-gray-400"}`}
          />
        </div>

        {secondary && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Secondary: {secondary.emotion}</span>
              <span className="text-sm text-gray-500">
                Activation: {secondary.activation}
              </span>
            </div>
            <Progress 
              value={secondary.intensity * 100} 
              className={`h-2 ${EMOTION_COLORS[secondary.emotion as keyof typeof EMOTION_COLORS] || "bg-gray-400"}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

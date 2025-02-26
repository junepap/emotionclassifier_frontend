import type { Adorescore } from "@shared/schema";
import { Progress } from "@/components/ui/progress";

interface AdorescoreDisplayProps {
  adorescore: Adorescore;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "bg-green-500";
  if (score >= 50) return "bg-blue-500";
  if (score >= 25) return "bg-yellow-500";
  return "bg-red-500";
}

export default function AdorescoreDisplay({ adorescore }: AdorescoreDisplayProps) {
  const normalizedScore = (adorescore.overall + 100) / 2; // Convert -100/+100 to 0-100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Adorescore</h2>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Overall Score</span>
            <span>{adorescore.overall}</span>
          </div>
          <Progress 
            value={normalizedScore} 
            className={`h-2 ${getScoreColor(normalizedScore)}`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Score Breakdown</h3>
        {Object.entries(adorescore.breakdown).map(([topic, score]) => {
          const normalizedTopicScore = (score + 100) / 2;
          return (
            <div key={topic} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{topic}</span>
                <span>{score}</span>
              </div>
              <Progress 
                value={normalizedTopicScore} 
                className={`h-1.5 ${getScoreColor(normalizedTopicScore)}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

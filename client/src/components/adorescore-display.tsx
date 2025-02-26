import type { Adorescore } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

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
        <h2 className="text-xl font-semibold mb-2">Adorescore</h2>
        <p className="text-sm text-muted-foreground">
          Overall sentiment score with topic breakdown and historical trend
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg">Overall Score</span>
            <span className="text-2xl font-semibold">{adorescore.overall}</span>
          </div>
          <Progress 
            value={normalizedScore} 
            className={`h-3 ${getScoreColor(normalizedScore)}`}
          />
        </div>
      </Card>

      {adorescore.trend && adorescore.trend.length > 0 && (
        <Card className="p-4">
          <h3 className="font-medium mb-4">Score Trend</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adorescore.trend}>
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => format(new Date(value), 'MMM d')}
                />
                <YAxis domain={[-100, 100]} />
                <Tooltip 
                  labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                  formatter={(value: number) => [value, 'Score']}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-medium mb-4">Score Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(adorescore.breakdown)
            .sort(([, a], [, b]) => b - a)
            .map(([topic, score]) => {
              const normalizedTopicScore = (score + 100) / 2;
              return (
                <div key={topic} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{topic}</span>
                    <span>{score}</span>
                  </div>
                  <Progress 
                    value={normalizedTopicScore} 
                    className={`h-2 ${getScoreColor(normalizedTopicScore)}`}
                  />
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
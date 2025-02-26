import type { Adorescore } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

interface AdorescoreDisplayProps {
  adorescore: Adorescore;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "hsl(142, 76%, 36%)"; // green-500
  if (score >= 50) return "hsl(221, 83%, 53%)"; // blue-500
  if (score >= 25) return "hsl(45, 93%, 47%)";  // yellow-500
  return "hsl(0, 84%, 60%)"; // red-500
}

export default function AdorescoreDisplay({ adorescore }: AdorescoreDisplayProps) {
  const normalizedScore = (adorescore.overall + 100) / 2; // Convert -100/+100 to 0-100

  // Data for the donut chart
  const donutData = [
    { name: "Score", value: normalizedScore },
    { name: "Remaining", value: 100 - normalizedScore }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Adorescore</h2>
        <p className="text-sm text-muted-foreground">
          Overall sentiment score with topic breakdown and historical trend
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-center">
          <div className="relative w-[200px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill={getScoreColor(normalizedScore)} />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{adorescore.overall}</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
            </div>
          </div>
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
        <div className="grid gap-4">
          {Object.entries(adorescore.breakdown)
            .sort(([, a], [, b]) => b - a)
            .map(([topic, score]) => {
              const normalizedTopicScore = (score + 100) / 2;
              return (
                <div key={topic} className="flex items-center gap-4">
                  <div className="w-24 h-24 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { value: normalizedTopicScore },
                            { value: 100 - normalizedTopicScore }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={35}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                        >
                          <Cell fill={getScoreColor(normalizedTopicScore)} />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-lg font-semibold">{score}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{topic}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
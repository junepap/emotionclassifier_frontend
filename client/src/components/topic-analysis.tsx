import type { Topic } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface TopicAnalysisProps {
  topics: Topic;
}

function TopicCard({ 
  topic, 
  subtopics, 
  relevance, 
  emotionCorrelation 
}: { 
  topic: string; 
  subtopics: string[]; 
  relevance: number;
  emotionCorrelation: Record<string, number>;
}) {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">{topic}</h3>
          <span className="text-sm text-muted-foreground">
            Relevance: {(relevance * 100).toFixed(1)}%
          </span>
        </div>
        <Progress value={relevance * 100} className="h-1.5" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Subtopics:</p>
        <div className="flex flex-wrap gap-2">
          {subtopics.map((subtopic) => (
            <Badge key={subtopic} variant="secondary">
              {subtopic}
            </Badge>
          ))}
        </div>
      </div>

      {Object.keys(emotionCorrelation).length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Emotion Correlation:</p>
          <div className="space-y-1.5">
            {Object.entries(emotionCorrelation)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([emotion, correlation]) => (
                <div key={emotion} className="flex justify-between text-sm">
                  <span>{emotion}</span>
                  <span>{(correlation * 100).toFixed(1)}%</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function TopicAnalysis({ topics }: TopicAnalysisProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Topic Analysis</h2>
        <p className="text-sm text-muted-foreground">
          Key topics identified with relevance scores and emotion correlations
        </p>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {topics.main.map((topic) => (
            <TopicCard
              key={topic}
              topic={topic}
              subtopics={topics.subtopics[topic] || []}
              relevance={topics.relevance[topic] || 0}
              emotionCorrelation={topics.emotionCorrelation[topic] || {}}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
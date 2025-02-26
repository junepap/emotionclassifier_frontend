import type { Topic } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface TopicAnalysisProps {
  topics: Topic;
}

export default function TopicAnalysis({ topics }: TopicAnalysisProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Topic Analysis</h2>
      
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-4">
          {topics.main.map((topic) => (
            <div key={topic} className="space-y-2">
              <h3 className="font-medium text-gray-900">{topic}</h3>
              <div className="flex flex-wrap gap-2">
                {topics.subtopics[topic]?.map((subtopic) => (
                  <Badge key={subtopic} variant="secondary">
                    {subtopic}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

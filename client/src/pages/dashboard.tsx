import { Card } from "@/components/ui/card";
import FeedbackForm from "@/components/feedback-form";
import EmotionDisplay from "@/components/emotion-display";
import TopicAnalysis from "@/components/topic-analysis";
import AdorescoreDisplay from "@/components/adorescore-display";
import { useState } from "react";
import type { AnalysisResponse } from "@shared/schema";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Customer Feedback Analysis
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <FeedbackForm onAnalysis={setAnalysis} />
          </Card>

          {analysis && (
            <>
              <Card className="p-6">
                <EmotionDisplay emotions={analysis.emotions} />
              </Card>
              
              <Card className="p-6">
                <TopicAnalysis topics={analysis.topics} />
              </Card>
              
              <Card className="p-6">
                <AdorescoreDisplay adorescore={analysis.adorescore} />
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

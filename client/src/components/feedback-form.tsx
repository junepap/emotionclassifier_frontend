import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResponse } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface FeedbackFormProps {
  onAnalysis: (analysis: AnalysisResponse) => void;
}

export default function FeedbackForm({ onAnalysis }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (feedback: string) => {
      const res = await apiRequest("POST", "/api/analyze", { text: feedback });
      return res.json();
    },
    onSuccess: (data: AnalysisResponse) => {
      onAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Your feedback has been analyzed successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze feedback",
        variant: "destructive"
      });
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Enter Customer Feedback</h2>
      <Textarea
        placeholder="Type your feedback here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-32"
      />
      <Button 
        onClick={() => mutation.mutate(text)}
        disabled={!text.trim() || mutation.isPending}
        className="w-full"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze Feedback"
        )}
      </Button>
    </div>
  );
}

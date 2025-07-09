import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Calendar } from 'lucide-react';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);

  const handleStartConversation = () => {
    setConversationActive(true);
    setIsConnected(true);
    setIsListening(true);
  };

  const handleStopConversation = () => {
    setConversationActive(false);
    setIsConnected(false);
    setIsListening(false);
  };

  const handleScheduleFollowUp = () => {
    // Placeholder for scheduling functionality
    console.log('Schedule follow up clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-4xl font-bold text-foreground">
          ThoughtSpot Voice Agent
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleStartConversation}
            disabled={conversationActive}
            className="px-6 py-2"
          >
            <Mic className="w-4 h-4 mr-2" />
            Start Conversation
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleStopConversation}
            disabled={!conversationActive}
            className="px-6 py-2"
          >
            <MicOff className="w-4 h-4 mr-2" />
            Stop Conversation
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleScheduleFollowUp}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white border-green-600"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule a follow up
          </Button>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Status: <span className={isConnected ? "text-green-600" : "text-red-500"}>
              {isConnected ? "connected" : "disconnected"}
            </span>
          </p>
          <p>
            Agent is {isListening ? "listening" : "idle"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

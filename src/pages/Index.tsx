import { useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const conversation = useConversation({
    onConnect: () => {
      toast({
        title: "Connected",
        description: "Voice agent is now connected and ready.",
      });
    },
    onDisconnect: () => {
      toast({
        title: "Disconnected", 
        description: "Voice agent has been disconnected.",
      });
      setConversationId(null);
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Voice agent error: ${error}`,
        variant: "destructive",
      });
    }
  });

  const handleStartConversation = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Extract URL parameters for dynamic variables
      const urlParams = new URLSearchParams(window.location.search);
      const firstName = 'Tester001'; // Hardcoded for testing
      const customer = urlParams.get('customer') || '';
      
      // Start the conversation with your agent ID and dynamic variables
      const id = await conversation.startSession({
        agentId: 'agent_01jz6hxv22f0trgk6jxsnwetq2',
        ...(firstName || customer ? {
          variables: {
            ...(firstName && { 'first_name': firstName }),
            ...(customer && { 'customer': customer })
          }
        } : {})
      });
      
      setConversationId(id);
    } catch (error) {
      toast({
        title: "Permission Error",
        description: "Microphone access is required for voice conversation.",
        variant: "destructive",
      });
    }
  };

  const handleStopConversation = async () => {
    try {
      await conversation.endSession();
      setConversationId(null);
    } catch (error) {
      console.error('Error stopping conversation:', error);
    }
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
            disabled={conversation.status === 'connected'}
            className="px-6 py-2"
          >
            <Mic className="w-4 h-4 mr-2" />
            Start Conversation
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleStopConversation}
            disabled={conversation.status !== 'connected'}
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
            Status: <span className={conversation.status === 'connected' ? "text-green-600" : "text-red-500"}>
              {conversation.status === 'connected' ? "connected" : "disconnected"}
            </span>
          </p>
          <p>
            Agent is {conversation.isSpeaking ? "speaking" : conversation.status === 'connected' ? "listening" : "idle"}
          </p>
          {conversationId && (
            <p className="text-xs">
              Session ID: {conversationId.slice(0, 8)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

import React from 'react';
import { ElevenLabsInterface } from '@/components/ElevenLabsInterface';

const Index = () => {
  // Get agent ID from environment variable (set on Railway)
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID || '';

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <ElevenLabsInterface 
        agentId={agentId}
        height="100vh"
        width="100vw"
        className="w-full h-full"
      />
    </div>
  );
};

export default Index;

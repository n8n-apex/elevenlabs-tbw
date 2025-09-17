import React, { useState, useEffect } from 'react';
import { ElevenLabsInterface } from '@/components/ElevenLabsInterface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EmbedPage = () => {
  const [agentId, setAgentId] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    console.log('EmbedPage: Checking for agent ID...');
    
    // Check environment variable first (for Railway deployment)
    const envAgentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
    console.log('Environment agent ID:', envAgentId);
    if (envAgentId) {
      setAgentId(envAgentId);
      setIsConfigured(true);
      return;
    }

    // Check URL params second
    const urlParams = new URLSearchParams(window.location.search);
    const urlAgentId = urlParams.get('agentId');
    console.log('URL agent ID:', urlAgentId);
    
    if (urlAgentId) {
      setAgentId(urlAgentId);
      setIsConfigured(true);
      return;
    }

    // Check localStorage last
    const savedAgentId = localStorage.getItem('elevenlabs-agent-id');
    console.log('Saved agent ID:', savedAgentId);
    if (savedAgentId) {
      setAgentId(savedAgentId);
      setIsConfigured(true);
    }
    
    console.log('No agent ID found, showing setup form');
  }, []);

  const handleSaveAgentId = () => {
    if (agentId.trim()) {
      localStorage.setItem('elevenlabs-agent-id', agentId.trim());
      setIsConfigured(true);
    }
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader className="text-center">
            <CardTitle>Setup Required</CardTitle>
            <CardDescription>Enter your ElevenLabs Agent ID to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="agent_xxxxxxxxxxxxxxxxx"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              className="bg-background/50"
            />
            <Button 
              onClick={handleSaveAgentId}
              className="w-full"
              disabled={!agentId.trim()}
            >
              Continue
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Your Agent ID will be stored locally in your browser
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

export default EmbedPage;
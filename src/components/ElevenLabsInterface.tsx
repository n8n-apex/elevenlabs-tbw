import React, { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import bildungsfabrikLogoBlack from '@/assets/logo-black.png';

interface ElevenLabsInterfaceProps {
  agentId: string;
  height?: string;
  width?: string;
  className?: string;
}

export const ElevenLabsInterface: React.FC<ElevenLabsInterfaceProps> = ({
  agentId,
  height = '600px',
  width = '100%',
  className
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      console.log('Connected to ElevenLabs');
    },
    onDisconnect: () => {
      setIsConnected(false);
      setConversationId(null);
      console.log('Disconnected from ElevenLabs');
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setIsConnected(false);
    }
  });

  const startConversation = async () => {
    console.log('startConversation called');
    
    if (!agentId) {
      console.error('No agent ID provided');
      alert('Agent ID is required. Please configure it in Railway environment variables.');
      return;
    }
    
    try {
      console.log('Requesting microphone access...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Starting session with agentId:', agentId);
      const id = await conversation.startSession({ 
        agentId: agentId,
        connectionType: 'webrtc' // Required parameter for the new API
      });
      console.log('Session started with ID:', id);
      setConversationId(id);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle volume:', error);
    }
  };

  return (
    <div 
      className={cn("w-full min-h-screen flex items-center justify-center relative overflow-hidden", className)}
      style={{ height, width }}
    >
      {/* Modern Gradient Background */}
      <div className="absolute inset-0" style={{ backgroundColor: '#030200' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-900/10 to-transparent" />
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-600/8 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Ultra Modern Glass Card */}
      <div className={cn(
        "relative bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-[2rem] p-10 w-full max-w-lg mx-auto transition-all duration-500 hover:bg-white/[0.12]",
        "shadow-[0_8px_32px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]"
      )}
      style={{
        boxShadow: conversation.isSpeaking 
          ? "0 8px 32px rgba(255,255,255,0.15), 0 0 60px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.25)"
          : "0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
      }}>
        <div className="relative flex flex-col items-center space-y-8 text-center">
          
          {/* Modern Logo with White Background */}
          <div className="relative flex justify-center">
            <div className={cn(
              "w-36 h-36 rounded-full relative overflow-hidden transition-all duration-700",
              "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]",
              "animate-[gentle-pulse_3s_ease-in-out_infinite]"
            )}>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <img 
                  src={bildungsfabrikLogoBlack} 
                  alt="Bildungsfabrik Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Modern Typography */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
              KI-Trainer
            </h1>
            <div className={cn(
              "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              isConnected 
                ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
            )}>
              <div className={cn(
                "w-2 h-2 rounded-full mr-2 transition-all duration-300",
                isConnected ? "bg-green-400 animate-pulse" : "bg-slate-400"
              )} />
              {isConnected ? 'Aktiv & Bereit' : 'Bereit für Verbindung'}
            </div>
          </div>

          {/* Ultra Modern Floating Action Button */}
          <button
            onClick={(e) => {
              console.log('Button clicked!', e);
              if (isConnected) {
                endConversation();
              } else {
                startConversation();
              }
            }}
            className={cn(
              "group relative w-full h-16 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
              isConnected 
                ? "bg-[#D55655] hover:bg-[#b8463f] shadow-[0_10px_30px_rgba(213,86,85,0.4)] hover:shadow-[0_15px_40px_rgba(213,86,85,0.5)]"
                : "bg-[#2FB174] hover:bg-[#259a5f] shadow-[0_10px_30px_rgba(47,177,116,0.4)] hover:shadow-[0_15px_40px_rgba(47,177,116,0.5)]",
              "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            )}
          >
            <div className="relative flex items-center justify-center gap-4 h-full text-white font-bold text-lg">
              <Phone className={cn(
                "w-6 h-6 transition-all duration-300",
                isConnected ? "rotate-180" : "rotate-0"
              )} />
              {isConnected ? 'Gespräch beenden' : 'Gespräch starten'}
            </div>
          </button>

          {/* Modern Mute Control */}
          {isConnected && (
            <div className="flex justify-center animate-fade-in">
              <button
                onClick={toggleMute}
                className={cn(
                  "group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300",
                  "bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-sm",
                  "border border-white/[0.1] hover:border-white/[0.2]",
                  "shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.4)]"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                  isMuted 
                    ? "bg-red-500/20 text-red-300" 
                    : "bg-blue-500/20 text-blue-300"
                )}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </div>
                <span className="text-white font-medium">
                  {isMuted ? 'Ton aktivieren' : 'Ton deaktivieren'}
                </span>
              </button>
            </div>
          )}

          {/* Minimal Footer */}
          <div className="flex flex-col items-center space-y-3 opacity-70 hover:opacity-90 transition-opacity duration-300">
            <p className="text-sm text-white/80 font-medium tracking-wide">
              Powered by Bildungsfabrik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
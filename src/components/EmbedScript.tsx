import React from 'react';
import { ElevenLabsInterface } from './ElevenLabsInterface';

declare global {
  interface Window {
    ElevenLabsEmbed: {
      render: (config: EmbedConfig) => void;
    };
  }
}

interface EmbedConfig {
  agentId: string;
  containerId?: string;
  height?: string;
  width?: string;
}

// This component handles the embed functionality
export const EmbedScript = () => {
  React.useEffect(() => {
    // Make the embed function globally available
    window.ElevenLabsEmbed = {
      render: (config: EmbedConfig) => {
        const container = config.containerId 
          ? document.getElementById(config.containerId)
          : document.currentScript?.parentElement;
          
        if (!container) {
          console.error('ElevenLabs Embed: Container not found');
          return;
        }

        // Create a React root and render the interface
        const root = document.createElement('div');
        container.appendChild(root);

        // We'll use dynamic import to avoid bundle issues
        import('react-dom/client').then(({ createRoot }) => {
          const reactRoot = createRoot(root);
          reactRoot.render(
            React.createElement(ElevenLabsInterface, {
              agentId: config.agentId,
              height: config.height,
              width: config.width
            })
          );
        });
      }
    };

    // Auto-initialize if script has data attributes
    const script = document.currentScript as HTMLScriptElement;
    if (script) {
      const agentId = script.getAttribute('data-agent-id');
      const height = script.getAttribute('data-height') || '600px';
      const width = script.getAttribute('data-width') || '100%';
      
      if (agentId) {
        window.ElevenLabsEmbed.render({
          agentId,
          height,
          width
        });
      }
    }
  }, []);

  return null;
};

export default EmbedScript;
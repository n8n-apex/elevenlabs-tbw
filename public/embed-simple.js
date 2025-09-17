(function() {
  // ElevenLabs Learning Suite Embed Script
  
  // Configuration - change this URL as needed
  var RAILWAY_APP_URL = 'https://elevenlabs-embed-forge-production.up.railway.app';
  
  console.log('ElevenLabs Embed: Script started');
  
  // Get the current script element
  var currentScript = document.currentScript || 
    (function() {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
  
  // Extract configuration from data attributes
  var agentId = currentScript.getAttribute('data-agent-id');
  var height = currentScript.getAttribute('data-height') || '600px';
  var width = currentScript.getAttribute('data-width') || '100%';
  var containerId = currentScript.getAttribute('data-container-id');
  
  console.log('ElevenLabs Embed: Config:', { agentId, height, width, containerId });
  
  // Note: For Railway deployment, agent ID can be configured via VITE_ELEVENLABS_AGENT_ID environment variable
  
  // Find container
  var container = containerId ? 
    document.getElementById(containerId) : 
    currentScript.parentElement;
    
  if (!container) {
    console.error('ElevenLabs Embed: Container not found');
    return;
  }
  
  console.log('ElevenLabs Embed: Container found:', container);
  
  // Build iframe URL - configurable base URL
  var baseUrl = currentScript.getAttribute('data-base-url') || RAILWAY_APP_URL;
  var iframeUrl = baseUrl + '/embed';
  
  if (agentId) {
    iframeUrl += '?agentId=' + encodeURIComponent(agentId);
  }
  
  console.log('ElevenLabs Embed: iframe URL:', iframeUrl);
  
  // Create iframe for the embed
  var iframe = document.createElement('iframe');
  iframe.src = iframeUrl;
  iframe.style.width = width;
  iframe.style.height = height;
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.backgroundColor = 'transparent';
  iframe.allowFullscreen = true;
  iframe.allow = 'microphone';
  
  console.log('ElevenLabs Embed: iframe created:', iframe);
  
  // Add loading placeholder
  var placeholder = document.createElement('div');
  placeholder.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: ' + height + '; background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 16px; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px;">Loading ElevenLabs AI...</div>';
  
  container.appendChild(placeholder);
  
  iframe.onload = function() {
    console.log('ElevenLabs Embed: iframe loaded successfully');
    if (placeholder && placeholder.parentNode) {
      container.removeChild(placeholder);
    }
  };
  
  iframe.onerror = function() {
    console.error('ElevenLabs Embed: iframe failed to load');
    placeholder.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: ' + height + '; background: linear-gradient(135deg, #dc2626, #991b1b); border-radius: 16px; color: #fef2f2; font-family: system-ui, sans-serif; font-size: 14px;">Failed to load ElevenLabs AI</div>';
  };
  
  container.appendChild(iframe);
  console.log('ElevenLabs Embed: iframe added to container');
})();
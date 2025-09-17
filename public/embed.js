(function() {
  // ElevenLabs Custom Embed Script
  
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
  
  if (!agentId) {
    console.error('ElevenLabs Embed: data-agent-id is required');
    return;
  }
  
  // Find container
  var container = containerId ? 
    document.getElementById(containerId) : 
    currentScript.parentElement;
    
  if (!container) {
    console.error('ElevenLabs Embed: Container not found');
    return;
  }
  
  // Create iframe for the embed
  var iframe = document.createElement('iframe');
  iframe.src = window.location.origin + '/embed?agentId=' + encodeURIComponent(agentId);
  iframe.style.width = width;
  iframe.style.height = height;
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.backgroundColor = 'transparent';
  iframe.allowFullscreen = true;
  
  // Add loading placeholder
  var placeholder = document.createElement('div');
  placeholder.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: ' + height + '; background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 16px; color: #e2e8f0; font-family: system-ui, sans-serif;">Loading ElevenLabs AI...</div>';
  
  container.appendChild(placeholder);
  
  iframe.onload = function() {
    container.removeChild(placeholder);
  };
  
  container.appendChild(iframe);
})();
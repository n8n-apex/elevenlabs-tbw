# ElevenLabs Voice AI Interface - Complete Recreation Guide

## Overview
This comprehensive guide provides step-by-step instructions to recreate the modern ElevenLabs voice AI interface with complete deployment configuration. This includes glassmorphism design, animated backgrounds, seamless voice interaction, Railway deployment, and all environment variables.

## 🚨 CRITICAL: Complete Project Backup Checklist
Before starting, ensure you have:
- [ ] ElevenLabs API Key and Agent ID
- [ ] All logo/asset files (bildungsfabrik-logo.png, etc.)
- [ ] Railway deployment configuration
- [ ] Any other API keys or secrets used
- [ ] Complete dependency versions (see package.json section below)

## 1. Project Setup

### Initialize React + Vite + TypeScript project
```bash
npm create vite@latest elevenlabs-interface -- --template react-ts
cd elevenlabs-interface
npm install
```

### Install Required Dependencies
```bash
# Core dependencies
npm install @elevenlabs/react
npm install lucide-react
npm install class-variance-authority
npm install clsx
npm install tailwind-merge
npm install react-router-dom

# Shadcn UI dependencies
npm install @radix-ui/react-slot
npm install tailwindcss-animate

# Development dependencies
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node
```

### Configure Tailwind CSS
```bash
npx tailwindcss init -p
```

Update `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "gentle-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1"
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.9"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "gentle-pulse": "gentle-pulse 3s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

## 2. Setup Base Styles

Create `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 3. Create Utility Functions

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 4. Create Shadcn UI Components

### Button Component
Create `src/components/ui/button.tsx`:
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Card Component
Create `src/components/ui/card.tsx`:
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }
```

## 5. Main ElevenLabs Interface Component

Create `src/components/ElevenLabsInterface.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      alert('Agent ID is required. Please configure it in environment variables.');
      return;
    }
    
    try {
      console.log('Requesting microphone access...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Starting session with agentId:', agentId);
      const id = await conversation.startSession({ 
        agentId: agentId,
        connectionType: 'webrtc'
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
                {/* Replace with your logo */}
                <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  LOGO
                </div>
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
              Powered by Your Company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## 6. Main Page Component

Create `src/pages/Index.tsx`:
```typescript
import React from 'react';
import { ElevenLabsInterface } from '@/components/ElevenLabsInterface';

const Index = () => {
  // Get agent ID from environment variable
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
```

## 7. Router Setup

Update `src/App.tsx`:
```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## 8. Environment Configuration

Create `.env` file:
```
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
```

## 9. ElevenLabs Agent Setup

1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Create an account and navigate to Conversational AI
3. Create a new agent with your desired voice and persona
4. Copy the Agent ID and set it in your environment variables
5. Configure the agent's prompt and behavior in the ElevenLabs dashboard

## 10. Key Features Implemented

### Design Features:
- **Glassmorphism UI**: Transparent backgrounds with backdrop blur
- **Animated Background**: Floating gradient blobs with pulse animations
- **Responsive Design**: Works on desktop and mobile
- **Modern Typography**: Clean, readable fonts with gradient effects
- **Dynamic Visual Feedback**: Button colors change based on connection state
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### Functional Features:
- **Voice Conversation**: Start/stop voice conversations with AI
- **Connection Status**: Visual indicators for connection state
- **Volume Control**: Mute/unmute functionality
- **Error Handling**: Graceful error handling with user feedback
- **Microphone Access**: Proper permission handling

### Color Scheme:
- **Start Button**: Green (#2FB174)
- **End Button**: Red (#D55655)
- **Background**: Dark gradient with warm amber accents
- **Text**: White with various opacity levels
- **Status Indicators**: Green for connected, gray for disconnected

## 11. Customization Options

### Logo Replacement:
Replace the placeholder logo div with your actual logo:
```typescript
<img 
  src="/path/to/your/logo.png" 
  alt="Your Logo" 
  className="w-20 h-20 object-contain"
/>
```

### Color Customization:
Update button colors by modifying the className conditions in the button component.

### Text Customization:
Change the title, status messages, and button text to match your brand.

### Background Customization:
Modify the gradient colors and blob positions to match your design preferences.

## 12. Deployment

### Environment Variables for Production:
Set `VITE_ELEVENLABS_AGENT_ID` in your hosting platform's environment variables.

### Build for Production:
```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment to any static hosting service.

## 13. Troubleshooting

### Common Issues:
1. **Microphone Access Denied**: Ensure HTTPS is used in production
2. **Agent ID Not Found**: Verify the environment variable is set correctly
3. **Connection Fails**: Check ElevenLabs API status and agent configuration
4. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Debug Mode:
Enable console logging to debug connection issues:
```typescript
console.log('Agent ID:', agentId);
console.log('Connection Status:', isConnected);
```

## 14. Additional Resources

- [ElevenLabs React SDK Documentation](https://elevenlabs.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Lucide React Icons](https://lucide.dev/)

## 🔐 Environment Variables & Secrets Configuration

### Required Environment Variables
You will need these secrets for complete functionality:

```bash
# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_AGENT_ID=your_agent_id_here
```

### Setting Up Secrets in Lovable Cloud (Recommended)
1. In Lovable, enable Lovable Cloud integration
2. Use the secrets management to add:
   - `ELEVENLABS_API_KEY`: Your ElevenLabs API key
   - `ELEVENLABS_AGENT_ID`: Your specific agent ID

### Alternative: Frontend Configuration
If keeping frontend-only, users can input API keys in the interface and store in localStorage.

## 🚀 Railway Deployment Configuration

### Required Files for Railway Deployment

Create `railway.json` in root directory:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Railway Environment Variables
Set these in Railway dashboard:
- `ELEVENLABS_API_KEY`: Your ElevenLabs API key
- `ELEVENLABS_AGENT_ID`: Your agent ID
- `NODE_ENV`: production

### Railway Deployment Steps
1. Connect GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy from main branch
4. Railway will automatically build and deploy

## 🎨 Logo and Asset Management

### Required Asset Files
Place these in `src/assets/`:
```
src/assets/
├── bildungsfabrik-logo.png
├── bildungsfabrik-logo-gold.png
└── logo-black.png
```

### Logo Integration
Update the logo section in ElevenLabsInterface.tsx:
```typescript
// Replace the placeholder logo div with:
<img 
  src="/src/assets/bildungsfabrik-logo.png" 
  alt="Bildungsfabrik Logo" 
  className="w-20 h-20 object-contain"
/>
```

## 📦 Complete Package.json Dependencies

### Exact Dependency Versions Used
```json
{
  "dependencies": {
    "@elevenlabs/react": "^0.6.2",
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "@types/dom-mediacapture-record": "^1.0.22",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  }
}
```

## 🔄 Alternative Hosting Platforms

### Vercel Deployment
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from main branch

### Netlify Deployment  
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables

### Self-Hosting
1. Build project: `npm run build`
2. Serve `dist` folder with any web server
3. Ensure environment variables are available at runtime

## 🛠 Troubleshooting Guide

### Common Issues and Solutions

**Issue**: ElevenLabs connection fails
- **Solution**: Verify API key and agent ID are correctly set
- **Check**: Network connectivity and microphone permissions

**Issue**: Build fails in production
- **Solution**: Ensure all dependencies match exact versions
- **Check**: Node.js version compatibility (use Node 18+)

**Issue**: Styling looks different
- **Solution**: Verify Tailwind CSS configuration matches exactly
- **Check**: All CSS custom properties are defined in index.css

## 🔐 Security Best Practices

### API Key Management
- Never commit API keys to version control
- Use environment variables or secure secret management
- Rotate API keys regularly
- Use least-privilege access for services

### Production Considerations
- Enable HTTPS in production
- Implement rate limiting for API calls
- Add error boundaries for React components
- Monitor API usage and costs

## ✅ Final Verification Checklist

Before considering the project complete:

- [ ] All dependencies installed and versions match
- [ ] ElevenLabs integration working with valid API key
- [ ] UI matches design (glassmorphism, animations, colors)
- [ ] Responsive design works on mobile/desktop
- [ ] Voice conversation starts/stops correctly
- [ ] Mute/unmute functionality works
- [ ] Proper error handling implemented
- [ ] Logo and assets properly loaded
- [ ] Deployment successful and accessible
- [ ] Environment variables configured
- [ ] Railway configuration applied (if using Railway)

This guide provides everything needed to recreate the modern ElevenLabs voice AI interface from scratch with complete deployment configuration. Follow each step carefully and customize as needed for your specific use case.
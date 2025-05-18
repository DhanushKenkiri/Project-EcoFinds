import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, Search } from 'lucide-react';
import { speechToText, textToSpeech } from '@/services/groq-ai';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceSearchProps {
  onTranscription?: (text: string) => void;
  onSearch?: (text: string) => void;
}

export default function VoiceSearch({ onTranscription, onSearch }: VoiceSearchProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    
    if (isRecording) {
      setShowAnimation(true);
      timerId = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    
    // Simulate audio recording (in a real app, we'd use the Web Audio API)
    // After a fixed duration (or when user stops), we'd send to Groq API
    setTimeout(() => {
      simulateTranscription();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowAnimation(false);
  };

  const simulateTranscription = async () => {
    if (!isRecording) return;
    
    stopRecording();
    setIsProcessing(true);
    
    try {
      // Create an empty audio blob for demo purposes
      // In a real app, this would be actual recorded audio
      const audioBlob = new Blob([], { type: 'audio/webm' });
      
      // Send to Groq AI speech-to-text
      const result = await speechToText(audioBlob);
      
      if (result.text) {
        setTranscript(result.text);
        
        if (onTranscription) {
          onTranscription(result.text);
        }
      } else {
        setTranscript('Sorry, I didn\'t catch that.');
      }
    } catch (error) {
      console.error('Transcription error:', error);
      setTranscript('Sorry, something went wrong.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePlayback = async () => {
    try {
      // In a real implementation, this would convert text to speech
      // and play the result
      const audioBlob = await textToSpeech(transcript);
      
      // Create an Audio object for playback
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      
      // Clean up the object URL when done
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Text to speech error:', error);
    }
  };
  
  const handleSearch = () => {
    if (onSearch && transcript) {
      onSearch(transcript);
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <Card className="voice-search-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Search
        </CardTitle>
        <CardDescription>
          Speak to search for eco-friendly products
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <motion.div 
              className="absolute -inset-4 rounded-full"
              animate={{
                scale: showAnimation ? [1, 1.2, 1] : 1,
                opacity: showAnimation ? [0.5, 0.2, 0.5] : 0.5,
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ backgroundColor: 'hsla(var(--primary) / 0.15)' }}
            />
            
            <Button 
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className={`h-16 w-16 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
            >
              {isRecording ? (
                <MicOff className="h-6 w-6" />
              ) : isProcessing ? (
                <span className="animate-pulse">...</span>
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
            
            {isRecording && (
              <div 
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2"
              >
                <span className="text-sm text-red-400">{formatTime(recordingTime)}</span>
              </div>
            )}
          </div>
          
          <AnimatePresence>
            {transcript && (
              <motion.div 
                className="w-full mt-4 p-4 bg-card/50 border rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-base mb-4">"{transcript}"</p>
                
                <div className="flex gap-2 justify-between">
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={handlePlayback}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    <span>Listen</span>
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    <span>Search</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isRecording && !transcript && (
            <div className="text-center text-muted-foreground text-sm mt-4">
              {isProcessing ? 'Processing...' : 'Tap the microphone to start speaking'}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        Powered by Groq AI speech-to-text
      </CardFooter>
    </Card>
  );
} 
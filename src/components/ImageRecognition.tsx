import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X, Search, RefreshCcw } from 'lucide-react';
import { recognizeProductImage } from '@/services/groq-ai';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageRecognitionProps {
  onRecognition?: (description: string, tags: string[]) => void;
}

export default function ImageRecognition({ onRecognition }: ImageRecognitionProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ description: string; tags: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      analyzeImage(file);
    };
    reader.readAsDataURL(file);
  };
  
  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // In a real implementation, we'd upload the file
      // For demo, we're using a mock which returns random results
      const imageBlob = new Blob([file], { type: file.type });
      const analysisResult = await recognizeProductImage(imageBlob);
      
      setResult(analysisResult);
      
      if (onRecognition) {
        onRecognition(analysisResult.description, analysisResult.tags);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const clearImage = () => {
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const retakePhoto = () => {
    clearImage();
    setTimeout(triggerFileSelect, 300);
  };
  
  return (
    <Card className="image-recognition-card overflow-hidden">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" /> 
          Product Recognition
        </CardTitle>
        <CardDescription>
          Take or upload a photo to identify eco-friendly products
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          capture="environment"
        />
        
        {!imagePreview ? (
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center" 
              onClick={triggerFileSelect}
            >
              <Camera className="h-8 w-8 mb-2 text-primary" />
              <span>Take Photo</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center" 
              onClick={triggerFileSelect}
            >
              <Upload className="h-8 w-8 mb-2 text-accent" />
              <span>Upload Image</span>
            </Button>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Product" 
              className="w-full h-48 object-cover rounded-lg"
            />
            
            <button 
              className="absolute top-2 right-2 p-1 bg-black/70 rounded-full"
              onClick={clearImage}
            >
              <X className="h-4 w-4 text-white" />
            </button>
            
            {isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <RefreshCcw className="animate-spin h-8 w-8 text-white mb-2" />
                  <span className="text-sm text-white">Analyzing...</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-card/50 border p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Recognized Product:</h4>
                <p className="text-lg mb-2">{result.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-secondary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={retakePhoto}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    New Photo
                  </Button>
                  
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => onRecognition && onRecognition(result.description, result.tags)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        Powered by Groq AI image recognition
      </CardFooter>
    </Card>
  );
} 
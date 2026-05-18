import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Apple-inspired spinner with gradient */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-[3px] border-transparent bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-0.5">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
          
          {/* Subtle outer glow */}
          <div className="absolute inset-0 rounded-full shadow-lg shadow-primary/10 dark:shadow-primary/20 animate-ping opacity-75"></div>
        </div>
        
        {/* Minimal progress indicator */}
        <div className="h-1 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progress"></div>
        </div>
      </div>
      
   
    </div>
  );
};

export default LoadingSpinner;
"use client";
import { Terminal, Timer } from "lucide-react"
import { useEffect,useState } from "react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
type AlertVariants =  "destructive" | "danger" | "info" | "hidden" | "default" | null | undefined

interface AlertProps {
    variant: AlertVariants;
    tittle?: string;
    body: string;
    duration?: number;
}




export function AlertPro({ variant, tittle, body, duration }: AlertProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if(duration){
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration*1000);
            return () => clearTimeout(timer);
        }
        
    }, [duration])
  return (
    <>
    {visible && (
        <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{tittle}</AlertTitle>
      <AlertDescription>
        {body}
      </AlertDescription>
    </Alert>
    
    )}
    </>
  )
}
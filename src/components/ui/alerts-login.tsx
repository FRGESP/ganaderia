"use client";
import { Terminal, Timer } from "lucide-react"
import { useEffect,useState } from "react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
type AlertVariants =  "destructive" | "hidden" | "default" | null | undefined

interface AlertProps {
    variant: AlertVariants;
    tittle?: string;
    body: string;
    duracion?: number;
}




export function AlertPro({ variant, tittle, body, duracion }: AlertProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if(duracion){
            const timer = setTimeout(() => {
                setVisible(false);
            }, duracion*1000);
            return () => clearTimeout(timer);
        }
        
    }, [duracion])
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
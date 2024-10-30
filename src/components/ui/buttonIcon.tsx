import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { FC } from "react";

interface ButtonIconProps {
  iconName: keyof typeof Icons;
}

export function ButtonIcon({ iconName }: ButtonIconProps) {
  const IconComponent = Icons[iconName] as FC;

  return (
    <Button variant="outline" size="icon">
      {IconComponent && <IconComponent />}
    </Button>
  );
}
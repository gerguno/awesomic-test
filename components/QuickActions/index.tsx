import cn from "classnames";
import Button from "@/components/Button";
import { type IconRegistryName } from "@/assets/icons";
import styles from "./index.module.scss";

export type QuickAction = {
  id: string;
  icon: IconRegistryName;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export default function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn(styles.root, className)}>
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="secondary"
          size="m"
          borderless
          icon={action.icon}
          aria-label={action.label}
          disabled={action.disabled}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
}

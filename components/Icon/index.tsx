import { forwardRef, type SVGProps } from "react";
import { iconRegistry } from "@/assets/icons";

type IconRegistryName = keyof typeof iconRegistry;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconRegistryName | (string & {});
}

function resolveIconComponent(name: string) {
  if (name in iconRegistry) {
    return iconRegistry[name as IconRegistryName];
  }
  return null;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref) => {
  const Component = resolveIconComponent(name);

  if (!Component) {
    throw new Error(`Icon "${name}" does not exist, check the icon registry for typos`);
  }

  return <Component ref={ref} {...props} />;
});

Icon.displayName = "Icon";

export default Icon;

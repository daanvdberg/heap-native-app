declare module "@roninoss/icons" {
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    namingScheme?: "sfSymbol" | "material";
    [key: string]: any;
  }

  export const Icon: React.FC<IconProps>;
}

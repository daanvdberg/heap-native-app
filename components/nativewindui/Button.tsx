import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";

import { cn } from "@/lib/cn";
import { Text } from "./Text";

const buttonVariants = cva("flex-row items-center justify-center rounded-lg", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      outline: "border border-border bg-transparent",
      ghost: "bg-transparent",
      destructive: "bg-destructive",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-8 px-2",
      lg: "h-12 px-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("font-medium text-center", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      ghost: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
}

export function Button({
  children,
  className,
  textClassName,
  variant,
  size,
  disabled,
  onPress,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={cn(
        buttonVariants({ variant, size }),
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(buttonTextVariants({ variant, size }), textClassName)}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

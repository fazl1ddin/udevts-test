import * as React from "react";

import { cn } from "~/shared/lib/utils";
import { AnyIconName } from "../types/icon";
import { Icon } from "./icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: AnyIconName;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="h-6 w-6 absolute top-1/2 -translate-y-1/2 left-2"
          />
        )}
        <input
          type={type}
          className={cn(
            "rounded-md border pl-4 h-9 placeholder:text-sm placeholder:align-middle placeholder:leading-[14px] w-80 outline-primary",
            { "pl-10": !!icon },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

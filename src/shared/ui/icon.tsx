import clsx from "clsx";
import type { SVGProps } from "react";
import { AnyIconName } from "~/shared/types/icon";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: AnyIconName;
}

function Icon({ name, className, viewBox, ...props }: IconProps) {
  return (
    <svg
      className={clsx("select-none inline-block box-content", className)}
      viewBox={viewBox}
      // prevent icon from being focused when using keyboard navigation
      focusable="false"
      // hide icon from screen readers
      aria-hidden
      {...props}
    >
      <use href={`/sprite.143e8b07.svg#${name}`} />
    </svg>
  );
}

export { Icon };

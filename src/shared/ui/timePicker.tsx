import { format } from "date-fns/format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import React from "react";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "../lib/utils";
import { Icon } from "./icon";

export function TimePicker({ ...props }: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full p-2 flex justify-between items-center gap-2 border rounded data-[state='open']:border-primary">
        <div className="flex justify-start items-center gap-2">
          <Icon name="time" className="h-5 w-5" />
          <div className={cn({ "text-muted-foreground": !props.value })}>
            <p className="text-[10px] font-normal">Date and time</p>
            <p className="text-sm font-bold">
              <SelectValue placeholder="Time" />
            </p>
          </div>
        </div>
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 24 }).map((_, index) => {
          return (
            <React.Fragment key={index}>
              <SelectItem
                value={format(
                  new Date(
                    `Wed Aug 14 2024 ${index < 10 ? "0" + index : index}:00:00 GMT+0500 (Узбекистан, стандартное время)`
                  ),
                  "hh':'mm' 'a"
                )}
              >
                {format(
                  new Date(
                    `Wed Aug 14 2024 ${index < 10 ? "0" + index : index}:00:00 GMT+0500 (Узбекистан, стандартное время)`
                  ),
                  "hh':'mm' 'a"
                )}
              </SelectItem>
              {index < 24 && (
                <SelectItem
                  value={format(
                    new Date(
                      `Wed Aug 14 2024 ${index < 10 ? "0" + index : index}:30:00 GMT+0500 (Узбекистан, стандартное время)`
                    ),
                    "hh':'mm' 'a"
                  )}
                >
                  {format(
                    new Date(
                      `Wed Aug 14 2024 ${index < 10 ? "0" + index : index}:30:00 GMT+0500 (Узбекистан, стандартное время)`
                    ),
                    "hh':'mm' 'a"
                  )}
                </SelectItem>
              )}
            </React.Fragment>
          );
        })}
      </SelectContent>
    </Select>
  );
}

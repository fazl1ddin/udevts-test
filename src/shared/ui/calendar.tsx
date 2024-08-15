import {
  DayPicker,
  DayPickerSingleProps,
} from "react-day-picker";

import { cn } from "~/shared/lib/utils";
import { Icon } from "./icon";
import { ru } from "date-fns/locale";
import { Button } from "./button";

function CalendarFooter({ clearHandler }: { clearHandler: () => void }) {
  return (
    <div className="flex justify-end">
      <Button variant={"ghost"} onClick={clearHandler}>
        Clear
      </Button>
    </div>
  );
}

export type CalendarProps = DayPickerSingleProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const clearHandler = () => {
    // @ts-ignore
    props.onSelect && props?.onSelect(undefined, "", undefined, undefined);
  };

  return (
    <DayPicker
      locale={ru}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium capitalize text-sm font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button:
          "bg-muted h-6 w-6 flex items-center justify-center rounded-full",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7",
        head_cell: "text-muted-foreground leading-6 font-normal capitalize",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-white focus:bg-primary focus:text-white",
        day_today: "bg-primary-foreground rounded-md text-white",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <Icon name="chevron-down" className="rotate-90 w-full h-full" />
        ),
        IconRight: ({ ...props }) => (
          <Icon name="chevron-down" className="-rotate-90 w-full h-full" />
        ),
      }}
      footer={<CalendarFooter clearHandler={clearHandler} />}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

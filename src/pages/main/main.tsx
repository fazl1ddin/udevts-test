import { useForm } from "effector-forms";
import { Calendar } from "~/shared/ui/calendar";
import { Icon } from "~/shared/ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import {
  $orders,
  changeEvent,
  changeIndexEvent,
  deleteEvent,
  Form,
} from "./model";
import { SideBar } from "~/widgets/sidebar/ui";
import { Header } from "~/widgets/header/ui";
import { Input } from "~/shared/ui/input";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useUnit } from "effector-react";
import { cn } from "~/shared/lib/utils";
import { OrderNew } from "~/widgets/order_new/ui";
import { Status } from "./types";
import { OrderBlank } from "~/widgets/order_blank/ui";
import { OrderReady } from "~/widgets/order_ready/ui";
import { OrderCourier } from "~/widgets/order_courier/ui";

// const options = [
//   { label: "To do", value: "0" },
//   { label: "In-Progress", value: "1" },
//   { label: "In Review", value: "2" },
//   { label: "Completed", value: "3" },
//   { label: "Archieved", value: "4" },
// ];

// const MultiSelectTest = () => {
//   const [value, setValue] = useState<string[]>([]);
//   return (
//     <MultiSelector
//       className="w-64"
//       values={value}
//       onValuesChange={setValue}
//       loop={false}
//     >
//       <MultiSelectorTrigger icon="search">
//         <MultiSelectorInput placeholder="Text input" />
//       </MultiSelectorTrigger>
//       <MultiSelectorContent className="max-h-64">
//         <MultiSelectorList>
//           {options.map((option, i) => (
//             <MultiSelectorItem key={i} value={option.value}>
//               {option.label}
//             </MultiSelectorItem>
//           ))}
//         </MultiSelectorList>
//       </MultiSelectorContent>
//     </MultiSelector>
//   );
// };

const bookedDays = [new Date("9/21/2020")];
const holidays = [
  new Date("9/24/2020"),
  new Date("9/26/2020"),
  new Date("9/27/2020"),
];

export function Main() {
  const {
    fields: { date /*time*/ },
  } = useForm(Form);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <Header />
        <div className="py-2.5 px-4 h-[calc(100vh-3.5rem)] overflow-hidden">
          <div className="flex justify-between pb-2.5">
            <div>
              <Input icon="search" placeholder="Поиск по ID" />
            </div>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="h-full px-3 py-1.5 flex gap-1.5 border rounded-md [&>svg]:data-[state='open']:-rotate-0 data-[state='open']:border-primary">
                    <div className="flex justify-start items-center gap-3">
                      <Icon
                        name="shopping-list"
                        className="h-5 w-5 text-primary"
                      />
                      Всего: 115
                    </div>
                    <Icon
                      name="chevron-down"
                      className="h-6 w-6 text-primary -rotate-90 transition-transform"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    modifiers={{
                      booked: bookedDays,
                      holiday: holidays,
                    }}
                    modifiersClassNames={{
                      booked: "bg-transparent font-semibold text-primary",
                      holiday: "line-through text-muted-foreground opacity-50 ",
                    }}
                    selected={
                      typeof date.value === "string" ? undefined : date.value
                    }
                    onSelect={(_, selectedDay) => date.onChange(selectedDay)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="h-full px-3 py-1.5 flex gap-1.5 border rounded-md [&>svg]:data-[state='open']:-rotate-0 data-[state='open']:border-primary">
                <div className="flex justify-start items-center gap-3">
                  <Icon name="time" className="h-5 w-5 text-primary" />
                  45:08
                </div>
              </div>
            </div>
          </div>
          <Board isCombineEnabled />
          {/* <div className="flex">
            <div className="pt-2 pb-[23px] px-3 w-60 rounded bg-white m-10 drop-shadow-2xl">
              <div className="flex items-center justify-between py-2 pl-[3.5px] mb-2">
                <span className="text-sm font-bold">Reschedule product</span>
                <div
                  className="h-6 w-6 flex cursor-pointer bg-muted p-1 rounded-full items-center justify-center"
                  data-for="close"
                >
                  <Icon name="Xclose" className="opacity-50 w-full h-full" />
                </div>
              </div>
              <p className="text-[10px] mb-4 leading-3">
                Choose a day and time in the future you want your product to be
                published
              </p>
              <form onSubmit={onSubmit} className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="p-2 flex justify-start items-center gap-2 border rounded data-[state='open']:border-primary">
                      <Icon name="calendar-minus" className="h-5 w-5" />
                      <div
                        className={cn({ "text-muted-foreground": !date.value })}
                      >
                        <p className="text-[10px] font-normal">Date and time</p>
                        <p className="text-sm font-bold">
                          {date.value ? (
                            format(date.value, "d' 'LLL")
                          ) : (
                            <p>Pick a date</p>
                          )}
                        </p>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      modifiers={{
                        booked: bookedDays,
                        holiday: holidays,
                      }}
                      modifiersClassNames={{
                        booked: "bg-transparent font-semibold text-primary",
                        holiday:
                          "line-through text-muted-foreground opacity-50 ",
                      }}
                      selected={
                        typeof date.value === "string" ? undefined : date.value
                      }
                      onSelect={(_, selectedDay) => date.onChange(selectedDay)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <TimePicker
                  onValueChange={(value) => time.onChange(value)}
                  value={time.value}
                />
                <div className="p-2 flex justify-start items-center gap-2 border rounded">
                  <Icon name="calendar-minus" className="h-5 w-5" />
                  <div>
                    <p className="text-[10px] font-normal">Date and time</p>
                    <p className="text-sm font-bold">
                      {date.value && time.value ? (
                        <>
                          {date.value && format(date.value, "d' 'LLL")},{" "}
                          {time.value}
                        </>
                      ) : (
                        "Pick a date and time"
                      )}
                    </p>
                  </div>
                </div>
                <Button className="w-full">Reschedule</Button>
              </form>
            </div>
            <MultiSelectTest />
          </div> */}
        </div>
      </div>
    </div>
  );
}

const columns: { title: string; status: Status }[] = [
  { title: "Новый", status: 0 },
  { title: "Заготовка", status: 1 },
  { title: "Готов", status: 2 },
  { title: "Курьер в пути", status: 3 },
];

type BoardProps = {
  isCombineEnabled: boolean;
};

function Board({ isCombineEnabled = false }: BoardProps) {
  const [orders, onChange, onIndexChange, onDelete] = useUnit([
    $orders,
    changeEvent,
    changeIndexEvent,
    deleteEvent,
  ]);

  const onDragEndHandler: OnDragEndResponder = (event) => {
    if (event.source.droppableId === event.destination?.droppableId) {
      return onIndexChange({
        columnId: Number(event.source.droppableId) as Status,
        fromIndex: event.source.index,
        toIndex: event.destination.index,
      });
    }

    onChange({
      id: Number(event.draggableId),
      from: Number(event.source.droppableId) as Status,
      to: Number(event.destination?.droppableId) as Status,
      toIndex: Number(event.destination?.index),
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={true}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided) => (
          <div
            className="py-4 grid grid-cols-4 gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((column, index) => {
              const quotes = orders[column.status];
              return (
                <>
                  <Draggable draggableId={String(column.status)} index={index}>
                    {(provided) => (
                      <div
                        className="rounded-md overflow-hidden"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            "h-12 text-white text-sm font-bold flex items-center justify-start pl-3 tracking-widest",
                            {
                              "bg-[#0e73f6]": column.status === 0,
                              "bg-[#f8c41b]": column.status === 1,
                              "bg-[#22c348]": column.status === 2,
                              "bg-[#1ac19d]": column.status === 3,
                            }
                          )}
                          {...provided.dragHandleProps}
                          aria-label={`${column.title} quote list`}
                        >
                          {column.title} ({quotes.length})
                        </div>
                        <Droppable
                          droppableId={String(column.status)}
                          type="ORDER"
                          direction="vertical"
                          isCombineEnabled={isCombineEnabled}
                        >
                          {(dropProvided) => (
                            <div
                              className="bg-muted p-2 pt-3 h-[calc(100vh-11.25rem)] overflow-y-auto space-y-2"
                              ref={dropProvided.innerRef}
                              {...dropProvided.droppableProps}
                            >
                              {quotes.map((quote, index) => (
                                <Draggable
                                  key={quote.id}
                                  draggableId={String(quote.id)}
                                  index={index}
                                >
                                  {(dragProvided) => (
                                    <div
                                      className="[&_.blank-order]:first:block [&_.blank-ready]:last:block"
                                      {...dragProvided.dragHandleProps}
                                      {...dragProvided.draggableProps}
                                      ref={dragProvided.innerRef}
                                    >
                                      {components[column.status]({
                                        ...quote,
                                        onCancel: () => {
                                          onDelete({ id: quote.id });
                                        },
                                        onConfirm: () => {
                                          onChange({
                                            id: quote.id,
                                            from: 0,
                                            to: 1,
                                            toIndex: 0,
                                          });
                                        },
                                        onReady: () => {
                                          onChange({
                                            id: quote.id,
                                            from: 1,
                                            to: 2,
                                            toIndex: 0,
                                          });
                                        },
                                        onEnd: () => {
                                          onChange({
                                            id: quote.id,
                                            from: 2,
                                            to: 3,
                                            toIndex: 0,
                                          });
                                        },
                                      })}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                </>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const components = {
  0: OrderNew,
  1: OrderBlank,
  2: OrderReady,
  3: OrderCourier,
};

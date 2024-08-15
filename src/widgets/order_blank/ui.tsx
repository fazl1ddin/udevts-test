import { OrderDetails } from "~/entities/order_details/ui";
import { OrderDetail } from "~/shared/types/orderDetails";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/shared/ui/accordion";
import { Button } from "~/shared/ui/button";
import { Icon } from "~/shared/ui/icon";

type OrderBlankProps = { onReady: () => void } & OrderDetail;

export function OrderBlank({ onReady, ...props }: OrderBlankProps) {
  return (
    <div className="rounded-md bg-white divide-y divide-muted-foreground">
      <OrderDetails {...props} />
      <div className="blank-order p-3 hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center justify-start gap-1">
                Коментарии(1){" "}
                <div className="w-6 h-[18px] flex items-center justify-center rounded-full text-xs bg-primary text-white">
                  +3
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant={"outline"} className="w-full" onClick={onReady}>
          <Icon name="done_primary" className="w-5 h-5 !text-primary" />
          Готово
        </Button>
      </div>
    </div>
  );
}

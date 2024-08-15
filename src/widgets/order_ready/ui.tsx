import { OrderDetails } from "~/entities/order_details/ui";
import { OrderDetail } from "~/shared/types/orderDetails";
import { Button } from "~/shared/ui/button";

type OrderReadyProps = { onEnd: () => void } & OrderDetail;

export function OrderReady({ onEnd, ...props }: OrderReadyProps) {
  return (
    <div className="rounded-md bg-white divide-y divide-muted-foreground">
      <OrderDetails {...props} />
      <div className="blank-ready p-3 hidden">
        <Button variant={"outline"} className="w-full" onClick={onEnd}>
          Завершить
        </Button>
      </div>
    </div>
  );
}

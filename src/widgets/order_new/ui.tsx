import { OrderDetails } from "~/entities/order_details/ui";
import { OrderDetail } from "~/shared/types/orderDetails";
import { Button } from "~/shared/ui/button";
import { Icon } from "~/shared/ui/icon";

type OrderNewProps = { onCancel: () => void; onConfirm: () => void } & OrderDetail;

export function OrderNew({ onCancel, onConfirm, ...props }: OrderNewProps) {
  return (
    <div className="rounded-md bg-white divide-y divide-muted-foreground">
      <OrderDetails {...props} />
      <div className="new-order p-3 flex justify-between items-center gap-1.5 [&>button]:w-full">
        <Button status={"danger"} variant={"outline"} onClick={onCancel}>
          <Icon name="close" className="w-5 h-5" />
          Отменить
        </Button>
        <Button onClick={onConfirm}>
          <Icon name="done" className="w-5 h-5" />
          Принять
        </Button>
      </div>
    </div>
  );
}

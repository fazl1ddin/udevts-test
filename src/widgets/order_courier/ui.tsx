import { OrderDetails } from "~/entities/order_details/ui";
import { OrderDetail } from "~/shared/types/orderDetails";

type OrderCourierProps = {} & OrderDetail;

export function OrderCourier({ ...props }: OrderCourierProps) {
  return (
    <div className="rounded-md bg-white divide-y divide-muted-foreground">
      <OrderDetails {...props} />
    </div>
  );
}

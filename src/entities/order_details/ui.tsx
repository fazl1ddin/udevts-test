import { format } from "date-fns";
import { OrderDetail } from "~/shared/types/orderDetails";
import { Icon } from "~/shared/ui/icon";

type OrderDetailsProps = OrderDetail;

export function OrderDetails({
  id,
  total,
  isDelivery,
  paymentType,
  products,
  createdAt,
}: OrderDetailsProps) {
  return (
    <>
      <div className="flex justify-between items-center p-3">
        <div className="flex justify-between items-center gap-2">
          <div className="font-bold text-lg">ID: {id}</div>
          <Icon name="alert-circle" className="w-4 h-4" />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="text-sm font-normal leading-5">
            {new Intl.NumberFormat("ru-RU").format(total)} сум
          </div>
          <Icon name={paymentType} className="w-4 h-4" />
          <Icon name={isDelivery ? "delivery" : "pickup"} className="w-4 h-4" />
        </div>
      </div>
      <div className="p-2 space-y-3">
        <div className="flex flex-col gap-3">
          {products.map(({ count, product }, index) => {
            return (
              <div key={index} className="flex items-start justify-start gap-1">
                <div className="font-medium text-sm">{count} x </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">{product.name}</p>
                  {product.options?.map((option, index) => (
                    <p className="text-xs" key={index}>
                      {option.title}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end items-center gap-1.5">
          <Icon name="watch_later" className="w-4 h-4" />
          <div className="text-sm">{format(createdAt, "HH':'mm")}</div>
        </div>
      </div>
    </>
  );
}

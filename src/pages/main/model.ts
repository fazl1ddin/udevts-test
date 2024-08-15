import { createEvent, createStore } from "effector";
import { createForm } from "effector-forms";
import { OrderDetail } from "~/shared/types/orderDetails";
import { Status } from "./types";

export const Form = createForm<{ date: Date | string; time: string }>({
  fields: {
    date: {
      init: new Date("9/11/2020"),
    },
    time: {
      init: "", // field's store initial value
      rules: [
        {
          name: "required",
          validator: (value: string) => !!value,
        },
      ],
    },
  },
  validateOn: ["submit"],
});

const productVariants: OrderDetail["products"][] = [
  [
    {
      count: 3,
      product: {
        name: "Пепси 0,5",
      },
    },
    {
      count: 1,
      product: {
        name: "Гамбургер",
        options: [
          {
            title: "C сыром",
          },
          {
            title: "Без лука",
          },
        ],
      },
    },
    {
      count: 2,
      product: {
        name: "Лаваш мясной Standart острый",
      },
    },
  ],
  [
    {
      count: 1,
      product: {
        name: "Big Gamburger",
        options: [
          {
            title: "C сыром",
          },
          {
            title: "Без лука",
          },
        ],
      },
    },
    {
      count: 4,
      product: {
        name: "Пепси 0,5",
      },
    },
    {
      count: 2,
      product: {
        name: "Лаваш мясной Standart острый",
      },
    },
    {
      count: 1,
      product: {
        name: "Дабл Бургер",
        options: [
          {
            title: "C сыром",
          },
          {
            title: "Без лука",
          },
        ],
      },
    },
  ],
  [
    {
      count: 1,
      product: {
        name: "Big Gamburger",
        options: [
          {
            title: "C сыром",
          },
          {
            title: "Без лука",
          },
        ],
      },
    },
    {
      count: 3,
      product: {
        name: "Пепси 0,5",
      },
    },
    {
      count: 2,
      product: {
        name: "Лаваш мясной Standart острый",
      },
    },
  ],
  [
    {
      count: 1,
      product: {
        name: "Гамбургер",
        options: [
          {
            title: "C сыром",
          },
          {
            title: "Без лука",
          },
        ],
      },
    },
  ],
  [
    {
      count: 2,
      product: {
        name: "Лаваш мясной Standart острый",
      },
    },
  ],
];

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(count: number): OrderDetail[] {
  const types: OrderDetail["paymentType"][] = [
    "apelsin",
    "cash",
    "click",
    "credit-card",
    "payme",
  ];
  return Array.from({ length: count }).map(() => {
    return {
      createdAt: new Date(
        new Date().setHours(getRandom(0, 24), getRandom(0, 60))
      ),
      isDelivery: !!getRandom(0, 1),
      paymentType: types[getRandom(0, types.length - 1)],
      total: getRandom(0, 1_000_000),
      products: productVariants[getRandom(0, productVariants.length - 1)],
      id: getRandom(0, 999999),
    };
  });
}

const data = { 0: generate(5), 1: generate(3), 2: generate(3), 3: generate(1) };

export const deleteEvent = createEvent<{ id: number }>();

export const changeEvent = createEvent<{
  from: Status;
  to: Status;
  toIndex: number;
  id: number;
}>();

export const changeIndexEvent = createEvent<{
  fromIndex: number;
  toIndex: number;
  columnId: Status;
}>();

export const $orders = createStore(data)
  .on(changeEvent, (state, { from, to, toIndex, id }) => {
    const beforeIndex = state[to].slice(0, toIndex);
    const afterIndex = state[to].slice(toIndex);

    return {
      ...state,
      [from]: state[from].filter((item) => item.id !== id),
      [to]: [
        ...beforeIndex,
        state[from].find((item) => item.id === id),
        ...afterIndex,
      ],
    };
  })
  .on(changeIndexEvent, (state, { fromIndex, toIndex, columnId }) => {
    const from = { ...state[columnId][fromIndex] };
    state[columnId] = state[columnId].filter((item) => item.id !== from.id);
    const beforeIndex = state[columnId].slice(0, toIndex);
    const afterIndex = state[columnId].slice(toIndex);
    return {
      ...state,
      [columnId]: [...beforeIndex, from, ...afterIndex],
    };
  })
  .on(deleteEvent, (state, { id }) => {
    return { ...state, [0]: state[0].filter((item) => item.id !== id) };
  });

$orders.watch((state, payload) => console.log(state, payload));

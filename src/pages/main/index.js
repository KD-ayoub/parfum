import { atom, useAtom } from "jotai";

const initialValues = {
    settings: {
      changed: false,
      frequency: {
        tracked: {
          amount: 0,
          unit: "Hours",
        },
        untracked: {
          amount: 30,
          unit: "Days",
        },
      },
      price_change: {
        amount: 5,
        unit: "%",
      },
      stock: {
        stock_to_out: false,
        out_to_in: false,
      },
      emails: [],
    },
  };
  
  const settingData = atom(initialValues);

  export default settingData;
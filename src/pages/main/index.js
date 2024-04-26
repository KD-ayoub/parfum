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
  const itemInitials = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }
  const showItemSettingsArray = [];
  const queryParams = {
    pageSize: 25,
    page: "1",
    search: "",
    status: null,
    ordering: '',
  };

  export const settingData = atom(initialValues);
  export const itemsData = atom(itemInitials);
  export const showItemSettings = atom(showItemSettingsArray);
  export const intialqueryParams = atom(queryParams);

  // export default settingData;
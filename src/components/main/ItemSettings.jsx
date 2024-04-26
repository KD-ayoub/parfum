import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AntSwitch from "../../utils/main/AntSwitch";
import "../styledComponents/style.css";
import { useAtom } from "jotai";
import { itemsData } from "../../pages/main/index";
import { produce } from "immer";
import FilterSelect from "../styledComponents/FilterSelect";
import postItemSettings from "../../api/getItemStatus";
import { Toaster, toast } from "sonner";
import { method } from "lodash";
import putItemSettings from "../../api/putItemSettings";

const defaultItemsetting = {
  changed: false,
  desired_price: 0,
  is_desired_price: false,
  stock_availability: false,
  tarcking_frequency: {
    amount: 0,
    unit: "Hours",
  },
};

export default function ItemSettings({ index }) {
  const [items, setItems] = useAtom(itemsData);
  function handlPriceChange(e) {
    const parsed = parseInt(e.target.value);
    setItems(
      produce(items, (draft) => {
        if (draft.results[index].setting) {
          draft.results[index].setting.desired_price = isNaN(parsed)
            ? 0
            : parsed;
        } else {
          draft.results[index].setting = defaultItemsetting;
          draft.results[index].setting.desired_price = isNaN(parsed)
            ? 0
            : parsed;
        }
      })
    );
  }
  function handlPriceSwitch(e) {
    setItems(
      produce(items, (draft) => {
        draft.results[index].setting.is_desired_price = e.target.checked;
      })
    );
  }
  function handlStockSwitch(e) {
    setItems(
      produce(items, (draft) => {
        draft.results[index].setting.stock_availability = e.target.checked;
      })
    );
  }
  function handlTrackedNum(e) {
    const parsed = parseInt(e.target.value);
    setItems(
      produce(items, (draft) => {
        draft.results[index].setting.tarcking_frequency.amount = isNaN(parsed)
          ? 0
          : parsed;
      })
    );
  }
  function handlTrackedUnit(e) {
    setItems(
      produce(items, (draft) => {
        draft.results[index].setting.tarcking_frequency.unit = e.target.value;
      })
    );
  }
  function handlClearButton() {
    setItems(
      produce(items, (draft) => {
        draft.results[index].setting = defaultItemsetting;
      })
    );
  }
  async function handlSaveButton() {
    const { desired_price, tarcking_frequency } =
      items.results[index].setting ?? defaultItemsetting;
    if (desired_price > 10000) {
      // toast error (price too long)
      toast.error("Price too long");
      console.log(items.results[index].setting);
      return;
    }
    if (tarcking_frequency.unit === "Hours" && tarcking_frequency.amount > 24) {
      // toast error (limit hours exceeded)
      toast.error("limit hours exceeded");
      return;
    }
    if (tarcking_frequency.unit === "Days" && tarcking_frequency.amount > 31) {
      // toast error (limit Days exceeded)
      toast.error("limit days exceeded");
      return;
    }
    if (
      JSON.stringify(items.results[index].setting) ===
        JSON.stringify(defaultItemsetting) ||
      !items.results[index].setting
    ) {
      /// send null to backend
      console.log("setting equal...");
      toast.success("Saved");
      return;
    }
    // send setting to backend
    // postItemSettings(items);
    console.log("id of item", items.results[index].id, items.results[index].setting);
    const res = await putItemSettings(items.results[index].setting, items.results[index].id);
    console.log("response of item", res);
    toast.success("Saved");
    console.log("test", desired_price, tarcking_frequency);
    console.log("setting", items.results[index].setting);
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Toaster position="top-center" richColors />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="subtitle1" color={"#7D7D7D"}>
          Notify when price is {index}
        </Typography>
        <OutlinedInput
          // autoFocus
          id="price-change"
          value={
            !items.results[index].setting
              ? 0
              : items.results[index].setting.desired_price
          }
          sx={{
            bgcolor: "#F5F6FA",
            borderRadius: 1,
            height: 30,
            maxWidth: 60,
            marginRight: 1,
            "& .MuiOutlinedInput-input": {
              padding: "10px",
              color: "#898CA4",
            },
          }}
          onChange={handlPriceChange}
        />
        <AntSwitch
          id={items.results[index].id.toString()}
          checked={
            !items.results[index].setting
              ? false
              : items.results[index].setting.is_desired_price
          }
          onChange={handlPriceSwitch}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="subtitle1" color={"#7D7D7D"}>
          Notify about stock availability
        </Typography>
        <AntSwitch
          id={index.toString()}
          checked={
            !items.results[index].setting
              ? false
              : items.results[index].setting.stock_availability
          }
          onChange={handlStockSwitch}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="subtitle1" color={"#7D7D7D"}>
          Fetch data every
        </Typography>
        <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
          <OutlinedInput
            id="numm"
            value={
              !items.results[index].setting
                ? 0
                : items.results[index].setting.tarcking_frequency.amount
            }
            sx={{
              bgcolor: "#F5F6FA",
              borderRadius: 1,
              height: 30,
              maxWidth: 60,
              marginRight: 1,
              "& .MuiOutlinedInput-input": {
                padding: "10px",
                color: "#898CA4",
              },
            }}
            onChange={handlTrackedNum}
          />
          <FormControl>
            <Select
              value={
                !items.results[index].setting
                  ? "Hours"
                  : items.results[index].setting.tarcking_frequency.unit
              }
              id="unitt"
              sx={{ height: 30 }}
              onChange={handlTrackedUnit}
            >
              <MenuItem value={"Hours"}>Hour</MenuItem>
              <MenuItem value={"Days"}>Day</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={handlClearButton}
          disabled={!items.results[index].status}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={handlSaveButton}
          disabled={!items.results[index].status}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

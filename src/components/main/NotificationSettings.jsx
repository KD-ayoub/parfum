import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import AntSwitch from "../../utils/main/AntSwitch";
import NotificationEmails from "./NotificationEmails";
import { produce } from "immer";
import { useAtom } from 'jotai';
import { settingData } from "../../pages/main/index";

export default function NotificationSettings() {
    const [exampleSettings, setExampleSettings] = useAtom(settingData);
  function handlStockToOut(e) {
    console.log(
      "befor stock....",
      e.target.checked,
      exampleSettings.settings.stock.stock_to_out
    );
    setExampleSettings(produce(exampleSettings, (draft) => {
        draft.settings.stock.stock_to_out = e.target.checked;
    }))
  }
  function handlOutToIn(e) {
    console.log(
      "out/in",
      e.target.checked,
    );
    setExampleSettings(produce(exampleSettings, (draft) => {
        draft.settings.stock.out_to_in = e.target.checked;
    }))
  }
  function handlPriceUnit(e) {
    setExampleSettings(produce(exampleSettings, (draft) => {
        draft.settings.price_change.unit = e.target.value;
    }))
  }
  function handlAmount(e) {
    // validate the number
    const parsed = parseInt(e.target.value);
    console.log("amount num", e.target.value, parsed);
    setExampleSettings(produce(exampleSettings, (draft) => {
        draft.settings.price_change.amount = isNaN(parsed) ? 0 : parsed;
    }))
    console.log(e.target.value);
  }
  return (
    <Box>
      <Typography variant="h5" marginBottom={4} fontWeight={600}>
        Notification Settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: 1,
          margin: 2,
        }}
      >
        <Typography variant="body1">Notification stock/out-of-stock</Typography>
        <AntSwitch
          id="stock-out"
          checked={exampleSettings.settings.stock.stock_to_out}
          onChange={handlStockToOut}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: 1,
          margin: 2,
        }}
      >
        <Typography variant="body1">
          Notification out-of-stock/instock
        </Typography>
        <AntSwitch
          id="out-instock"
          checked={exampleSettings.settings.stock.out_to_in}
          onChange={handlOutToIn}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: 1,
          margin: 2,
        }}
      >
        <Typography variant="body1">Notification for a price change</Typography>
        <FormControl sx={{ flexDirection: "row" }}>
          <OutlinedInput
            id="amount"
            value={exampleSettings.settings.price_change.amount}
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              height: 30,
              maxWidth: 70,
              marginRight: 1,
            }}
            onChange={handlAmount}
          />
          <FormControl>
            <Select
              value={exampleSettings.settings.price_change.unit}
              id="category"
              sx={{ height: 30 }}
              onChange={handlPriceUnit}
            >
              <MenuItem value={"$"}>$</MenuItem>
              <MenuItem value={"%"}>%</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 4,
          padding: 1,
          margin: 2,
        }}
      >
        <NotificationEmails />
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import AntSwitch from "../../utils/main/AntSwitch";
import { produce } from 'immer';
import { useAtom } from 'jotai';
import { settingData } from "../../pages/main/index";

export default function DateSettings() {

  const [settingsData, setSettingsData] = useAtom(settingData);
  function handlTracked(e) {
    setSettingsData(produce(settingsData, (draft) => {
      draft.settings.frequency.tracked.unit = e.target.value;
    }))
  }
  function handlNonTracked(e) {
    setSettingsData(produce(settingsData, (draft) => {
      draft.settings.frequency.untracked.unit = e.target.value;
    }))
  }
  function handlTrackedNum(e) {
    console.log("tracked num", e.target.value);
    const parsed = parseInt(e.target.value);
    setSettingsData(produce(settingsData, (draft) => {
      draft.settings.frequency.tracked.amount = isNaN(parsed) ? 0 : parsed;
    }))
  }
  function handlNonTrackedNum(e) {
    console.log("tracked num", e.target.value);
    const parsed = parseInt(e.target.value);
    setSettingsData(produce(settingsData, (draft) => {
      draft.settings.frequency.untracked = isNaN(parsed) ? 0 : parsed;
    }))
  }
  return (
    <Box>
      <Typography variant="h5" marginBottom={4} fontWeight={600}>
        Date Retrieval
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 8.4, padding: 1 }}>
        <Typography variant="body1">Tracked items</Typography>
        <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
          <OutlinedInput
            id="tracked-num"
            value={settingsData.settings.frequency.tracked.amount}
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              height: 30,
              maxWidth: 70,
              marginRight: 1,
            }}
            onChange={handlTrackedNum}
          />
          <Typography variant="body1" marginRight={1}>
            items per
          </Typography>
          <FormControl>
            <Select
              value={settingsData.settings.frequency.tracked.unit}
              id="tracked-unit"
              sx={{ height: 30 }}
              onChange={handlTracked}
            >
              <MenuItem value={"Hours"}>Hour</MenuItem>
              <MenuItem value={"Days"}>Day</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, padding: 1 }}>
        <Typography variant="body1">Non Tracked items</Typography>
        <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
          <OutlinedInput
            id="untracked-num"
            value={settingsData.settings.frequency.untracked.amount}
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              height: 30,
              maxWidth: 70,
              marginRight: 1,
            }}
            onChange={handlNonTrackedNum}
          />
          <Typography variant="body1" marginRight={1}>
            items per
          </Typography>
          <FormControl>
            <Select
              value={settingsData.settings.frequency.untracked.unit}
              id="untracked-unit"
              sx={{ height: 30 }}
              onChange={handlNonTracked}
            >
              <MenuItem value={"Hours"}>Hour</MenuItem>
              <MenuItem value={"Days"}>Day</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
      </Box>
    </Box>
  );
}

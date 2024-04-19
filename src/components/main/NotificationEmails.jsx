import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { produce } from "immer";
import { useAtom } from 'jotai';
import settingData from "../../pages/main/index";

export default function NotificationEmails() {

  const [exampleSettings, setExampleSettings] = useAtom(settingData);
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  function handlAddButton(e) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.key === "Enter" || e.type === "submit") {
      e.preventDefault();
      const isValid = emailRegex.test(emailInput);
      if (isValid) {
        let updated = [...emails];
        updated.push(emailInput);
        setEmails(updated);
        setExampleSettings(produce(exampleSettings, (draft) => {
          draft.settings.emails = updated;
        }))
        setEmailInput("");
      }
    }
  }

  function handlEmailInput(e) {
    console.log(e.target.value);
      setEmailInput(e.target.value);
  }

  function handlEmailClick(index) {
    const updated = [...emails];
    updated.splice(index, 1);
    setEmails(updated);
    setExampleSettings(produce(exampleSettings, (draft) => {
      draft.settings.emails = updated;
    }))
  }
  return (
    <>
      <Box
        component={"form"}
        onSubmit={handlAddButton}
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <Typography>Notification Emails</Typography>
          <FormControl variant="outlined">
            <OutlinedInput
              id="email"
              type="email"
              required
              placeholder="Email adress"
              value={emailInput}
              onChange={handlEmailInput}
              onKeyDown={handlAddButton}
              sx={{ maxHeight: 40 }}
            />
          </FormControl>
        <Button variant="outlined" type="submit">
          Add
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: 500,
          border: "1px solid #1976d2",
          borderRadius: 1,
          height: 120,
          overflowY: "auto",
          padding: 2,
        }}
      >
        {emails.map((value, index) => {
          return (
            <Typography
              key={index}
              variant={"body1"}
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: 20,
                bgcolor: "#DBE9FF",
                width: "fit-content",
                padding: 1,
                margin: 1,
                height: "fit-content",
                color: "#0958D9",
              }}
            >
              {value}
              <Box
                component={"span"}
                sx={{ display: "flex", alignItems: "center" }}
                onClick={() => handlEmailClick(index)}
              >
                <CloseIcon sx={{ width: 20, height: 20 }} />
              </Box>
            </Typography>
          );
        })}
      </Box>
    </>
  );
}

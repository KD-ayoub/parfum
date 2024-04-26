import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typograohy from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FullScreen from "../../components/main/FullScreen";
import Logo from "../../components/main/Logo";
import NotificationSettings from "../../components/main/NotificationSettings";
import DateSettings from "../../components/main/DateSettings";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getSettings from "../../api/getSettings";
import postSettings from "../../api/postSettings";
import { atom, useAtom } from "jotai";
import { settingData } from "./index";
import { Toaster, toast } from "sonner";

export default function Settings() {
  const [settingsData, setSettingsData] = useAtom(settingData);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settingsData"],
    queryFn: async () => {
      const data = await getSettings();
      console.log("hereererere", data);
      if (JSON.stringify(data) !== "{}") {
        setSettingsData(data);
      }
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newData) => {
      console.log("mutation: ");
      return await postSettings(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settingsData"],
      });
      toast.success("Saved");
    },
  });

  if (query.isLoading) {
    return <div>Loading....</div>;
  }

  async function handlsubmit(data) {
    console.log("query data", query.data);
    console.log("settings data", data);
    console.log(
      "diffrence: ",
      JSON.stringify(data) !== JSON.stringify(query.data)
    );
    if (JSON.stringify(data) !== JSON.stringify(query.data)) {
      mutation.mutate(data);
    }
  }

  console.log("get output here", settingsData);
  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toaster position="top-center" richColors />
        <Container sx={{ backgroundColor: "white" }} maxWidth={"2000px"}>
          <Toolbar disableGutters>
            <Logo />
            <FullScreen />
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component={"main"}
        sx={{
          height: "calc(100vh - 64px)",
          bgcolor: "#F3F6FA",
          overflowY: "auto",
          padding: 4,
        }}
      >
        <Typograohy variant="h3" margin={4}>
          Settings
        </Typograohy>
        <Grid
          container
          sx={{
            justifyContent: "space-around",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Grid
            item
            xs={10}
            padding={3}
            sx={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              bgcolor: "white",
              borderRadius: "15px",
            }}
          >
            <NotificationSettings />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <DateSettings />
              <Button
                sx={{ maxWidth: 150, alignSelf: "flex-end" }}
                variant="contained"
                onClick={() => {
                  console.log("data here: ", JSON.stringify(settingsData));
                  handlsubmit(settingsData);
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

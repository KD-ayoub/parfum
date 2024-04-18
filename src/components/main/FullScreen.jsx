import React, { useCallback, useState } from "react";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import IconButton from "@mui/material/IconButton";

export default function FullScreen() {
  const [fullScreen, setFullScreen] = useState(false);

  const handlFullScreen = useCallback(() => {
    if (!fullScreen) {
      document.body.requestFullscreen();
      setFullScreen((previous) => !previous);
      return;
    }
    setFullScreen((previous) => !previous);
    document.exitFullscreen();
  }, [fullScreen]);

  return (
    <IconButton onClick={handlFullScreen}>
      {!fullScreen ? (
        <FullscreenOutlinedIcon />
      ) : (
        <FullscreenExitOutlinedIcon />
      )}
    </IconButton>
  );
}

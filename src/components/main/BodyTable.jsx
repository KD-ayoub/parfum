import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import LinkPng from "../../assets/Images/linkPng.png";
import AntSwitch from "../../utils/main/AntSwitch";
import ItemSettings from "../../components/main/ItemSettings";
import { useAtom } from "jotai";
import { itemsData, showItemSettings } from "../../pages/main/index";
import moment from "moment";
import { Link } from "react-router-dom";
import { produce } from "immer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import getItemStatus from "../../api/getItemStatus";
import { intialqueryParams } from "../../pages/main/index";

export default function BodyTable() {
  const [items, setItems] = useAtom(itemsData);
  const [showItemSetting, setShowItemSetting] = useAtom(showItemSettings);
  const [queryParams, setQueryParams] = useAtom(intialqueryParams)
  async function handlTrackedSwitch(e, index) {
    setItems(
      produce(items, (draft) => {
        draft.results[index].status = e.target.checked;
      })
    );
    const data = await getItemStatus(items.results[index].id);
    setItems(
      produce(items, (draft) => {
        draft.results[index].status = data.item.status;
      })
    );
    setQueryParams(produce(queryParams, (draft) => {
        draft.page = '1';
    }))
    console.log("post data", index, data);
  }
  return (
    <TableBody>
      {items.results.map((value, index) => {
        return (
          <Fragment key={index}>
            <tr key={index} style={{ backgroundColor: "white" }}>
              <TableCell
                sx={{ maxWidth: "120px" }}
                component={"td"}
                align="left"
              >
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      console.log("aarr", showItemSetting);
                      console.log("aarrrrrr", items);
                      setShowItemSetting((prev) =>
                        prev.map((val, idx) => (idx === index ? !val : val))
                      );
                    }}
                  >
                    {showItemSetting[index] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                  <img
                    width={90}
                    height={85}
                    src={value.url_image_product}
                    alt="picture"
                  />
                </Box>
              </TableCell>
              <TableCell
                sx={{ maxWidth: "220px" }}
                component={"td"}
                align="center"
              >
                <Typography
                  component={"p"}
                  variant="subtitle1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={value.title}
                >
                  {value.title}
                </Typography>
              </TableCell>
              <TableCell width={110} component={"td"} align="center">
                <Typography
                  sx={{
                    height: 30,
                    width: 110,
                    bgcolor: value.available ? "#DDF1DD" : "#FFCCCC",
                    borderRadius: "20px",
                  }}
                  variant="subtitle1"
                  color={value.available ? "#42AF43" : "#FF0000"}
                >
                  {value.available ? "In Stock" : "Out of Stock"}
                </Typography>
              </TableCell>
              <TableCell component={"td"} align="center">
                <Typography variant="subtitle1">
                  {value.supplier.name}
                </Typography>
              </TableCell>
              <TableCell component={"td"} align="center">
                <Typography variant="subtitle1">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  }).format(value.price / 100)}
                </Typography>
              </TableCell>
              <TableCell component={"td"} align="center">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <AntSwitch
                    id={value.id.toString()}
                    checked={value.status}
                    onChange={(e) => handlTrackedSwitch(e, index)}
                  />
                </Box>
              </TableCell>
              <TableCell component={"td"} align="center">
                <Typography variant="subtitle1">
                  {moment(value.last_fetched).fromNow()}
                </Typography>
              </TableCell>
              <TableCell component={"td"} align="center">
                <Typography variant="subtitle1">
                  {moment(value.updated_at).fromNow()}
                </Typography>
              </TableCell>
              <TableCell component={"td"} align="center">
                <Link to={value.url_site_product} target="_blank">
                  <img src={LinkPng} alt="link png" />
                </Link>
              </TableCell>
            </tr>
            {showItemSetting[index] && (
              <>
                <tr>
                  <td>
                    <Typography variant="h6" marginLeft={2}>
                      Item Settings:
                    </Typography>
                  </td>
                </tr>
                <tr key={value.id} style={{ backgroundColor: "white" }}>
                  <TableCell
                    component={"td"}
                    sx={{
                      ":first-of-type": {
                        borderRadius: "18px",
                      },
                    }}
                    colSpan={9}
                  >
                    <ItemSettings index={index} />
                  </TableCell>
                </tr>
              </>
            )}
          </Fragment>
        );
      })}
    </TableBody>
  );
}

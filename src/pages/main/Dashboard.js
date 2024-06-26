import React, { Fragment, useDeferredValue, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import FullScreen from "../../components/main/FullScreen";
import SearchBar from "../../components/main/SearchBar";
import Logo from "../../components/main/Logo";
import FilterSelect from "../../components/styledComponents/FilterSelect";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useAtom } from "jotai";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemsData, showItemSettings, intialqueryParams } from "./index";
import getItems from "../../api/getItems";
import { produce } from "immer";
import BodyTable from "../../components/main/BodyTable";
import { debounce } from "lodash";
import CustomSelect from "../../components/main/Filters/CustomSelect";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useDebounce from "../../components/hooks/useDebounce";

const head = [
  "Image",
  "Name",
  "Stock",
  "Vendor",
  "Price",
  "Tracked",
  "Last Fetch",
  "Last Update",
  "Link",
];

export default function Dashboard() {
  const [items, setItems] = useAtom(itemsData);
  const [showItemSetting, setShowItemSetting] = useAtom(showItemSettings);
  const [searchValue, setSearchValue] = useState("");
  const [queryParams, setQueryParams] = useAtom(intialqueryParams);
  const debouncedValue = useDebounce(queryParams, 300);
  const [searchParams, setSearchParams] = useSearchParams();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["itemsData", debouncedValue],
    queryFn: async () => {
      const data = await getItems(queryParams, authHeader);
      console.log("hererereer", data);
      setItems(data);
      setShowItemSetting(new Array(data.results.length).fill(false));
      setSearchParams(queryParams);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (queryParam) => {
      console.log("mutation..", queryParam);
      setQueryParams(
        produce(queryParams, (draft) => {
          draft.page = queryParam.page;
          draft.search = queryParam.search;
          draft.status = queryParam.status;
          draft.pageSize = queryParam.pageSize;
          draft.ordering = queryParam.ordering;
        })
      );
      return queryParam;
    },
    onSuccess: async (data) => {
      // queryClient.setQueryData(["itemsData"]);
      await queryClient.invalidateQueries({
        queryKey: ["itemsData"],
      });

      document.getElementById("main").scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  });
  // if (query.isLoading) {
  //   return <div>Loading.....</div>;
  // }

  function handlPagination(e, p) {
    setSearchParams(produce(queryParams, (draft) => {
      draft.page = p.toString();
    }));
    mutation.mutate(
      produce(queryParams, (draft) => {
        draft.page = p.toString();
      })
    );
    console.log("hhhhhh", p);

    console.log("did", p);
  }
  function handleTracking(option) {
    console.log("option tracking", option);
    let status = null;
    if (option === "Tracked") {
      status = true;
    } else if (option === "Untracked") {
      status = false;
    }
    setSearchParams(produce(queryParams, (draft) => {
      draft.status = status;
    }));
    mutation.mutate(
      produce(queryParams, (draft) => {
        draft.status = status;
        draft.page = "1";
      })
    );
  }
  function handlPageSize(option) {
    console.log("pagesize option", parseInt(option), queryParams.page);
    setSearchParams(produce(queryParams, (draft) => {
      draft.pageSize = parseInt(option);
    }));
    mutation.mutate(
      produce(queryParams, (draft) => {
        draft.pageSize = parseInt(option);
        draft.page = '1';
      })
    );
  }
  async function handlSearch(value) {
    console.log("Search value: ", value);
    setSearchValue(value);
    setQueryParams(
      produce(queryParams, (draft) => {
        draft.search = value;
      })
    );
    console.log("finished.....", queryParams.search);
    console.log("finished.2....", debouncedValue);
    setSearchParams(produce(queryParams, (draft) => {
      draft.search = value;
    }));
    // await mutation.mutateAsync(
    //   produce(queryParams, (draft) => {
    //     draft.search = value;
    //   })
    // );
  }
  function handlePrice(e) {
    let ordering = "";
    if (e === "Ascending") {
      ordering = "price";
    } else if (e === "Descending") {
      ordering = "-price";
    }
    setSearchParams(produce(queryParams, (draft) => {
      draft.ordering = ordering;
    }));
    mutation.mutate(
      produce(queryParams, (draft) => {
        draft.ordering = ordering;
      })
    );
    console.log("price", e);
  }
  function handleLastFetch(e) {
    let ordering = "";
    if (e === "Ascending") {
      ordering = "-last_fetched";
    } else if (e === "Descending") {
      ordering = "last_fetched";
    }
    setSearchParams(produce(queryParams, (draft) => {
      draft.ordering = ordering;
    }));
    mutation.mutate(
      produce(queryParams, (draft) => {
        draft.ordering = ordering;
      })
    );
    console.log("price", e);
  }
  function handleUpdatedAt(e) {
    let ordering = "";
    if (e === "Ascending") {
      ordering = "updated_at";
    } else if (e === "Descending") {
      ordering = "-updated_at";
    }
    setSearchParams(produce(queryParams, (draft) => {
      draft.ordering = ordering;
    }));
    mutation.mutate(
      produce(queryParams, (draft) => {
        draft.ordering = ordering;
      })
    );
    console.log("price", e);
  }
  return (
    <>
      <AppBar position="static" elevation={1}>
        <Container sx={{ backgroundColor: "white" }} maxWidth={"2000px"}>
          <Toolbar disableGutters>
            <Logo />
            <SearchBar searchValue={searchValue} onChange={handlSearch} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                flexGrow: 1,
                gap: 2,
              }}
            >
              <FullScreen />
              <IconButton
                onClick={() => {
                  navigate("/settings");
                }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  signOut();
                  navigate("/auth/login");
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        id="main"
        component={"main"}
        sx={{
          height: "calc(100vh - 64px)",
          bgcolor: "#F3F6FA",
          overflowY: "auto",
          padding: 4,
        }}
      >
        <Box sx={{ bgcolor: "white", borderRadius: 2, margin: 2, padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <CustomSelect
              options={["All", "Tracked", "Untracked"]}
              onChange={handleTracking}
            />
            <CustomSelect
              options={["Price", "Ascending", "Descending"]}
              onChange={handlePrice}
            />
            <CustomSelect
              options={["Last Fetch", "Ascending", "Descending"]}
              onChange={handleLastFetch}
            />
            <CustomSelect
              options={["Last update", "Ascending", "Descending"]}
              onChange={handleUpdatedAt}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="body1" color={"#898CA4"}>
                Items shown
              </Typography>
              <FilterSelect
                options={["25", "50", "100"]}
                onChange={handlPageSize}
              />
            </Box>
          </Box>
        </Box>
        {!query.isLoading && (
          <Box sx={{ margin: 2 }}>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ bgcolor: "#f5f6fa" }}
            >
              <Table
                sx={{
                  minWidth: 1200,
                  borderCollapse: "separate",
                  borderSpacing: "0 18px",
                  borderRadius: "15px",
                }}
              >
                <TableHead>
                  <tr style={{ border: "hidden" }}>
                    {head.map((value, index) => {
                      return (
                        <TableCell component={"th"} align="center" key={index}>
                          <Typography variant="h6">{value}</Typography>
                        </TableCell>
                      );
                    })}
                  </tr>
                </TableHead>
                <BodyTable />
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(items.count / queryParams.pageSize)}
                page={parseInt(queryParams.page)}
                size="large"
                shape="rounded"
                variant="outlined"
                onChange={handlPagination}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

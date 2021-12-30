import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Column } from "../types/Column";
import "./ColumnList.css";
import { v4 as uuidv4 } from "uuid";
import { QueryArea } from "../QueryArea/QueryArea";

export const ColumnList = () => {
  const [columnList, setColumnList] = useState<Column[]>([]);
  const [columnName, setColumnName] = useState<string>("");
  const [columnType, setColumnType] = useState<string>("");

  const cantIgnoreCaseList = ["(Is)Null", "(Is)NotNull"];

  const isIgnoreCaseDisabled = (entry: Column) => {
    if (entry.type !== "String") {
      return true;
    }
    return cantIgnoreCaseList.includes(entry.query);
  };

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setColumnName(e.target.value as string);
  };

  const handleTypeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setColumnType(e.target.value);
  };

  const handleIgnoreCaseChange = (columnToEdit: Column) => {
    const columnListCopy = [...columnList];
    const index = columnListCopy.findIndex((obj) => obj.id === columnToEdit.id);
    columnListCopy[index].ignoreCase = !columnToEdit.ignoreCase;

    setColumnList(columnListCopy);
  };

  const handleAndOrChange = (columnToEdit: Column) => {
    const columnListCopy = [...columnList];
    const index = columnListCopy.findIndex((obj) => obj.id === columnToEdit.id);
    columnListCopy[index].andOr = columnToEdit.andOr === "And" ? "Or" : "And";

    setColumnList(columnListCopy);
  };

  const handleQueryTypeChange = (
    columnToEdit: Column,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const columnListCopy = [...columnList];
    const index = columnListCopy.findIndex((obj) => obj.id === columnToEdit.id);
    columnListCopy[index].query = e.target.value;
    if (cantIgnoreCaseList.includes(columnListCopy[index].query)) {
      columnListCopy[index].ignoreCase = false;
    }

    setColumnList(columnListCopy);
  };

  const addColumn = () => {
    if (columnName === "" || columnType === "") {
      return;
    }
    const newColumn: Column = {
      id: uuidv4(),
      name: columnName,
      type: columnType,
      query: "",
      ignoreCase: columnType === "String" ? true : false,
      andOr: columnList.length === 0 ? "" : "And",
    };
    setColumnList([...columnList, newColumn]);
    setColumnName("");
    setColumnType("");
  };

  const typeLabel = (typeName: string) => {
    if (typeName === "String") {
      return "VarChar";
    }
    return typeName;
  };

  const isMobile = () => {
    return !useMediaQuery("(min-width:600px)");
  };

  const getMenuItems = (type: string) => {
    switch (type) {
      case "String":
        return [
          <MenuItem key={1} value="Is">
            Is / Equals
          </MenuItem>,
          <MenuItem key={2} value="Not">
            Is Not
          </MenuItem>,
          <MenuItem key={3} value="(Is)Null">
            Is Null
          </MenuItem>,
          <MenuItem key={4} value="(Is)NotNull">
            Is Not Null
          </MenuItem>,
          <MenuItem key={5} value="Like">
            Is Like
          </MenuItem>,
          <MenuItem key={6} value="NotLike">
            Is Not Like
          </MenuItem>,
          <MenuItem key={7} value="StartingWith">
            Starts With
          </MenuItem>,
          <MenuItem key={8} value="EndingWith">
            Ends With
          </MenuItem>,
          <MenuItem key={9} value="Containing">
            Contains
          </MenuItem>,
        ];
      case "Boolean":
        return [
          <MenuItem key={1} value="(Is)Null">
            Is Null
          </MenuItem>,
          <MenuItem key={2} value="(Is)NotNull">
            Is Not Null
          </MenuItem>,
          <MenuItem key={3} value="True()">
            Is True
          </MenuItem>,
          <MenuItem key={4} value="False()">
            Is False
          </MenuItem>,
        ];
      case "Integer":
        return [
          <MenuItem key={1} value="Is">
            Is / Equals
          </MenuItem>,
          <MenuItem key={2} value="(Is)Null">
            Is Null
          </MenuItem>,
          <MenuItem key={3} value="(Is)NotNull">
            Is Not Null
          </MenuItem>,
          <MenuItem key={4} value="LessThan">
            Is Less Than
          </MenuItem>,
          <MenuItem key={5} value="LessThanEqual">
            Is Less Than or Equal to
          </MenuItem>,
          <MenuItem key={6} value="GreaterThan">
            Is Greater Than
          </MenuItem>,
          <MenuItem key={7} value="GreaterThanEqual">
            Is Greater Than or Equal to
          </MenuItem>,
        ];
      case "Date":
        return [
          <MenuItem key={1} value="Is">
            Is / Equals
          </MenuItem>,
          <MenuItem key={2} value="(Is)Null">
            Is Null
          </MenuItem>,
          <MenuItem key={3} value="(Is)NotNull">
            Is Not Null
          </MenuItem>,
          <MenuItem key={4} value="After">
            Is After
          </MenuItem>,
          <MenuItem key={5} value="Before">
            Is Before
          </MenuItem>,
          <MenuItem key={6} value="Between">
            Is Between
          </MenuItem>,
        ];
      case "Collection":
        return [
          <MenuItem key={1} value="In">
            Is In
          </MenuItem>,
          <MenuItem key={2} value="NotIn">
            Is Not In
          </MenuItem>,
        ];
    }
  };

  return (
    <div>
      <FormControl
        className="column-list-form-control"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: () => (isMobile() ? "column" : "row"),
        }}
      >
        <TextField
          label="Additional Field Name"
          variant="outlined"
          value={columnName}
          onChange={(e) => handleNameChange(e)}
          size={isMobile() ? "small" : "medium"}
          sx={{
            width: 235,
          }}
        />
        <TextField
          select
          label="Query Data Type"
          value={columnType}
          onChange={handleTypeChange}
          size={isMobile() ? "small" : "medium"}
          sx={{
            margin: () => (isMobile() ? "5px 0" : "0 20px"),
            width: 235,
          }}
        >
          <MenuItem value="Integer">Integer</MenuItem>
          <MenuItem value="String">VarChar</MenuItem>
          <MenuItem value="Date">Date</MenuItem>
          <MenuItem value="Boolean">Boolean</MenuItem>
          <MenuItem value="Collection">Collection</MenuItem>
        </TextField>
        <Button
          variant="contained"
          onClick={addColumn}
          sx={{
            width: 123,
          }}
        >
          Add To List
        </Button>
      </FormControl>
      <div className="column-list-list-holder">
        {columnList.map((entry, index) => (
          <div key={entry.id} className="column-list-list-row">
            {index > 0 ? (
              <>
                <Typography>Or</Typography>
                <Switch
                  checked={entry.andOr === "And"}
                  onChange={() => handleAndOrChange(entry)}
                />
                <Typography>And</Typography>
              </>
            ) : (
              <div className="column-list-spacer" />
            )}
            <div className="column-list-name">{entry.name}</div>
            <div className="column-list-type">{typeLabel(entry.type)}</div>
            <TextField
              key={`${entry.id}-textfield`}
              select
              label="Query Type"
              value={entry.query}
              onChange={(e) => handleQueryTypeChange(entry, e)}
              sx={{
                width: 300,
              }}
            >
              {getMenuItems(entry.type)}
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={entry.ignoreCase}
                  onChange={() => handleIgnoreCaseChange(entry)}
                  disabled={isIgnoreCaseDisabled(entry)}
                />
              }
              label="Ignore Case?"
              sx={{
                marginLeft: "0px",
              }}
            />
          </div>
        ))}
      </div>
      <QueryArea columnList={columnList} />
    </div>
  );
};

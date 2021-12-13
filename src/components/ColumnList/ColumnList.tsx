import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
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

  const getMenuItems = (type: string) => {
    switch (type) {
      case "String":
        return [
          <MenuItem value="Is">Is / Equals</MenuItem>,
          <MenuItem value="Not">Is Not</MenuItem>,
          <MenuItem value="(Is)Null">Is Null</MenuItem>,
          <MenuItem value="(Is)NotNull">Is Not Null</MenuItem>,
          <MenuItem value="Like">Is Like</MenuItem>,
          <MenuItem value="NotLike">Is Not Like</MenuItem>,
          <MenuItem value="StartingWith">Starts With</MenuItem>,
          <MenuItem value="EndingWith">Ends With</MenuItem>,
          <MenuItem value="Containing">Contains</MenuItem>,
        ];
      case "Boolean":
        return [
          <MenuItem value="(Is)Null">Is Null</MenuItem>,
          <MenuItem value="(Is)NotNull">Is Not Null</MenuItem>,
          <MenuItem value="True()">Is True</MenuItem>,
          <MenuItem value="False()">Is False</MenuItem>,
        ];
      case "Integer":
        return [
          <MenuItem value="Is">Is / Equals</MenuItem>,
          <MenuItem value="(Is)Null">Is Null</MenuItem>,
          <MenuItem value="(Is)NotNull">Is Not Null</MenuItem>,
          <MenuItem value="LessThan">Is Less Than</MenuItem>,
          <MenuItem value="LessThanEqual">Is Less Than or Equal to</MenuItem>,
          <MenuItem value="GreaterThan">Is Greater Than</MenuItem>,
          <MenuItem value="GreaterThanEqual">
            Is Greater Than or Equal to
          </MenuItem>,
        ];
      case "Date":
        return [
          <MenuItem value="Is">Is / Equals</MenuItem>,
          <MenuItem value="(Is)Null">Is Null</MenuItem>,
          <MenuItem value="(Is)NotNull">Is Not Null</MenuItem>,
          <MenuItem value="After">Is After</MenuItem>,
          <MenuItem value="Before">Is Before</MenuItem>,
          <MenuItem value="Between">Is Between</MenuItem>,
        ];
      case "Collection":
        return [
          <MenuItem value="In">Is In</MenuItem>,
          <MenuItem value="IsIn">Is Not In</MenuItem>,
        ];
    }
  };

  return (
    <div>
      <FormControl
        className="column-list-form-control"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <TextField
          label="Additional Column Name"
          variant="outlined"
          value={columnName}
          onChange={(e) => handleNameChange(e)}
        />
        <TextField
          select
          label="Query Data Type"
          value={columnType}
          onChange={handleTypeChange}
          sx={{
            width: 300,
            margin: "0 20px",
          }}
        >
          <MenuItem value="Integer">Integer</MenuItem>
          <MenuItem value="String">VarChar</MenuItem>
          <MenuItem value="Date">Date</MenuItem>
          <MenuItem value="Boolean">Boolean</MenuItem>
          <MenuItem value="Collection">Collection</MenuItem>
        </TextField>
        <Button variant="contained" onClick={addColumn}>
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

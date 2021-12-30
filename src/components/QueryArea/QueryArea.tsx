import { Button } from "@mui/material";
import { Column } from "../types/Column";
import "./QueryArea.css";

interface QueryAreaProps {
  columnList: Column[];
}

export const QueryArea = (props: QueryAreaProps) => {
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const queryBuilder = () => {
    if (props.columnList.length === 0) {
      return "Add at least query for the function name to be displayed.";
    }
    let queryString = "findBy";

    for (const entry of props.columnList) {
      if (entry.query === "") {
        continue;
      }
      queryString += entry.andOr;
      queryString += capitalizeFirstLetter(entry.name);
      queryString += entry.query;
      if (entry.ignoreCase) {
        queryString += "IgnoreCase";
      }
    }

    queryString += "(";
    for (const entry of props.columnList) {
      if (entry.query === "") {
        continue;
      }
      const index = props.columnList.indexOf(entry);
      if (index > 0) {
        queryString += ", ";
      }
      if (entry.query === "Between") {
        queryString += entry.type;
        queryString += " start";
        queryString += capitalizeFirstLetter(entry.name);
        queryString += ", ";
        queryString += entry.type;
        queryString += " end";
        queryString += capitalizeFirstLetter(entry.name);
        continue;
      }
      queryString += entry.type;
      if (entry.type === "Collection") {
        queryString += "<" + entry.name + ">";
      }

      queryString += " ";
      queryString += entry.name;
    }
    queryString += ")";
    return queryString;
  };

  const clickCopy = () => {
    navigator.clipboard.writeText(queryBuilder());
  };

  return (
    <div className="query-area-holder">
      <div className="query-area" data-testid="query-area">
        {queryBuilder()}
      </div>
      <Button
        variant="contained"
        onClick={clickCopy}
        sx={{
          width: 200,
          marginTop: "10px",
        }}
      >
        Copy To CLipboard
      </Button>
    </div>
  );
};

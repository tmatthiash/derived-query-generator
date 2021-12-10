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
      const index = props.columnList.indexOf(entry);
      if (index > 0) {
        queryString += " ";
      }
      if (entry.query === "Between") {
        queryString += entry.type;
        queryString += " start";
        queryString += capitalizeFirstLetter(entry.name);
        queryString += " ";
        queryString += entry.type;
        queryString += " end";
        queryString += capitalizeFirstLetter(entry.name);
        continue;
      }
      queryString += entry.type;
      queryString += " ";
      queryString += entry.name;
    }
    queryString += ")";
    return queryString;
  };

  return (
    <div className="query-area-holder">
      <div className="query-area">{queryBuilder()}</div>
    </div>
  );
};

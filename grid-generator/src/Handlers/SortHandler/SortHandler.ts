import * as GridElementAttributes from "@rayflmc/flmc-lite-renderer/build/form/elements/grid/GridElementAttributes";
import { map } from "rxjs/operators";
import { Schema } from "../../Models/Schema";
import { SortSchemaType } from "../../Models/Sort";
import { Handler } from "../Handlers";

export const sortHandler: Handler = (_props, observables) => {
  const colDefinitionHandler = observables.columnDefinitions.pipe(
    map(([cols, schema]): [
      GridElementAttributes.ColumnDefinitions<any>,
      Schema
    ] => {
      const newCols = cols.map((col) => {
        const field = (col as any).fieldDefinition;

        const sorts = schema.sorts.filter(
          (sort) =>
            sort.fieldName == field.fieldName && sort.type == SortSchemaType.All
        );

        return {
          ...col,
          sorting: sorts.length > 0,
        };
      });
      return [newCols, schema];
    })
  );
  return {
    ...observables,
    columnDefinitions: colDefinitionHandler,
  };
};

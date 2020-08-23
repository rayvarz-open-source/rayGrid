import * as GridElementAttributes from "@rayflmc/flmc-lite-renderer/build/form/elements/grid/GridElementAttributes";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { FieldSchema, FieldSchemaTypeName } from "../../Models/Field";
import { Schema } from "../../Models/Schema";
import { Handler } from "../Handlers";
import InlineEditRowView from "./InlineEditRowView";

export const inlineEditHandler: Handler = (props, observables) => {
  if (props.options.inlineEditCallBack == null) return observables;
  const rowActionDefinitionObservable = observables.rowActionDefinitions.pipe(
    map((v) => {
      return {
        ...v,
        isEditable: (_data) => props.options.inlineEditCallBack != null,
        onRowUpdate:
          props.options.inlineEditCallBack == null
            ? undefined
            : async (oldData, newData) => {
                if (props.options.inlineEditCallBack == null)
                  throw new TypeError(
                    "options.inlineEditCallBack cannot be null"
                  );
                await props.options.inlineEditCallBack(oldData, newData);
                return;
              },
      };
    })
  );

  const onRowClick = new BehaviorSubject<GridElementAttributes.OnRowClick<any>>(
    (_event, data, _hd) => {
      if (props.elements.grid.tableRef == null) return;
      props.elements.grid.tableRef.dataManager.changeRowEditing(data, "update");
      props.elements.grid.tableRef.setState({
        ...props.elements.grid.tableRef.dataManager.getRenderState(),
        showAddRow: false,
      });
    }
  );

  const componentOverride = observables.componentsOverride.pipe(
    map((v) => {
      return {
        ...v,
        EditRow: InlineEditRowView,
      };
    })
  );

  const colDefinitionHandler = combineLatest(
    props.controllers.hideColumnModalHiddenFieldsController,
    observables.columnDefinitions
  ).pipe(
    map(([_hiddenFields, [cols, schema]]): [
      GridElementAttributes.ColumnDefinitions<any>,
      Schema
    ] => {
      const newCols = cols.map((col) => {
        const field: FieldSchema = (col as any).fieldDefinition;
        let isEditable: "always" | "never" = field.isEditable
          ? "always"
          : "never";
        if (
          ![
            FieldSchemaTypeName.List,
            FieldSchemaTypeName.LocalList,
            FieldSchemaTypeName.Bit,
            FieldSchemaTypeName.String,
            FieldSchemaTypeName.Int,
            FieldSchemaTypeName.Money,
          ].includes(field.type.name)
        )
          isEditable = "never";
        return {
          ...col,
          editable: isEditable,
        };
      });
      return [newCols, schema];
    })
  );

  return {
    ...observables,
    rowActionDefinitions: rowActionDefinitionObservable,
    onRowClick: onRowClick,
    componentsOverride: componentOverride,
    columnDefinitions: colDefinitionHandler,
  };
};

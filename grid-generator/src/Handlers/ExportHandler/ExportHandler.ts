import { GridElementAttributes } from '@flmc/grid-element';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldSchema, FieldSchemaTypeName } from '../../Models/Field';
import { Schema } from '../../Models/Schema';
import { Handler } from '../Handlers';

function isExportable(field: FieldSchema) {
  return (
    field.type.name != FieldSchemaTypeName.Image && field.type.name != FieldSchemaTypeName.ImageList && field.isVisible
  );
}

export const exportHandler: Handler = (props, observables) => {
  const optionsObservable = combineLatest(observables.gridOptions, props.options.noExport).pipe(
    map(([options, noExport]) => {
      return {
        ...options,
        exportButton: !noExport,
      };
    })
  );

  const colDefinitionHandler = observables.columnDefinitions.pipe(
    map(([cols, schema]): [GridElementAttributes.ColumnDefinitions<any>, Schema] => {
      const newCols = cols.map((col) => {
        const field = (col as any).fieldDefinition;
        return {
          ...col,
          export: isExportable(field),
        };
      });
      return [newCols, schema];
    })
  );
  return {
    ...observables,
    columnDefinitions: colDefinitionHandler,
    gridOptions: optionsObservable,
  };
};

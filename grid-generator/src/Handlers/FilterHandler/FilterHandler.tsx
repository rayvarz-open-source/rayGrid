import { GridElementAttributes } from '@flmc/grid-element';
import { Action } from 'material-table';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridGenerator } from '../../GridGenerator';
import { FieldSchema, FieldSchemaTypeName } from '../../Models/Field';
import { KeyValueModel } from '../../Models/KeyValueModel';
import { Localization } from '../../Models/Localization';
import { Schema } from '../../Models/Schema';
import { Handler } from '../Handlers';
import CustomFilterRowView from './FilterRowView';
export const filterHandler: Handler = (props, observables) => {
  const componentOverride = observables.componentsOverride.pipe(
    map((v) => {
      return {
        ...v,
        FilterRow: CustomFilterRowView,
      };
    })
  );

  let localizationSnapshot: Localization | undefined;
  props.options.localization.subscribe((v) => (localizationSnapshot = v));

  const colDefinitionHandler = observables.columnDefinitions.pipe(
    map(([cols, schema]): [GridElementAttributes.ColumnDefinitions<any>, Schema] => {
      const newCols = cols.map((col) => {
        const field: FieldSchema = (col as any).fieldDefinition;

        const filters = schema.filters.filter((filter) => filter.fieldName === field.fieldName);
        const defaultFilter = filters.find((v) => v.isDefault && v.fieldName === field.fieldName);
        let canFilter = filters.length > 0 && defaultFilter != null;
        if (field.type.name === FieldSchemaTypeName.List && props.options.listFilterDataSource == null)
          canFilter = false;
        return {
          ...col,
          field: field.fieldName,
          filter: defaultFilter,
          dataSource: props.options.listFilterDataSource,
          filterPlaceholder: filters.length > 0 ? filters[0].fieldName : ' ',
          filtering: canFilter,
          showListFilterModal: (onSelect: (model: KeyValueModel) => void) => {
            if (props.options.listFilterDataSource == null) return;
            const source = field.type.source ?? defaultFilter?.source;

            props.elements.listFilterModal.child(
              GridGenerator({
                dataSource: (options) => {
                  if (props.options.listFilterDataSource == null)
                    throw new TypeError('options.listFilterDataSource does not have value.');
                  return props.options.listFilterDataSource({
                    ...options,
                    url: source?.address ?? '',
                    filters: [...(options.filters ?? []), ...(source?.request.filters ?? [])],
                    sorts: [...(options.sorts ?? []), ...(source?.request.sorts ?? [])],
                  });
                },
                options: {
                  listFilterDataSource: props.options.listFilterDataSource,
                  localization: props.options.localization,
                },
                controllers: {
                  customActionsController: new BehaviorSubject<Action<any>[]>([
                    {
                      icon: 'check',
                      isFreeAction: false,
                      tooltip: localizationSnapshot?.select,
                      onClick: (_event, model) => {
                        if (source == null) throw new TypeError('source');
                        onSelect({ key: model[source.keyFieldName], value: model[source.valueFieldName] });
                        props.elements.listFilterModal.openContainer.next(false);
                      },
                    },
                  ]),
                },
              })
            );

            //
            props.elements.listFilterModal.openContainer.next(true);
          },
        };
      });
      return [newCols, schema];
    })
  );

  return {
    ...observables,
    componentsOverride: componentOverride,
    columnDefinitions: colDefinitionHandler,
  };
};

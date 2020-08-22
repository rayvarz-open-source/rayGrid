import { FieldSchemaTypeName } from '../../Models/Field';
import { Filter } from '../../Models/Filter';
import { Schema } from '../../Models/Schema';

export function isFilterChanged(oldFilters: Filter[], newFilters: Filter[]): boolean {
  if (oldFilters.length != newFilters.length) return true;
  for (const filter of newFilters) {
    if (
      oldFilters.filter((v) => v.fieldName === filter.fieldName && v.type === filter.type && v.value === filter.value)
        .length === 0
    )
      return true;
  }
  return false;
}

export function materialTableFilterToGridFilter(filters: any[], schema: Schema): Filter[] {
  return filters
    .filter((v) => v.value != null)
    .map(
      (filter): Filter => {
        const fieldName = filter.column.field;
        const field = schema.fields.find((field) => field.fieldName == fieldName);

        if (field == null) throw new TypeError(`Cannot find a field with field name of ${fieldName} in schema`);

        const filterDef = schema.filters.find((filter) => filter.isDefault && filter.fieldName === field.fieldName);

        if (filterDef == null)
          throw new TypeError(`Cannot find a default filter with field name of ${field.fieldName}`);

        let value: any = null;
        if (field.type.name == FieldSchemaTypeName.Int && !isNaN(filter.value)) value = parseInt(filter.value);
        else if (field.type.name == FieldSchemaTypeName.Bit) value = filter.value === 'checked';
        else value = filter.value;
        return {
          fieldName: filterDef.fieldName,
          type: filterDef.type,
          value: value,
        };
      }
    );
}

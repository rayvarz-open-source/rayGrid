/* eslint-disable no-unused-vars */
import JalaliUtils from '@date-io/jalaali';
import MomentUtils from '@date-io/moment';
import { FormControl, FormControlLabel, Icon, IconButton, InputAdornment, Tooltip } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import jMoment from 'moment-jalaali';
import * as React from 'react';
import { FieldSchema, FieldSchemaTypeName } from '../../Models/Field';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

type Props = {
  emptyCell: boolean;
  columns: any[];
  hasDetailPanel: boolean;
  isTreeData: boolean;
  onFilterChanged: (id: number, targetValue: any) => void;
  filterCellStyle: any;
  selection: boolean;
  actionsColumnIndex?: number;
  hasActions?: boolean;
  localization?: any;
};

type RemoteLookupFilterProps = {
  field: FieldSchema;
  columnDef: any;
  onFilterChanged: (id: number, targetValue: any) => void;
};

function RemoteLookupFilter({ columnDef, onFilterChanged }: RemoteLookupFilterProps) {
  const [value, setValue] = React.useState<any>('');

  return (
    <>
      <Tooltip title={columnDef.filter.filterName || ''}>
        <FormControl style={{ minWidth: 180 }}>
          <Input
            value={value}
            disabled
            endAdornment={
              value != '' ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setValue('');
                      onFilterChanged(columnDef.tableData.id, null);
                    }}
                  >
                    <Icon>close</Icon>
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  onClick={() => {
                    columnDef.showListFilterModal((model) => {
                      setValue(model.value);
                      onFilterChanged(columnDef.tableData.id, model.key);
                    });
                  }}
                >
                  <Icon>menu</Icon>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Tooltip>
    </>
  );
}

class CustomFilterRowView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderRemoteLookupFilter = (columnDef) => {
    const field: FieldSchema = columnDef.fieldDefinition;
    return <RemoteLookupFilter field={field} columnDef={columnDef} onFilterChanged={this.props.onFilterChanged} />;
  };

  renderLocalLookupFilter = (columnDef) => {
    const filter: FieldSchema = columnDef.fieldDefinition;
    const source = filter.type.source;
    const view = (
      <Tooltip title={columnDef.filter.filterName || ''}>
        <FormControl>
          <Select
            value={columnDef.tableData.filterValue == null ? '' : columnDef.tableData.filterValue}
            onChange={(event) => this.props.onFilterChanged(columnDef.tableData.id, event.target.value)}
            input={<Input />}
          >
            <MenuItem value={undefined}>
              <em>-</em>
            </MenuItem>
            {source?.values.map((v) => (
              <MenuItem key={v[source.keyFieldName]} value={v[source.keyFieldName]}>
                {v[source.valueFieldName]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Tooltip>
    );
    return view;
  };

  renderBooleanFilter = (columnDef) => (
    <FormControlLabel
      control={
        <Checkbox
          indeterminate={columnDef.tableData.filterValue === undefined}
          checked={columnDef.tableData.filterValue === 'checked'}
          onChange={() => {
            let val;
            if (columnDef.tableData.filterValue === undefined) {
              val = 'checked';
            } else if (columnDef.tableData.filterValue === 'checked') {
              val = 'unchecked';
            }
            this.props.onFilterChanged(columnDef.tableData.id, val);
          }}
        />
      }
      label={columnDef.fieldDefinition.fieldName}
    />
  );

  renderDefaultFilter = (columnDef) => {
    if (columnDef.filter == null) return null;
    const fieldType = columnDef.fieldDefinition.type.name;

    const isNumeric = fieldType === FieldSchemaTypeName.Money || fieldType === FieldSchemaTypeName.Int;
    return (
      <Tooltip title={columnDef.filter.filterName || ''}>
        <TextField
          style={isNumeric ? { float: 'right' } : {}}
          type={isNumeric ? 'number' : 'text'}
          value={columnDef.tableData.filterValue || ''}
          onChange={(event) => {
            this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
          }}
        />
      </Tooltip>
    );
  };

  renderDateTypeFilter = (columnDef) => {
    if (columnDef.filter == null) return null;
    const field: FieldSchema = columnDef.fieldDefinition;
    const onDateInputChange = (date) => this.props.onFilterChanged(columnDef.tableData.id, date);

    const value = columnDef.tableData.filterValue || null;

    return (
      <MuiPickersUtilsProvider
        utils={field.type.name === FieldSchemaTypeName.GregorianDateTime ? MomentUtils : JalaliUtils}
      >
        <Tooltip title={columnDef.filter.filterName || ''}>
          <DatePicker
            format={field.type.name === FieldSchemaTypeName.GregorianDateTime ? 'YYYY/MM/DD' : 'jYYYY/jM/jD'}
            style={{ minWidth: 80 }}
            value={value}
            onChange={onDateInputChange}
            clearable
          />
        </Tooltip>
      </MuiPickersUtilsProvider>
    );
  };

  getComponentForColumn(columnDef) {
    if (columnDef.filter == null) return null;
    const field: FieldSchema = columnDef.fieldDefinition;
    if (columnDef.filtering === false) {
      return null;
    }

    switch (field.type.name) {
      case FieldSchemaTypeName.Bit:
        return this.renderBooleanFilter(columnDef);
      case FieldSchemaTypeName.GregorianDateTime:
        return this.renderDateTypeFilter(columnDef);
      case FieldSchemaTypeName.PersianDate:
        return this.renderDateTypeFilter(columnDef);
      case FieldSchemaTypeName.LocalList:
        return this.renderLocalLookupFilter(columnDef);
      case FieldSchemaTypeName.List:
        return this.renderRemoteLookupFilter(columnDef);
      default:
        return this.renderDefaultFilter(columnDef);
    }
  }

  render() {
    const columns = this.props.columns
      .filter((columnDef) => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef) => (
        <TableCell key={columnDef.tableData.id} style={{ ...this.props.filterCellStyle, ...columnDef.filterCellStyle }}>
          {this.getComponentForColumn(columnDef)}
        </TableCell>
      ));

    if (this.props.selection) {
      columns.splice(0, 0, <TableCell padding="none" key="key-selection-column" />);
    }

    if (this.props.emptyCell && this.props.hasActions) {
      if (this.props.actionsColumnIndex === -1) {
        columns.push(<TableCell key="key-action-column" />);
      } else {
        let endPos = 0;
        if (this.props.selection) {
          endPos = 1;
        }
        columns.splice((this.props.actionsColumnIndex || 0) + endPos, 0, <TableCell key="key-action-column" />);
      }
    }

    if (this.props.hasDetailPanel) {
      columns.splice(0, 0, <TableCell padding="none" key="key-detail-panel-column" />);
    }

    if (this.props.isTreeData === true) {
      columns.splice(0, 0, <TableCell padding="none" key={'key-tree-data-filter'} />);
    }

    this.props.columns
      .filter((columnDef) => columnDef.tableData.groupOrder > -1)
      .forEach((columnDef) => {
        columns.splice(0, 0, <TableCell padding="checkbox" key={'key-group-filter' + columnDef.tableData.id} />);
      });

    return <TableRow style={{ height: 10 }}>{columns}</TableRow>;
  }
}

export default CustomFilterRowView;

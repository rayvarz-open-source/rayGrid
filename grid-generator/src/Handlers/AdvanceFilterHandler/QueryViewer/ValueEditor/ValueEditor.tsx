import * as React from 'react';
import { FieldSchemaTypeName } from '../../../../Models/Field';
import { ExpressionModel } from '../ExpressionModel';
import { BitValueEditor } from './BitValueEditor';
import { DateValueEditor } from './DateValueEditor';
import { InputValueEditor } from './InputValueEditor';
import { LocalListValueEditor } from './LocalListValueEditor';

type Props = {
  expression: ExpressionModel;
};

export function ValueEditor(props: Props) {
  switch (props.expression.extras.field.type.name) {
    case FieldSchemaTypeName.Bit:
      return <BitValueEditor expression={props.expression} />;
    case FieldSchemaTypeName.Barcode:
      return <InputValueEditor expression={props.expression} type={'text'} />;
    case FieldSchemaTypeName.GregorianDateTime:
    case FieldSchemaTypeName.PersianDate:
      return <DateValueEditor expression={props.expression} />;
    case FieldSchemaTypeName.String:
      return <InputValueEditor expression={props.expression} type={'text'} />;
    case FieldSchemaTypeName.Money:
      return <InputValueEditor expression={props.expression} type={'number'} />;
    case FieldSchemaTypeName.List:
      return null;
    case FieldSchemaTypeName.LocalList:
      return <LocalListValueEditor expression={props.expression} />;
    case FieldSchemaTypeName.Int:
      return <InputValueEditor expression={props.expression} type={'number'} />;
    default:
      return null;
  }
}

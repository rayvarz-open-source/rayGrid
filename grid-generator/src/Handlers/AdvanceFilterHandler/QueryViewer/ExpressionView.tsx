import * as React from 'react';
import { FilterSchemaType } from '../../../Models/Filter';
import { AndOrExpression } from './AndOrExpression';
import { ExpressionModel } from './ExpressionModel';
import { FilterExpressionView } from './FilterExpressionView';

type ExpressionProps = {
  expression: ExpressionModel;
  depth: number;
};
export function Expression(props: ExpressionProps) {
  const { expression, depth, ...others } = props;

  if ([FilterSchemaType.AND, FilterSchemaType.OR].includes(expression.type)) {
    return <AndOrExpression depth={depth} expression={expression} {...others} />;
  } else {
    return <FilterExpressionView depth={depth} expression={expression} />;
  }
}

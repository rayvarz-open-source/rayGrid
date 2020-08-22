import * as React from 'react';
import { AdvanceFilterContentProps } from './AdvanceFilterView';
import { ExpressionModel } from './QueryViewer/ExpressionModel';

type Props = {
  isDragging: boolean;
  onDropped: (value: string) => void;
  onDelete: (path: number[]) => void;
  contentProps: AdvanceFilterContentProps;
  rootExpression: ExpressionModel;
};

export const AdvanceFilterContext = React.createContext<Props>({
  isDragging: false,
  onDropped: (_value: string) => {},
  onDelete: (_path: number[]) => {},
  // we use as any here to make compiler happy
  contentProps: null as any,
  rootExpression: null as any,
});

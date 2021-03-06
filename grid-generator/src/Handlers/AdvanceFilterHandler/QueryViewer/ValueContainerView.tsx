import { ButtonBase, Icon, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
//
const useValueContainer = makeStyles((theme: Theme) =>
  createStyles({
    valueContainer: {
      backgroundColor: 'rgba(0,0,0,0.09)',
      paddingLeft: 5,
      paddingRight: 5,
      marginLeft: 5,
      marginRight: 5,
      transition: '300ms',
      '&:hover': {
        paddingRight: theme.direction == 'rtl' ? 0 : 20,
        paddingLeft: theme.direction != 'rtl' ? 0 : 20,
      },
    },
    editIcon: {
      fontSize: '1rem',
      position: 'absolute',
      right: theme.direction == 'rtl' ? undefined : 3,
      left: theme.direction != 'rtl' ? undefined : 3,
      transition: '150ms',
    },
  })
);
type ValueContainerProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
};
export function ValueContainerView(props: ValueContainerProps) {
  const classes = useValueContainer();
  const [hover, setHover] = React.useState(false);
  return (
    <ButtonBase
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classes.valueContainer}
      onClick={props.onClick}
    >
      <Typography variant="body2">{props.value}</Typography>
      <Icon
        className={classes.editIcon}
        style={{ opacity: hover ? 0.5 : 0.0, transitionDelay: hover ? '150ms' : '0ms' }}
      >
        {'edit'}
      </Icon>
    </ButtonBase>
  );
}

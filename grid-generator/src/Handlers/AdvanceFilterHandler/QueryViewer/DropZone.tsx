import { Icon } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { AdvanceFilterContext } from '../AdvanceFilterContext';

function MouseOverDetector({ children }: { children: (isOver: boolean) => React.ReactNode }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children(hover)}
    </div>
  );
}

//
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.primary.main,
      padding: 3,
      transition: '300ms',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderRadius: 5,
    },
    icon: {
      color: theme.palette.primary.contrastText,
      transition: '300ms',
    },
  })
);
type Props = {
  id: string;
};

export function DropZone(props: Props) {
  const classes = useStyles();

  return (
    <AdvanceFilterContext.Consumer>
      {(value) => (
        <MouseOverDetector>
          {(isOver) => {
            if (isOver && !value.isDragging) {
              /* dropped */ value.onDropped(props.id);
            }

            const styles = {
              width: value.isDragging ? (isOver ? 180 : 22) : 0,
              height: value.isDragging ? 22 : 0,
              transform: value.isDragging && isOver ? 'scale(1.5, 1.5)' : 'scale(1,1)',
              opacity: (isOver && value.isDragging ? 0.3 : 0) + (value.isDragging ? 0.3 : 0),
            };
            return (
              <div
                className={classes.container}
                style={{ ...styles, marginLeft: value.isDragging ? 5 : 0, marginRight: value.isDragging ? 5 : 0 }}
              >
                <Icon className={classes.icon} style={{ opacity: value.isDragging ? 1.0 : 0.0 }}>
                  {'keyboard_arrow_down'}
                </Icon>
              </div>
            );
          }}
        </MouseOverDetector>
      )}
    </AdvanceFilterContext.Consumer>
  );
}

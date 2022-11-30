import { forwardRef, FC } from 'react';
import { Collapse, Fade, Box, Grow, Slide, Zoom } from '@mui/material';
interface ITransitions {
  children?: React.ReactNode;
  position?: string;
  direction?: 'left' | 'right' | 'up' | 'down' | undefined;
  type?: string;
  [others: string]: unknown;
}
const Transitions: FC<ITransitions> = ({
  children,
  position,
  type,
  direction = undefined,
  ...others
}) => {
  let positionSX = {
    transformOrigin: '0 0 0',
  };

  switch (position) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right',
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top',
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left',
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right',
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom',
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0',
      };
      break;
  }

  return (
    <Box>
      {type === 'grow' && (
        <Grow {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {type === 'collapse' && (
        <Collapse {...others} sx={positionSX}>
          {children}
        </Collapse>
      )}
      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 500,
            enter: 600,
            exit: 400,
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
      {type === 'slide' && (
        <Slide
          {...others}
          timeout={{
            appear: 0,
            enter: 400,
            exit: 200,
          }}
          direction={direction}
        >
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}
      {type === 'zoom' && (
        <Zoom {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
};

export default Transitions;

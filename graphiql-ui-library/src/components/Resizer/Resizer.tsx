import { useRef } from 'react';

/** styles */
import { Container, Handle, Pane } from './styles';

export type ResizerProps = {
  direction: 'horizontal' | 'vertical';
  handleStyle: 'bar' | 'ghost';
  pane1: React.ReactElement;
  pane2: React.ReactElement;
};

export const Resizer: React.FC<ResizerProps> = ({
  direction = 'horizontal',
  handleStyle,
  pane1,
  pane2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pane1Ref = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const pane2Ref = useRef<HTMLDivElement | null>(null);

  const eventProperty = direction === 'horizontal' ? 'clientX' : 'clientY';
  const rectProperty = direction === 'horizontal' ? 'left' : 'top';
  const adjacentRectProperty = direction === 'horizontal' ? 'right' : 'bottom';
  const sizeProperty = direction === 'horizontal' ? 'clientWidth' : 'clientHeight';

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    let offset: number;
    if (handleRef.current) {
      offset = e[eventProperty] - handleRef.current.getBoundingClientRect()[rectProperty];
    }

    const onMouseMove = (e: MouseEvent) => {
      const handle = handleRef.current;
      const pane1 = pane1Ref.current;
      const container = containerRef.current;

      if (handle && pane1 && container && offset) {
        const firstSize =
          e[eventProperty] - container.getBoundingClientRect()[rectProperty] - offset;
        const secondSize =
          container.getBoundingClientRect()[adjacentRectProperty] -
          e[eventProperty] +
          offset -
          handle[sizeProperty];

        const newFlex = `${firstSize / secondSize}`;
        pane1.style.flex = newFlex;
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Container ref={containerRef} direction={direction}>
      <Pane ref={pane1Ref}>{pane1}</Pane>
      <Handle
        ref={handleRef}
        onMouseDown={onMouseDown}
        handleStyle={handleStyle}
        direction={direction}
      />
      <Pane ref={pane2Ref}>{pane2}</Pane>
    </Container>
  );
};

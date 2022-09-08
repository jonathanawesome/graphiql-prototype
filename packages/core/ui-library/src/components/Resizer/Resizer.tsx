import { useRef } from 'react';

// styles
import { Container, Handle, Pane1, Pane2 } from './styles';

type ResizerBaseProps = {
  pane1: {
    component: React.ReactElement | null;
  };
  pane2: {
    initialWidthPercentage: number;
    component: React.ReactElement;
  };
};

type ResizerHorizontalProps = ResizerBaseProps & {
  direction: 'HORIZONTAL';
  handlePosition: 'LEFT' | 'RIGHT';
};

type ResizerVerticalProps = ResizerBaseProps & {
  direction: 'VERTICAL';
  handlePosition: 'TOP' | 'BOTTOM';
};

export type ResizerProps = ResizerVerticalProps | ResizerHorizontalProps;

export const Resizer: React.FC<ResizerProps> = ({
  direction = 'HORIZONTAL',
  handlePosition,
  pane1,
  pane2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pane1Ref = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const pane2Ref = useRef<HTMLDivElement | null>(null);

  const eventProperty = direction === 'HORIZONTAL' ? 'clientX' : 'clientY';

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const onMouseMove = (e: MouseEvent) => {
      const handle = handleRef.current;
      const pane1 = pane1Ref.current;
      const pane2 = pane2Ref.current;
      const container = containerRef.current;

      if (handle && pane1 && pane2 && container) {
        const pane1WidthPixels =
          e[eventProperty] - container.getBoundingClientRect().left;
        const pane1WidthPercentage = Math.round(
          (pane1WidthPixels / container.getBoundingClientRect().width) * 100
        );

        pane1.style.width = `${pane1WidthPercentage}%`;
        pane2.style.width = `${100 - pane1WidthPercentage}%`;
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
      <Pane1 ref={pane1Ref} style={{ width: `${100 - pane2.initialWidthPercentage}%` }}>
        {pane1.component}
      </Pane1>
      <Handle
        ref={handleRef}
        onMouseDown={onMouseDown}
        direction={direction}
        handlePosition={handlePosition}
      />
      <Pane2 ref={pane2Ref} style={{ width: `${pane2.initialWidthPercentage}%` }}>
        {pane2.component}
      </Pane2>
    </Container>
  );
};

import { useEffect, useRef, useState } from 'react';

/** styles */
import { Container, Handle, Left, Right } from './styles';

type HorizontallyResizableContainerPaneProps = {
  component: React.ReactElement;
  initialWidthPercent: number;
};
export type HorizontallyResizableContainerProps = {
  leftPane: HorizontallyResizableContainerPaneProps;
  rightPane: HorizontallyResizableContainerPaneProps;
};

export const HorizontallyResizableContainer: React.FC<
  HorizontallyResizableContainerProps
> = ({ leftPane, rightPane }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const rightPaneRef = useRef<HTMLDivElement | null>(null);

  const [resizing, setResizing] = useState<boolean>(false);

  const [leftPaneWidth, setLeftPaneWidth] = useState<null | number>(null);

  const [triggerPositionX, setTriggerPositionX] = useState<null | number>(null);

  useEffect(() => {
    if (leftPaneRef.current && rightPaneRef.current && containerRef.current) {
      if (!leftPaneWidth) {
        return setLeftPaneWidth(leftPaneRef.current.clientWidth);
      }

      leftPaneRef.current.style.width = `${leftPaneWidth}px`;
      rightPaneRef.current.style.width = `${
        containerRef.current.clientWidth - leftPaneWidth
      }px`;
    }
    return undefined;
  }, [leftPaneWidth]);

  const onMouseDown = (e: React.MouseEvent) => {
    setTriggerPositionX(e.clientX);
    setResizing(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (resizing && leftPaneWidth && triggerPositionX) {
      const newLeftWidth = leftPaneWidth + e.clientX - triggerPositionX;
      setTriggerPositionX(e.clientX);
      setLeftPaneWidth(newLeftWidth);
    }
  };

  const onMouseUp = () => {
    setResizing(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  });

  return (
    <Container ref={containerRef}>
      <Left ref={leftPaneRef} style={{ width: `${leftPane.initialWidthPercent}%` }}>
        {leftPane.component}
      </Left>
      <Right ref={rightPaneRef} style={{ width: `${rightPane.initialWidthPercent}%` }}>
        <Handle onMouseDown={onMouseDown} />
        {rightPane.component}
      </Right>
    </Container>
  );
};

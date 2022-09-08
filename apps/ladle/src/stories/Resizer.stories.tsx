import { Resizer } from '@graphiql-prototype/ui-library';

const Pane1 = () => {
  return (
    <div style={{ height: ' 100%', width: ' 100%', backgroundColor: 'orange' }}>
      Pane1
    </div>
  );
};

const Pane2 = () => {
  return (
    <div style={{ height: ' 100%', width: ' 100%', backgroundColor: 'lime' }}>Pane2</div>
  );
};

export const ResizerHorizontalBar = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'antiquewhite', height: '100%' }}>
      <Resizer
        direction="HORIZONTAL"
        pane1={{ component: <Pane1 /> }}
        pane2={{ component: <Pane2 />, initialWidthPercentage: 50 }}
      />
    </div>
  );
};

ResizerHorizontalBar.storyName = 'Resizer --horizontal';

export const ResizerVerticalBar = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'antiquewhite', height: '100%' }}>
      <Resizer
        direction="vertical"
        pane1={{ component: <Pane1 /> }}
        pane2={{ component: <Pane2 />, initialWidthPercentage: 50 }}
      />
    </div>
  );
};

ResizerVerticalBar.storyName = 'Resizer --vertical';

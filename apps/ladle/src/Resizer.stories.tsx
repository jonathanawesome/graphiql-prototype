import { Resizer } from '@graphiql-v2-prototype/graphiql-ui-library';

const Pane1 = () => {
  return <div style={{ height: ' 100%', backgroundColor: 'orange' }}>Pane1</div>;
};

const Pane2 = () => {
  return <div style={{ height: ' 100%', backgroundColor: 'lime' }}>Pane2</div>;
};

export const ResizerHorizontalBar = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'antiquewhite', height: '100%' }}>
      <Resizer
        direction="horizontal"
        handleStyle="bar"
        pane1={{ initialFlexGrowValue: 0.5, component: <Pane1 /> }}
        pane2={{ component: <Pane2 /> }}
      />
    </div>
  );
};

ResizerHorizontalBar.storyName = 'Resizer --horizontal --bar';

export const ResizerHorizontalGhost = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'antiquewhite', height: '100%' }}>
      <Resizer
        direction="horizontal"
        handleStyle="ghost"
        pane1={{ initialFlexGrowValue: 1, component: <Pane1 /> }}
        pane2={{ component: <Pane2 /> }}
      />
    </div>
  );
};

ResizerHorizontalGhost.storyName = 'Resizer --horizontal --ghost';

export const ResizerVerticalBar = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'antiquewhite', height: '100%' }}>
      <Resizer
        direction="vertical"
        handleStyle="bar"
        pane1={{ initialFlexGrowValue: 1.25, component: <Pane1 /> }}
        pane2={{ component: <Pane2 /> }}
      />
    </div>
  );
};

ResizerVerticalBar.storyName = 'Resizer --vertical --bar';

export const ResizerVerticalGhost = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'antiquewhite', height: '100%' }}>
      <Resizer
        direction="vertical"
        handleStyle="ghost"
        pane1={{ initialFlexGrowValue: 0.5, component: <Pane1 /> }}
        pane2={{ component: <Pane2 /> }}
      />
    </div>
  );
};

ResizerVerticalGhost.storyName = 'Resizer --vertical --ghost';

import { Resizer, css } from '@graphiql-prototype/ui-library';

const StyledEditor = css({
  backgroundColor: '$editorBackground',
  borderRadius: 16,
  height: '100%',
  width: '100%',
});

const StyledOperate = css({
  backgroundColor: 'white',
  borderRadius: 12,
  height: 'calc(100% - 24px)',
  width: 'calc(100% - 12px)',
  marginTop: 12,
  marginRight: 0,
  marginBottom: 12,
  marginLeft: 12,
});

const StyledAnalyze = css({
  height: '100%',
  width: '100%',
});

export const Editor = () => {
  return (
    <div className={StyledEditor()}>
      <Resizer
        direction="HORIZONTAL"
        handlePosition="RIGHT"
        pane1={{
          component: <div className={StyledOperate()}>operate</div>,
        }}
        pane2={{
          component: <div className={StyledAnalyze()}>analyze</div>,
          initialWidthPercentage: 50,
        }}
      />
    </div>
  );
};

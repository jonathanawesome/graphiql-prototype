import { Resizer, styled } from '@graphiql-v2-prototype/graphiql-ui-library';

const EditorStyled = styled('div', {
  backgroundColor: '$editorBackground',
  borderRadius: 16,
  height: '100%',
  width: '100%',
});

const Operate = styled('div', {
  backgroundColor: 'white',
  borderRadius: 12,
  height: 'calc(100% - 24px)',
  width: 'calc(100% - 12px)',
  marginTop: 12,
  marginRight: 0,
  marginBottom: 12,
  marginLeft: 12,
});

const Analyze = styled('div', {
  height: '100%',
  width: '100%',
});

export const Editor = () => {
  return (
    <EditorStyled>
      <Resizer
        direction="horizontal"
        handleStyle="bar"
        pane1={{
          initialFlexGrowValue: 1,
          component: <Operate>operate</Operate>,
        }}
        pane2={{ component: <Analyze>analyze</Analyze> }}
      />
    </EditorStyled>
  );
};

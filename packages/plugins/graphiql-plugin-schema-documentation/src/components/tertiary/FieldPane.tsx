import { GraphQLField } from 'graphql';

// components
import { ArgumentsPaneSection } from '../PaneSection/ArgumentsPaneSection';
import { PaneSection } from '../PaneSection/PaneSection';
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';

// hooks
import { useSchemaReference } from '../../hooks';

// styles
import { StyledReturnType } from '../styles';

// utils
import { unwrapType } from '@graphiql-prototype/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldPane = ({ field }: { field: GraphQLField<any, any> }) => {
  const { setActiveTertiaryPane } = useSchemaReference();

  return (
    <>
      <DescriptionPaneSection description={field.description} />
      <PaneSection lead="Return type">
        <button
          className={StyledReturnType()}
          onClick={() =>
            setActiveTertiaryPane({ destinationPane: unwrapType(field.type) })
          }
        >
          {field.type.toString()}
        </button>
      </PaneSection>
      <ArgumentsPaneSection args={field.args} />
    </>
  );
};

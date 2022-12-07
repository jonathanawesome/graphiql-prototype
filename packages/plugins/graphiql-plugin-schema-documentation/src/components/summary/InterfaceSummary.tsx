import { Markdown } from '@graphiql-prototype/ui-library';
import { GraphQLInterfaceType } from 'graphql';

// styles
import { StyledInterfaceSummary } from '../styles';

export const InterfaceSummary = ({ int }: { int: GraphQLInterfaceType }) => {
  // console.log('InterfaceSummary', { int });

  return (
    <div className={StyledInterfaceSummary()}>
      <div className="interfaceSummaryName">{int.name}</div>
      {int.description && (
        <div className="interfaceSummaryDescription">
          <Markdown content={int.description} />
        </div>
      )}
    </div>
  );
};

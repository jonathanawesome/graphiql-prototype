import { GraphQLArgument, GraphQLField, isRequiredArgument } from 'graphql';

/** components */
import { Caret, IndicatorInputType, SeparatorRound } from '@/components';

/** styles */
import { Description, FieldDetailsStyled, NameAndTypeName } from './styles';

type FieldDetailsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldOrArg: GraphQLField<any, any> | GraphQLArgument;
  inlineDescription?: boolean;
  // isCollapsed: boolean;
  // isCollapsible: boolean;
  isSelected: boolean;
};

export const FieldDetails = ({
  fieldOrArg,
  inlineDescription = true,
  // isCollapsed,
  // isCollapsible,
  isSelected,
}: FieldDetailsProps) => {
  return (
    <FieldDetailsStyled
      active={isSelected}
      inlineDescription={inlineDescription}
      type={'args' in fieldOrArg ? 'field' : 'argument'}
    >
      {/* {isCollapsible && (
        <>
          {'args' in fieldOrArg ? (
            <Caret isExpanded={!isCollapsed} />
          ) : (
            <IndicatorInputType isExpanded={!isCollapsed} isSelected={isSelected} />
          )}
        </>
      )} */}
      <NameAndTypeName
      // pointer={isCollapsible}
      >
        {!('args' in fieldOrArg) ? (
          <span>
            {fieldOrArg.name}
            {isRequiredArgument(fieldOrArg) && '*'}
          </span>
        ) : (
          <span>{fieldOrArg.name}</span>
        )}
        <span>{fieldOrArg.type.toString()}</span>
      </NameAndTypeName>
      {fieldOrArg.description && (
        <Description>
          <SeparatorRound />
          <span>{fieldOrArg.description}</span>
        </Description>
      )}
    </FieldDetailsStyled>
  );
};

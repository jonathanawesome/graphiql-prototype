import {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
} from 'graphql';
import { useCallback } from 'react';

type TypeMatch = { type: GraphQLNamedType };

type FieldMatch = {
  type: GraphQLNamedType;
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  argument?: GraphQLArgument;
};

const isMatch = (sourceText: string, searchValue: string) => {
  try {
    const escaped = searchValue.replace(/[^_0-9A-Za-z]/g, (ch) => '\\' + ch);
    return sourceText.search(new RegExp(escaped, 'i')) !== -1;
  } catch (e) {
    return sourceText.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  }
};

export const useSearch = () => {
  // const { explorerNavStack } = useExplorerContext({
  //   nonNull: true,
  //   caller: caller || useSearchResults,
  // });
  // const { schema } = useSchemaContext({
  //   nonNull: true,
  //   caller: caller || useSearchResults,
  // });
  // const navItem = explorerNavStack[explorerNavStack.length - 1];
  // return useCallback(
  //   (searchValue: string) => {
  //     const matches: {
  //       within: FieldMatch[];
  //       types: TypeMatch[];
  //       fields: FieldMatch[];
  //     } = {
  //       within: [],
  //       types: [],
  //       fields: [],
  //     };
  //     if (!schema) {
  //       return matches;
  //     }
  //     const withinType = navItem.def;
  //     const typeMap = schema.getTypeMap();
  //     let typeNames = Object.keys(typeMap);
  //     // Move the within type name to be the first searched.
  //     if (withinType) {
  //       typeNames = typeNames.filter((n) => n !== withinType.name);
  //       typeNames.unshift(withinType.name);
  //     }
  //     for (const typeName of typeNames) {
  //       if (matches.within.length + matches.types.length + matches.fields.length >= 100) {
  //         break;
  //       }
  //       const type = typeMap[typeName];
  //       if (withinType !== type && isMatch(typeName, searchValue)) {
  //         matches.types.push({ type });
  //       }
  //       if (!isObjectType(type) && !isInterfaceType(type) && !isInputObjectType(type)) {
  //         continue;
  //       }
  //       const fields = type.getFields();
  //       for (const fieldName in fields) {
  //         const field = fields[fieldName];
  //         let matchingArgs: GraphQLArgument[] | undefined;
  //         if (!isMatch(fieldName, searchValue)) {
  //           if ('args' in field) {
  //             matchingArgs = field.args.filter((arg) => isMatch(arg.name, searchValue));
  //             if (matchingArgs.length === 0) {
  //               continue;
  //             }
  //           } else {
  //             continue;
  //           }
  //         }
  //         matches[withinType === type ? 'within' : 'fields'].push(
  //           ...(matchingArgs
  //             ? matchingArgs.map((argument) => ({ type, field, argument }))
  //             : [{ type, field }])
  //         );
  //       }
  //     }
  //     return matches;
  //   },
  //   [navItem.def, schema]
  // );
};

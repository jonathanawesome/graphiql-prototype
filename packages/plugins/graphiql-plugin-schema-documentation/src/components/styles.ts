import { styled, theme } from '@graphiql-prototype/ui-library';

const padding = theme.space[6];
const border = `1px solid ${theme.colors.surface3}`;

export const StyledSchemaNavigation = styled('div', {
  display: `flex`,
  borderBottom: border,
});

export const StyledSchemaNavigationButton = styled('button', {
  position: `relative`,
  height: '100%',
  display: `flex`,
  alignItems: `center`,
  textAlign: `center`,
  paddingLeft: theme.space[6],
  paddingRight: theme.space[6],
  color: theme.colors.text3,
  fontSize: 14,
  whiteSpace: `nowrap`,

  '&::last-of-type': {
    borderRight: `none`,
  },

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },

  '&:after': {
    content: `none`,
  },

  variants: {
    isActive: {
      true: {
        color: theme.colors.text2,
        '&:after': {
          content: ``,
          position: `absolute`,
          bottom: 0,
          left: 0,
          width: `100%`,
          height: 2,
          backgroundColor: theme.colors.green_default,
        },
      },
    },
  },
});

export const StyledSchema = styled('div', {
  height: '100%',
  width: '100%',
  position: 'relative',
  display: `grid`,
  gridTemplateRows: `${theme.space[10]} minmax(0, 1fr)`,
  overflow: `hidden`,
});

export const StyledSchemaReference = styled('div', {
  color: theme.colors.text3,
  height: `100%`,
  width: `100%`,
  position: 'relative',
  display: `flex`,
  flexDirection: `column`,
  overflow: `hidden`,
});

export const StyledBreadcrumb = styled('div', {
  display: `flex`,
  alignItems: `center`,
  color: theme.colors.text3,
  paddingLeft: padding,
  paddingRight: padding,
  height: theme.space[10],
  width: `100%`,
  borderBottom: border,
  fontSize: 12,
});

export const StyledBreadcrumbArrow = styled('span', {
  display: `flex`,
  paddingLeft: theme.space[2],
  paddingRight: theme.space[2],
});

export const StyledBreadcrumbItem = styled('span', {
  display: `flex`,
  gap: 2,
});

export const StyledPane = styled('div', {
  height: `100%`,
  overflowY: `auto`,
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[4],
  fontSize: theme.fontSizes.body,
  paddingTop: padding,
});

export const StyledPrimaryPane = styled(StyledPane, {
  maxWidth: 320,
  borderRight: border,
});

export const StyledSecondaryPane = styled(StyledPane, {
  flexGrow: 1,
  minWidth: 200,
  overflow: `hidden`,

  variants: {
    activeTertiaryPane: {
      true: {
        flexGrow: 0,
      },
    },
  },
});

export const StyledSecondaryPaneContent = styled('div', {
  height: `100%`,
  width: `100%`,
  overflowY: `auto`,
});

export const StyledTertiaryPane = styled(StyledPane, {
  flexGrow: 1,
  paddingTop: 0,
  display: `grid`,
  gridTemplateRows: `${theme.space[12]} minmax(0, 1fr)`,
  overflow: `hidden`,
  borderLeft: border,
});
export const StyledTertiaryPaneLead = styled('div', {
  width: `100%`,
  display: `flex`,
  alignItems: `center`,
  borderBottom: border,
  paddingLeft: padding,
});
export const StyledTertiaryPaneLeadInfo = styled('div', {
  width: `100%`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `flex-start`,
  gap: theme.space[1],
  paddingTop: 2,

  span: {
    '&:nth-of-type(1)': {
      textTransform: `uppercase`,
      lineHeight: 1,
      fontSize: 10,
      letterSpacing: 0.5,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.text3,
      whiteSpace: `nowrap`,
    },
    '&:nth-of-type(2)': {
      color: theme.colors.text1,
      fontWeight: theme.fontWeights.medium,
    },
  },
});

export const StyledTertiaryPaneNav = styled('div', {
  display: `flex`,
  alignItems: `center`,
  gap: 4,
});

export const StyledTertiaryPaneNavButton = styled('div', {
  transform: `rotate(90deg)`,
  height: theme.space[12],
  width: theme.space[12],
  flexShrink: 0,
  cursor: `pointer`,

  button: {
    width: `100%`,
    height: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,

    svg: {
      height: theme.space[5],
      width: theme.space[5],
    },
  },

  variants: {
    isActive: {
      true: {
        svg: {
          path: {
            fill: theme.colors.text2,
          },
        },

        '&:hover': {
          backgroundColor: theme.colors.surface2,
          svg: {
            path: {
              fill: theme.colors.text1,
            },
          },
        },
      },
      false: {
        button: {
          svg: {
            path: {
              fill: theme.colors.text4,
            },
          },
        },
      },
    },
  },
});

export const StyledTertiaryPaneContent = styled('div', {
  height: `100%`,
  width: `100%`,
  overflowY: `auto`,
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[4],
  paddingTop: theme.space[4],
});

export const StyledPaneSection = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  marginBottom: theme.space[6],
  gap: theme.space[4],
  color: theme.colors.text1,
  maxWidth: 420,

  '& .paneSectionLead': {
    display: `flex`,
    textTransform: `uppercase`,
    lineHeight: 1,
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text3,
  },

  variants: {
    withSidePadding: {
      true: {
        paddingLeft: theme.space[6],
        paddingRight: theme.space[6],

        '& .paneSectionLead': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      false: {
        paddingLeft: 0,
        paddingRight: 0,

        '& .paneSectionLead': {
          paddingLeft: theme.space[6],
          paddingRight: theme.space[6],
        },
      },
    },
  },
});

export const StyledPanes = styled('div', {
  height: `100%`,
  display: `flex`,
  overflowY: `auto`,
});

export const StyledTabButton = styled('button', {
  position: `relative`,
  display: `flex`,
  alignItems: `center`,
  width: `100%`,
  height: theme.space[10],
  paddingLeft: theme.space[6],
  paddingRight: theme.space[6],
  fontSize: theme.fontSizes.body,
  color: theme.colors.text2,

  '&:hover': {
    color: theme.colors.text1,
  },

  '&:after': {
    content: ``,
    position: `absolute`,
    width: 2,
    height: `100%`,
    top: 0,
    right: 0,
    backgroundColor: `transparent`,
  },

  variants: {
    isActive: {
      true: {
        backgroundColor: theme.colors.green_lightest,
        color: theme.colors.text1,

        '&:after': {
          backgroundColor: theme.colors.green_default,
        },
      },
    },
  },
});

export const StyledFieldSummary = styled('div', {
  borderLeft: border,
  paddingLeft: theme.space[3],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
  whiteSpace: `nowrap`,
});

export const StyledInterfaceSummary = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  gap: 8,

  '& .interfaceSummaryName': {},
  '& .interfaceSummaryDescription': {
    color: theme.colors.text2,
  },
});

export const StyledFieldPaneArgumentsList = styled('div', {
  paddingLeft: theme.space[2],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
});

export const StyledTertiaryTrigger = styled('button', {
  color: theme.colors.blue_default,

  '&:hover': {
    textDecoration: `underline`,
  },

  variants: {
    color: {
      BLUE: {
        color: theme.colors.blue_default,
      },
      GREEN: {
        color: theme.colors.green_default,
      },
      VIOLET: {
        color: theme.colors.violet_default,
      },
    },
  },
});

export const StyledDelimiter = styled('span', {
  color: theme.colors.text3,
  paddingLeft: 2,
  paddingRight: 2,
});

export const StyledReturnType = styled('button', {
  color: theme.colors.blue_default,

  '&:hover': {
    textDecoration: `underline`,
  },
});

export const StyledDefaultValue = styled('span', {
  color: theme.colors.yellow_default,
  cursor: `default`,
});

export const StyledDirectiveLocation = styled('div', {
  color: theme.colors.yellow_default,
  cursor: `default`,
});

export const StyledArgWrap = styled('div', {
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],

  variants: {
    showBorder: {
      true: {
        borderLeft: border,
        paddingLeft: theme.space[3],
      },
    },
    showDescription: {
      true: {
        display: `flex`,
        flexDirection: `column`,
      },
    },
  },
});

export const StyledArg = styled('div', {
  whiteSpace: `nowrap`,
});

export const StyledInputObjectName = styled('span', {
  color: theme.colors.orange_default,
});

export const StyledScalarArgumentName = styled('span', {
  color: theme.colors.pink_default,
});

export const StyledEnumValue = styled('div', {
  '& .enumValue': {
    color: theme.colors.green_default,
  },
});

export const StyledTypeSummary = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  borderLeft: border,
  paddingLeft: theme.space[3],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
});

export const StyledNullThing = styled('div', {
  fontSize: 13,
  color: theme.colors.text2,
});

export const SchemaDefinitionStyled = styled('div', {
  height: `100%`,
  width: `100%`,
  position: 'relative',
  paddingTop: padding,
  paddingLeft: theme.space[2],
});

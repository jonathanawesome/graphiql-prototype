import { css, theme } from '@graphiql-prototype/ui-library';

const padding = theme.space[6];
const border = `1px solid ${theme.colors.surface3}`;

export const StyledSchemaNavigation = css({
  display: `flex`,
  // borderBottom: border,
  hairlineB: theme.colors.surface3,
});

export const StyledSchemaNavigationButton = css({
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
    height: `calc(100% - 1px)`,
    paddingTop: 1,
  },

  '&:after': {
    content: `none`,
  },

  variants: {
    isActive: {
      true: {
        color: theme.colors.text2,
        '&:hover': {
          backgroundColor: theme.colors.surface2,
          height: `100%`,
          paddingTop: 0,
        },

        '&:after': {
          content: ``,
          position: `absolute`,
          bottom: -1,
          left: 0,
          width: `100%`,
          height: 2,
          backgroundColor: theme.colors.green_default,
        },
      },
    },
  },
});

export const StyledSchema = css({
  height: '100%',
  width: '100%',
  position: 'relative',
  display: `grid`,
  gridTemplateRows: `${theme.space[10]} minmax(0, 1fr)`,
  overflow: `hidden`,
});

export const StyledSchemaReference = css({
  color: theme.colors.text3,
  height: `100%`,
  width: `100%`,
  position: 'relative',
  display: `flex`,
  flexDirection: `column`,
  overflow: `hidden`,
});

export const StyledBreadcrumb = css({
  display: `flex`,
  alignItems: `center`,
  flexGrow: 0,
  flexShrink: 0,
  color: theme.colors.text3,
  paddingLeft: padding,
  paddingRight: padding,
  height: theme.space[10],
  width: `100%`,
  // borderBottom: border,
  hairlineB: theme.colors.surface3,
  fontSize: 12,
});

export const StyledBreadcrumbArrow = css({
  display: `flex`,
  paddingLeft: theme.space[2],
  paddingRight: theme.space[2],
});

export const StyledBreadcrumbItem = css({
  display: `flex`,
  gap: 2,
});

const StyledPane = css({
  height: `100%`,
  overflowY: `auto`,
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[4],
  fontSize: theme.fontSizes.body,
  paddingTop: padding,
});

export const StyledPrimaryPane = css(StyledPane, {
  maxWidth: 320,
  // borderRight: border,
});

export const StyledSecondaryPane = css(StyledPane, {
  flexGrow: 1,
  minWidth: 200,
  hairlineL: theme.colors.surface3,
  // overflow: `hidden`,

  variants: {
    activeTertiaryPane: {
      true: {
        flexGrow: 0,
      },
    },
  },
});

export const StyledTertiaryPane = css(StyledPane, {
  flexGrow: 1,
  paddingTop: 0,
  display: `grid`,
  gridTemplateRows: `64px minmax(0, 1fr)`,
  overflow: `hidden`,
  // borderLeft: border,
  hairlineL: theme.colors.surface3,
});

export const StyledTertiaryPaneLead = css({
  width: `calc(100% - 48px)`,
  display: `flex`,
  alignItems: `center`,
  marginLeft: 24,
  marginRight: 24,
  // borderBottom: border,
  hairlineB: theme.colors.surface3,
});

export const StyledTertiaryPaneLeadInfo = css({
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

// export const StyledTertiaryPaneNav = css({
//   display: `flex`,
//   alignItems: `center`,
//   gap: 4,
// });

export const StyledTertiaryPaneNavButton = css({
  transform: `rotate(90deg)`,
  flexShrink: 0,

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

export const StyledTertiaryPaneContent = css({
  height: `100%`,
  width: `100%`,
  overflowY: `auto`,
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[4],
  paddingTop: theme.space[4],
});

export const StyledPaneSection = css({
  // overflowX: `hidden`,
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

export const StyledPanes = css({
  height: `100%`,
  display: `flex`,
  overflow: `hidden`,
});

export const StyledTabButton = css({
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

export const StyledFieldSummary = css({
  borderLeft: border,
  // hairlineL: theme.colors.surface3,
  paddingLeft: theme.space[3],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
  whiteSpace: `nowrap`,
});

export const StyledInterfaceSummary = css({
  display: `flex`,
  flexDirection: `column`,
  gap: 8,

  '& .interfaceSummaryName': {},
  '& .interfaceSummaryDescription': {
    color: theme.colors.text2,
  },
});

export const StyledFieldPaneArgumentsList = css({
  paddingLeft: theme.space[2],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
});

export const StyledTertiaryTrigger = css({
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

export const StyledDelimiter = css({
  color: theme.colors.text3,
  paddingLeft: 2,
  paddingRight: 2,
});

export const StyledReturnType = css({
  color: theme.colors.blue_default,

  '&:hover': {
    textDecoration: `underline`,
  },
});

export const StyledDefaultValue = css({
  color: theme.colors.yellow_default,
  cursor: `default`,
});

export const StyledDirectiveLocation = css({
  color: theme.colors.yellow_default,
  cursor: `default`,
});

export const StyledArgWrap = css({
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],

  variants: {
    showBorder: {
      true: {
        // borderLeft: border,
        hairlineL: theme.colors.surface3,
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

export const StyledArg = css({
  whiteSpace: `nowrap`,
});

export const StyledInputObjectName = css({
  color: theme.colors.orange_default,
});

export const StyledScalarArgumentName = css({
  color: theme.colors.pink_default,
});

export const StyledEnumValue = css({
  '& .enumValue': {
    color: theme.colors.green_default,
  },
});

export const StyledTypeSummary = css({
  display: `flex`,
  flexDirection: `column`,
  // borderLeft: border,
  hairlineL: theme.colors.surface3,
  paddingLeft: theme.space[3],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
});

export const StyledNullThing = css({
  fontSize: 13,
  color: theme.colors.text2,
});

export const StyledSchemaDefinitionWrap = css({
  height: `100%`,
  width: `100%`,
  position: 'relative',
  paddingTop: padding,
  paddingLeft: theme.space[2],
  paddingRight: theme.space[2],
});

export const StyledSchemaDefinition = css({
  height: `100%`,
  width: `100%`,
  position: 'relative',
});

import { editor as MONACO_EDITOR } from 'monaco-editor';

const editorColors = {
  dark: {
    indentGuides: '#363739',
    delimiters: '#55565C',
    delimitersActive: '#A4A4A4',
    selections: '#363739',
    keywords: '#A4A4A4',
    operators: '#A4A4A4',
    text1: '#FFFFFF',
    text2: '#BFBFBF',
    text3: '#A4A4A4',
    fields: '#948AE3',
    arguments: '#FC618D',
    types: '#5AD4E6',
    values: '#7BD88F',
    orange_default: '#EE8E57',
    yellow_default: '#FCE566',
  },
  light: {
    indentGuides: '#D7D7D7', // surface3
    delimiters: '#BCBCBC', // text4
    delimitersActive: '#757575', // text3
    selections: '#D7D7D7', // surface3
    keywords: '#757575', // text3
    operators: '#757575', // text3
    text1: '#1B1B1B', // text1
    text2: '#4A4A4A', // text2
    text3: '#757575', // text3
    fields: '#5C4CDD', // violet_default
    arguments: '#D60690', // pink_default
    types: '#0B6AF9', // blue_default
    values: '#128934', // green_default
    orange_default: '#AF5F15', // orange_default
    yellow_default: '#767800', // yellow_default
  },
};

export const editorThemeDark: MONACO_EDITOR.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.foreground': editorColors['dark'].delimiters, // Editor default foreground color.
    'editorCursor.foreground': editorColors['dark'].yellow_default, // Color of the editor cursor.
    'editor.selectionBackground': editorColors['dark'].selections, // Color of the editor selection.
    'editor.background': '#FFFFFF00', // white with a 00 alpha value
    'editorLineNumber.foreground': editorColors['dark'].delimiters, // Color of editor line numbers.
    'editorLineNumber.activeForeground': editorColors['dark'].delimitersActive, // Color of editor active line number.
    'editorError.foreground': editorColors['dark'].orange_default, // Foreground color of error squigglies in the editor.
    'editorWarning.foreground': editorColors['dark'].orange_default, // Foreground color of warning squigglies in the editor.
    'editor.lineHighlightBorder': '#FFFFFF00', // Background color for the border around the line at the cursor position.
    'editorBracketMatch.background': '#FFFFFF00', // Background color behind matching brackets
    'editorBracketMatch.border': editorColors['dark'].selections, // Color for matching brackets boxes
    'editorIndentGuide.background': editorColors['dark'].indentGuides, // Color of the editor indentation guides.
    'scrollbar.shadow': '#FFFFFF00', // Scrollbar shadow to indicate that the view is scrolled.
    'editorOverviewRuler.border': '#FFFFFF00', // Color of the overview ruler border.
    // 'editorMarkerNavigationError.background': '#FFFFFF00', // Editor marker navigation widget error color.
    'editorMarkerNavigationWarning.background': '#FFFFFF00', // Editor marker navigation widget warning color.
  },
  rules: [
    // operations editor (graphql)
    {
      foreground: editorColors && editorColors['dark'].keywords,
      token: 'string.quote.gql',
    },
    {
      foreground: editorColors['dark'].orange_default,
      token: 'string.invalid.gql',
    },
    {
      foreground: editorColors && editorColors['dark'].yellow_default,
      token: 'string.gql',
    },
    {
      foreground: editorColors && editorColors['dark'].yellow_default,
      token: 'number.gql',
    },
    {
      foreground: editorColors && editorColors['dark'].yellow_default,
      token: 'number.float.gql',
    },
    {
      foreground: editorColors && editorColors['dark'].keywords,
      token: 'keyword.gql',
    },
    {
      foreground: editorColors['dark'].operators,
      token: 'operator.gql',
    },
    {
      foreground: editorColors['dark'].types,
      token: 'type.identifier.gql',
    },
    {
      foreground: editorColors['dark'].fields,
      token: 'key.identifier.gql',
    },
    {
      foreground: editorColors['dark'].arguments,
      token: 'argument.identifier.gql',
    },
    {
      foreground: editorColors['dark'].delimiters,
      token: 'delimiter.gql',
    },
    {
      foreground: editorColors['dark'].delimiters,
      token: 'delimiter.parenthesis.gql',
    },
    {
      foreground: editorColors['dark'].delimiters,
      token: 'delimiter.curly.gql',
    },
    {
      foreground: editorColors['dark'].delimiters,
      token: 'delimiter.square.gql',
    },
    {
      foreground: editorColors['dark'].text2,
      token: 'comment.gql',
    },
    // variables editor & results viewer (json)
    {
      foreground: editorColors['dark'].text2,
      token: 'delimiter.bracket.json',
    },
    {
      foreground: editorColors['dark'].text2,
      token: 'delimiter.array.json',
    },
    {
      foreground: editorColors['dark'].text2,
      token: 'delimiter.comma.json',
    },
    {
      foreground: editorColors['dark'].text2,
      token: 'delimiter.colon.json',
    },
    {
      foreground: editorColors['dark'].keywords,
      token: 'string.key.json',
    },
    {
      foreground: editorColors['dark'].values,
      token: 'string.value.json',
    },
    {
      foreground: editorColors['dark'].values,
      token: 'number.json',
    },
    {
      foreground: editorColors['dark'].values,
      token: 'keyword.json',
    },
  ],
};

export const editorThemeLight: MONACO_EDITOR.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  colors: {
    'editor.foreground': editorColors['light'].delimiters, // Editor default foreground color.
    'editorCursor.foreground': editorColors['light'].yellow_default, // Color of the editor cursor.
    'editor.selectionBackground': editorColors['light'].selections, // Color of the editor selection.
    'editor.background': '#FFFFFF00', // white with a 00 alpha value
    'editorLineNumber.foreground': editorColors['light'].delimiters, // Color of editor line numbers.
    'editorLineNumber.activeForeground': editorColors['light'].delimitersActive, // Color of editor active line number.
    'editorError.foreground': editorColors['light'].orange_default, // Foreground color of error squigglies in the editor.
    'editorWarning.foreground': editorColors['light'].orange_default, // Foreground color of warning squigglies in the editor.
    'editor.lineHighlightBorder': '#FFFFFF00', // Background color for the border around the line at the cursor position.
    'editorBracketMatch.background': '#FFFFFF00', // Background color behind matching brackets
    'editorBracketMatch.border': editorColors['light'].selections, // Color for matching brackets boxes
    'editorIndentGuide.background': editorColors['light'].indentGuides, // Color of the editor indentation guides.
    'scrollbar.shadow': '#FFFFFF00', // Scrollbar shadow to indicate that the view is scrolled.
    'editorOverviewRuler.border': '#FFFFFF00', // Color of the overview ruler border.
    // 'editorMarkerNavigationError.background': '#FFFFFF00', // Editor marker navigation widget error color.
    'editorMarkerNavigationWarning.background': '#FFFFFF00', // Editor marker navigation widget warning color.
  },
  rules: [
    // operations editor (graphql)
    {
      foreground: editorColors && editorColors['light'].keywords,
      token: 'string.quote.gql',
    },
    {
      foreground: editorColors['light'].orange_default,
      token: 'string.invalid.gql',
    },
    {
      foreground: editorColors && editorColors['light'].yellow_default,
      token: 'string.gql',
    },
    {
      foreground: editorColors && editorColors['light'].yellow_default,
      token: 'number.gql',
    },
    {
      foreground: editorColors && editorColors['light'].yellow_default,
      token: 'number.float.gql',
    },
    {
      foreground: editorColors['light'].operators,
      token: 'operator.gql',
    },
    {
      foreground: editorColors['light'].types,
      token: 'type.identifier.gql',
    },
    {
      foreground: editorColors['light'].fields,
      token: 'key.identifier.gql',
    },
    {
      foreground: editorColors['light'].arguments,
      token: 'argument.identifier.gql',
    },
    {
      foreground: editorColors['light'].delimiters,
      token: 'delimiter.gql',
    },
    {
      foreground: editorColors['light'].delimiters,
      token: 'delimiter.parenthesis.gql',
    },
    {
      foreground: editorColors['light'].delimiters,
      token: 'delimiter.curly.gql',
    },
    {
      foreground: editorColors['light'].delimiters,
      token: 'delimiter.square.gql',
    },
    {
      foreground: editorColors['light'].text2,
      token: 'comment.gql',
    },
    // variables editor & results viewer (json)
    {
      foreground: editorColors['light'].text2,
      token: 'delimiter.bracket.json',
    },
    {
      foreground: editorColors['light'].text2,
      token: 'delimiter.array.json',
    },
    {
      foreground: editorColors['light'].text2,
      token: 'delimiter.comma.json',
    },
    {
      foreground: editorColors['light'].text2,
      token: 'delimiter.colon.json',
    },
    {
      foreground: editorColors['light'].keywords,
      token: 'string.key.json',
    },
    {
      foreground: editorColors['light'].values,
      token: 'string.value.json',
    },
    {
      foreground: editorColors['light'].values,
      token: 'number.json',
    },
    {
      foreground: editorColors['light'].values,
      token: 'keyword.json',
    },
  ],
};

// A list of color names:
// 'foreground': "#FFFFFF00", // Overall foreground color. This color is only used if not overridden by a component.
// 'errorForeground': "#FFFFFF00", // Overall foreground color for error messages. This color is only used if not overridden by a component.
// 'descriptionForeground': "#FFFFFF00", // Foreground color for description text providing additional information, for example for a label.
// 'focusBorder': "#FFFFFF00", // Overall border color for focused elements. This color is only used if not overridden by a component.
// 'contrastBorder': "#FFFFFF00", // An extra border around elements to separate them from others for greater contrast.
// 'contrastActiveBorder': "#FFFFFF00", // An extra border around active elements to separate them from others for greater contrast.
// 'selection.background': "#FFFFFF00", // The background color of text selections in the workbench (e.g. for input fields or text areas). Note that this does not apply to selections within the editor.
// 'textSeparator.foreground': "#FFFFFF00", // Color for text separators.
// 'textLink.foreground': "#FFFFFF00", // Foreground color for links in text.
// 'textLink.activeForeground': "#FFFFFF00", // Foreground color for active links in text.
// 'textPreformat.foreground': "#FFFFFF00", // Foreground color for preformatted text segments.
// 'textBlockQuote.background': "#FFFFFF00", // Background color for block quotes in text.
// 'textBlockQuote.border': "#FFFFFF00", // Border color for block quotes in text.
// 'textCodeBlock.background': "#FFFFFF00", // Background color for code blocks in text.
// 'widget.shadow': "#FFFFFF00", // Shadow color of widgets such as find/replace inside the editor.
// 'input.background': "#FFFFFF00", // Input box background.
// 'input.foreground': "#FFFFFF00", // Input box foreground.
// 'input.border': "#FFFFFF00", // Input box border.
// 'inputOption.activeBorder': "#FFFFFF00", // Border color of activated options in input fields.
// 'input.placeholderForeground': "#FFFFFF00", // Input box foreground color for placeholder text.
// 'inputValidation.infoBackground': "#FFFFFF00", // Input validation background color for information severity.
// 'inputValidation.infoBorder': "#FFFFFF00", // Input validation border color for information severity.
// 'inputValidation.warningBackground': "#FFFFFF00", // Input validation background color for information warning.
// 'inputValidation.warningBorder': "#FFFFFF00", // Input validation border color for warning severity.
// 'inputValidation.errorBackground': "#FFFFFF00", // Input validation background color for error severity.
// 'inputValidation.errorBorder': "#FFFFFF00", // Input validation border color for error severity.
// 'dropdown.background': "#FFFFFF00", // Dropdown background.
// 'dropdown.foreground': "#FFFFFF00", // Dropdown foreground.
// 'dropdown.border': "#FFFFFF00", // Dropdown border.
// 'list.focusBackground': "#FFFFFF00", // List/Tree background color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.focusForeground': "#FFFFFF00", // List/Tree foreground color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.activeSelectionBackground': "#FFFFFF00", // List/Tree background color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.activeSelectionForeground': "#FFFFFF00", // List/Tree foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.inactiveSelectionBackground': "#FFFFFF00", // List/Tree background color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// 'list.inactiveSelectionForeground': "#FFFFFF00", // List/Tree foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// 'list.hoverBackground': "#FFFFFF00", // List/Tree background when hovering over items using the mouse.
// 'list.hoverForeground': "#FFFFFF00", // List/Tree foreground when hovering over items using the mouse.
// 'list.dropBackground': "#FFFFFF00", // List/Tree drag and drop background when moving items around using the mouse.
// 'list.highlightForeground': "#FFFFFF00", // List/Tree foreground color of the match highlights when searching inside the list/tree.
// 'pickerGroup.foreground': "#FFFFFF00", // Quick picker color for grouping labels.
// 'pickerGroup.border': "#FFFFFF00", // Quick picker color for grouping borders.
// 'button.foreground': "#FFFFFF00", // Button foreground color.
// 'button.background': "#FFFFFF00", // Button background color.
// 'button.hoverBackground': "#FFFFFF00", // Button background color when hovering.
// 'badge.background': "#FFFFFF00", // Badge background color. Badges are small information labels, e.g. for search results count.
// 'badge.foreground': "#FFFFFF00", // Badge foreground color. Badges are small information labels, e.g. for search results count.
// 'scrollbar.shadow': "#FFFFFF00", // Scrollbar shadow to indicate that the view is scrolled.
// 'scrollbarSlider.background': "#FFFFFF00", // Slider background color.
// 'scrollbarSlider.hoverBackground': "#FFFFFF00", // Slider background color when hovering.
// 'scrollbarSlider.activeBackground': "#FFFFFF00", // Slider background color when active.
// 'progressBar.background': "#FFFFFF00", // Background color of the progress bar that can show for long running operations.
// 'editor.background': "#FFFFFF00", // Editor background color.
// 'editor.foreground': "#FFFFFF00", // Editor default foreground color.
// 'editorWidget.background': "#FFFFFF00", // Background color of editor widgets, such as find/replace.
// 'editorWidget.border': "#FFFFFF00", // Border color of editor widgets. The color is only used if the widget chooses to have a border and if the color is not overridden by a widget.
// 'editor.selectionBackground': "#FFFFFF00", // Color of the editor selection.
// 'editor.selectionForeground': "#FFFFFF00", // Color of the selected text for high contrast.
// 'editor.inactiveSelectionBackground': "#FFFFFF00", // Color of the selection in an inactive editor.
// 'editor.selectionHighlightBackground': "#FFFFFF00", // Color for regions with the same content as the selection.
// 'editor.findMatchBackground': "#FFFFFF00", // Color of the current search match.
// 'editor.findMatchHighlightBackground': "#FFFFFF00", // Color of the other search matches.
// 'editor.findRangeHighlightBackground': "#FFFFFF00", // Color the range limiting the search.
// 'editor.hoverHighlightBackground': "#FFFFFF00", // Highlight below the word for which a hover is shown.
// 'editorHoverWidget.background': "#FFFFFF00", // Background color of the editor hover.
// 'editorHoverWidget.border': "#FFFFFF00", // Border color of the editor hover.
// 'editorLink.activeForeground': "#FFFFFF00", // Color of active links.
// 'diffEditor.insertedTextBackground': "#FFFFFF00", // Background color for text that got inserted.
// 'diffEditor.removedTextBackground': "#FFFFFF00", // Background color for text that got removed.
// 'diffEditor.insertedTextBorder': "#FFFFFF00", // Outline color for the text that got inserted.
// 'diffEditor.removedTextBorder': "#FFFFFF00", // Outline color for text that got removed.
// 'editorOverviewRuler.currentContentForeground': "#FFFFFF00", // Current overview ruler foreground for inline merge-conflicts.
// 'editorOverviewRuler.incomingContentForeground': "#FFFFFF00", // Incoming overview ruler foreground for inline merge-conflicts.
// 'editorOverviewRuler.commonContentForeground': "#FFFFFF00", // Common ancestor overview ruler foreground for inline merge-conflicts.
// 'editor.lineHighlightBackground': "#FFFFFF00", // Background color for the highlight of line at the cursor position.
// 'editor.lineHighlightBorder': "#FFFFFF00", // Background color for the border around the line at the cursor position.
// 'editor.rangeHighlightBackground': "#FFFFFF00", // Background color of highlighted ranges, like by quick open and find features.
// 'editorCursor.foreground': "#FFFFFF00", // Color of the editor cursor.
// 'editorWhitespace.foreground': "#FFFFFF00", // Color of whitespace characters in the editor.
// 'editorIndentGuide.background': "#FFFFFF00", // Color of the editor indentation guides.
// 'editorLineNumber.foreground': "#FFFFFF00", // Color of editor line numbers.
// 'editorLineNumber.activeForeground': "#FFFFFF00", // Color of editor active line number.
// 'editorRuler.foreground': "#FFFFFF00", // Color of the editor rulers.
// 'editorCodeLens.foreground': "#FFFFFF00", // Foreground color of editor code lenses
// 'editorInlayHint.foreground': "#FFFFFF00", // Foreground color of editor inlay hints
// 'editorInlayHint.background': "#FFFFFF00", // Background color of editor inlay hints
// 'editorBracketMatch.background': "#FFFFFF00", // Background color behind matching brackets
// 'editorBracketMatch.border': "#FFFFFF00", // Color for matching brackets boxes
// 'editorOverviewRuler.border': "#FFFFFF00", // Color of the overview ruler border.
// 'editorGutter.background': "#FFFFFF00", // Background color of the editor gutter. The gutter contains the glyph margins and the line numbers.
// 'editorError.foreground': "#FFFFFF00", // Foreground color of error squigglies in the editor.
// 'editorError.border': "#FFFFFF00", // Border color of error squigglies in the editor.
// 'editorWarning.foreground': "#FFFFFF00", // Foreground color of warning squigglies in the editor.
// 'editorWarning.border': "#FFFFFF00", // Border color of warning squigglies in the editor.
// 'editorMarkerNavigationError.background': "#FFFFFF00", // Editor marker navigation widget error color.
// 'editorMarkerNavigationWarning.background': "#FFFFFF00", // Editor marker navigation widget warning color.
// 'editorMarkerNavigation.background': "#FFFFFF00", // Editor marker navigation widget background.
// 'editorSuggestWidget.background': "#FFFFFF00", // Background color of the suggest widget.
// 'editorSuggestWidget.border': "#FFFFFF00", // Border color of the suggest widget.
// 'editorSuggestWidget.foreground': "#FFFFFF00", // Foreground color of the suggest widget.
// 'editorSuggestWidget.selectedBackground': "#FFFFFF00", // Background color of the selected entry in the suggest widget.
// 'editorSuggestWidget.highlightForeground': "#FFFFFF00", // Color of the match highlights in the suggest widget.
// 'editor.wordHighlightBackground': "#FFFFFF00", // Background color of a symbol during read-access, like reading a variable.
// 'editor.wordHighlightStrongBackground': "#FFFFFF00", // Background color of a symbol during write-access, like writing to a variable.
// 'peekViewTitle.background': "#FFFFFF00", // Background color of the peek view title area.
// 'peekViewTitleLabel.foreground': "#FFFFFF00", // Color of the peek view title.
// 'peekViewTitleDescription.foreground': "#FFFFFF00", // Color of the peek view title info.
// 'peekView.border': "#FFFFFF00", // Color of the peek view borders and arrow.
// 'peekViewResult.background': "#FFFFFF00", // Background color of the peek view result list.
// 'peekViewResult.lineForeground': "#FFFFFF00", // Foreground color for line nodes in the peek view result list.
// 'peekViewResult.fileForeground': "#FFFFFF00", // Foreground color for file nodes in the peek view result list.
// 'peekViewResult.selectionBackground': "#FFFFFF00", // Background color of the selected entry in the peek view result list.
// 'peekViewResult.selectionForeground': "#FFFFFF00", // Foreground color of the selected entry in the peek view result list.
// 'peekViewEditor.background': "#FFFFFF00", // Background color of the peek view editor.
// 'peekViewEditorGutter.background': "#FFFFFF00", // Background color of the gutter in the peek view editor.
// 'peekViewResult.matchHighlightBackground': "#FFFFFF00", // Match highlight color in the peek view result list.
// 'peekViewEditor.matchHighlightBackground': "#FFFFFF00", // Match highlight color in the peek view editor.

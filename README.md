# graphiql-prototype

There's much to do on the [path to GraphiQL v2](https://github.com/graphql/graphiql/issues/2328) and the new [design proposal](https://github.com/graphql/graphiql/discussions/2216) is centered around an effort to combine Docs and Docs Explorer into a single interface.

Inspired by the work of, and using many lines of code written by, [stonexer](https://github.com/stonexer) and their [graphql-picker](https://github.com/stonexer/graphiql-picker) demo, I thought I'd pitch in and build it out as best as I could so the community can have some buttons to click and flows to go through.

The primary goal of this prototype is to validate the design proposal around the new UI-based operations builder and to support fast code revisions for any further iterations of the design.

Secondary goals are many and include: developing best practices around [monaco-graphql](https://github.com/graphql/graphiql/tree/main/packages/monaco-graphql) integration, exploring an alternative state management library (to reduce boilerplate, unlock non-React implementations, etc), and to explore ideas around a plugin interface for GraphiQL v2.

The resulting monorepo structure combines ideas and implementations from the existing repository, various Github issues and discussions, and conversations on [Discord](https://discord.com/channels/625400653321076807/966768858402816020).

> This prototype has no connection to the official [GraphiQL repository](https://github.com/graphql/graphiql). I'm just a random product engineer from the internet who uses GraphQL and believes strongly in the power of the GraphQL community and wants to contribute.

## Get Involved

> First, a note. I'm currently working on this prototype solo, committing and deploying in a somewhat erratic fashion. There's no plan other than getting bits from the design on-screen in a mostly-accessible way and taking liberties along the way. I'll do my best to keep this readme up to date, but please reach out to me, @safety_jon, on [Discord](https://discord.com/channels/625400653321076807/966768858402816020) if you have any issues or would like to get involved.

### Try the prototype

The quickest way to get involved is to try out the UI [here](https://jonathanawesome.github.io/graphiql-prototype/) and provide feedback via [Discord](https://discord.com/channels/625400653321076807/966768858402816020). The default schema is a copy of the GraphiQL repository's [test setup](https://github.com/graphql/graphiql/blob/main/packages/graphiql/test/schema.js), but you can also quickly load up one of a few popular and publicly-available schemas. If you have your own schema that you'd like to load, the "Custom Schema Url" option is available as is the ability to add global headers should your API require them. If you've an API that you'd like to try but it's CORS-protected, you'll want to run this prototype locally and ensure that your API is allowing the local origin url. Instructions for this are below.

> A more complete testing and validation plan is necessary to full understand the impact of the new design for all users and for all spec-compliant schemas. If you are, or know of, a user experience researcher who might be interested in contributing to the success of the new graphiql, please reach out on [Discord](https://discord.com/channels/625400653321076807/966768858402816020).

### Running the prototype locally

If you have a schema that's not available publicly, you should run the prototype locally.

1. Clone the repository

```
git clone https://github.com/jonathanawesome/graphiql-prototype.git
```

2. Install packages

```
cd graphiql-prototype
pnpm i
```

3. Run the reference app

```
pnpm ref:dev
```

4. The local origin, by default, is `http://127.0.0.1:3000/`.

### Structure

The structure explained below is of my own design, but very much based on the ideas and thoughts around plugins expressed by the GraphiQL community over the last few years.

#### /apps

- /ladle
  - An incomplete build-out of a component library based on the design proposal. Very much in progress. Provides dev environment and views for components from multiple packages.
  - `pnpm ladle:serve`
- /reference
  - The deployable prototype running a basic vite setup.
  - `pnpm ref:dev`

#### /packages

##### /core

- /editor

  - The core experience of GraphiQL. Meant to be deployed independently, if desired, without any of the plugin bits.
  - A specific collection of editors (operations, variables,results) that, given a schema URL, allow a user to write operations, provide variables for those operations, and view the results of those operations. Importantly, includes "tabs" functionality for organizing different operations (reach out to me on [Discord](https://discord.com/channels/625400653321076807/966768858402816020) if you're wondering why "tabs" is in quotes).

- /graphiql

  - The core component for the full prototype UI.
  - Pretty simple, just wraps the core `GraphiQLEditor` component from `/editor`along with layout for navigation and plugins.
  - Provides a hook for managing navigation/active plugin view state.

- /ui-library

  - Base React components

- /useEditor

  - A [zustand](https://github.com/pmndrs/zustand) store that manages editor state such as editors, models, and tabs.

- /useHTTPHeaders

  - A [zustand](https://github.com/pmndrs/zustand) store that manages global http header state and provides intermediate functions for tab headers. Quick and dirty, needs refactored.

- /useSchema

  - A [zustand](https://github.com/pmndrs/zustand) store that manages schema loading/state and operation execution.

- /useTestSchema

  - A [zustand](https://github.com/pmndrs/zustand) store that provides the test schema and some functions used in Ladle stories and testing.

- /utils

  - Shared utilities

#### /plugins

> Pane plugins are composed of three parts, a name, an icon, and some UI. Pane plugin triggers are displayed at the top of the navigation UI and their interfaces are meant to interact directly with the editor(s).

- /graphiql-plugin-pane-history

  - A placeholder for now.

- /graphiql-plugin-pane-pathfinder

  - An attempt at implementing the new docs/docs-explorer/query-builder-ui design. I chose a unique name to reduce confusion.

- /graphiql-plugin-pane-settings

  - A simple plugin for managing app-wide settings

- /graphiql-plugin-schema-documentation
  - A plugin that provides the schema reference and definition UIs. Additionally, powers the quick docs UI in Pathfinder.

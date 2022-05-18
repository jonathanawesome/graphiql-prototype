# graphiql-v2-prototype

There's much to do on the [path to GraphiQL v2](https://github.com/graphql/graphiql/issues/2328). 

The [end goal](https://www.figma.com/file/p8f8MaG7ZRnuCc4lVv7w6t/GraphiQL-2.0?node-id=0%3A1) is a set of modern UI components and a pluggable interface.

The new [design proposal](https://github.com/graphql/graphiql/discussions/2216) is radically different and introduces a new editor _and_ a new explorer interface, the latter of which is somewhat controversial. I thought I'd take a swing at putting it all together in prototype form so we can learn from and improve on the design before moving forward. 

This repository uses [Ladle](https://ladle.dev/) as a development environment. It's my first experience with Ladle but I'm much more happy with the workflow than in previous projects working with Storybook.

I've made lots of move-quick decisions (stitches, zustand) that do not represent the final product. 

This prototype is built off of the work of [stonexer](https://github.com/stonexer) and their [graphql-picker](https://github.com/stonexer/graphiql-picker) demo, and OneGraph's [explorer](https://github.com/OneGraph/graphiql-explorer).



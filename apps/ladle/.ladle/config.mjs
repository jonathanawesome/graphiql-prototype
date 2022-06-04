export default {
  build: {
    // 👇 working
    baseUrl: process.env.NODE_ENV === "production" ? "/graphiql-v2-prototype/" : "/",
  },
  vitePlugins: [
    () => import ('vite-plugin-monaco-editor').then(m => m.default).then(({default: x}) => x({
      languageWorkers: ['json', 'editorWorkerService'],
      customWorkers: [
        {
          label: 'graphql',
          entry: 'monaco-graphql/dist/graphql.worker',
        },
      ],      
    })),
  ],
};
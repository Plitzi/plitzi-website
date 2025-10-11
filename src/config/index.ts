export type SDKEnvironment = 'production' | 'staging' | 'development' | 'local' | 'custom' | undefined;

export type EnvironmentServer = {
  googleAnalytics: string;
  apiServer: string;
  ssrServer: string;
  nodeServer: string;
  graphqlServer: string;
  websocketServer: string;
  subscriptionServer: string;
};

export const getEnvironmentServer = (env: SDKEnvironment, server?: EnvironmentServer) => {
  switch (env) {
    case 'production': {
      return {
        googleAnalytics: 'G-',
        apiServer: 'https://api.plitzi.com',
        ssrServer: 'https://ssr.plitzi.com',
        nodeServer: 'https://server.plitzi.com',
        graphqlServer: 'https://server.plitzi.com/graphql',
        websocketServer: 'wss://server.plitzi.com',
        subscriptionServer: 'wss://server.plitzi.com/subscriptions',
        ...server
      };
    }

    case 'staging': {
      return {
        googleAnalytics: 'G-2LG0J8V0X1',
        apiServer: 'https://api-stg.plitzi.com',
        ssrServer: 'https://ssr-stg.plitzi.com',
        nodeServer: 'https://server-stg.plitzi.com',
        graphqlServer: 'https://server-stg.plitzi.com/graphql',
        websocketServer: 'wss://server-stg.plitzi.com',
        subscriptionServer: 'wss://server-stg.plitzi.com/subscriptions',
        ...server
      };
    }

    case 'development': {
      return {
        googleAnalytics: 'G-2LG0J8V0X1',
        // Dashboard
        apiServer: 'https://api-dev.plitzi.com',
        ssrServer: 'https://ssr-dev.plitzi.com',
        // SDK
        // basePath: '/',
        // host: 'https://dev.plitzi.com',
        nodeServer: 'https://server-dev.plitzi.com',
        graphqlServer: 'https://server-dev.plitzi.com/graphql',
        websocketServer: 'wss://server-dev.plitzi.com',
        subscriptionServer: 'wss://server-dev.plitzi.com/subscriptions',
        ...server
      };
    }

    case 'custom': {
      return server;
    }

    default:
      return {
        googleAnalytics: '',
        apiServer: 'http://localhost',
        ssrServer: 'http://localhost:4000',
        nodeServer: 'http://localhost:8888',
        graphqlServer: 'http://localhost:8888/graphql',
        websocketServer: 'ws://localhost:8888',
        subscriptionServer: 'ws://localhost:8888/subscriptions',
        ...server
      };
  }
};

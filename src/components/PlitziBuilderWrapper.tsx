/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

// eslint-disable-next-line
// @ts-ignore
import PlitziBuilder from '@plitzi/plitzi-builder';
// eslint-disable-next-line
// @ts-ignore
import { RootElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';
import ContainerShadow from '@plitzi/plitzi-ui/ContainerShadow/index.cjs';
import classNames from 'classnames';
import { Suspense, use, useMemo } from 'react';

import { getEnvironmentServer } from '@/config';

import type { RefObject } from 'react';

// import BuilderIntro from '@modules/spaces/components/BuilderIntro';

// eslint-disable-next-line
// @ts-ignore
import styleBuilder from '!!raw-loader!@plitzi/plitzi-builder/dist/plitzi-builder.css';

export type PlitziBuilderWrapperProps = {
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  internalProps?: Record<string, unknown>;
  webKey: string;
  userKey: string;
  apiServer?: string;
  nodeServer?: string;
  graphqlServer?: string;
  websocketServer?: string;
  subscriptionServer?: string;
  builderEnvironment?: string;
};

const PlitziBuilderWrapper = ({
  ref,
  className = '',
  internalProps = {},
  webKey = '',
  userKey = '',
  // apiServer = 'https://api.plitzi.com',
  // nodeServer = 'https://server.plitzi.com',
  // graphqlServer = 'https://server.plitzi.com/graphql',
  // websocketServer = 'wss://server.plitzi.com',
  // subscriptionServer = 'wss://server.plitzi.com/subscriptions',
  builderEnvironment = 'production'
}: PlitziBuilderWrapperProps) => {
  const {
    // settings: { previewMode },
    contexts: { NavigationContext }
  } = usePlitziServiceContext();
  const {
    routeParams: { spaceId }
  } = use<{ routeParams: { spaceId: string } }>(NavigationContext);

  // const serverMemo = useMemo(
  //   () => ({
  //     domain: `https://${spaceId}.plitzi.app`,
  //     basePath: `/spaces/${spaceId}/update`,
  //     apiServer,
  //     nodeServer,
  //     graphqlServer,
  //     websocketServer,
  //     subscriptionServer
  //     // 'host' => sprintf('%s://%s/spaces', $_SERVER['REQUEST_SCHEME'], $_SERVER['HTTP_HOST']),
  //   }),
  //   [spaceId, apiServer, nodeServer, graphqlServer, websocketServer, subscriptionServer]
  // );

  const sdkEnvironment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
  const serverMemo = useMemo(
    () => ({ basePath: `/spaces/${spaceId}/update`, ...getEnvironmentServer(sdkEnvironment) }),
    [spaceId, sdkEnvironment]
  );

  return (
    <RootElement
      ref={ref}
      internalProps={internalProps}
      className={classNames('plitzi-component__plitzi-builder', className)}
    >
      <ContainerShadow className="flex h-full flex-col">
        <ContainerShadow.Link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          crossOrigin="anonymous"
        />
        <ContainerShadow.Content>
          <style>{styleBuilder}</style>
          <style>
            {`
          .mt-8 {
            margin-top: 2rem;
          }

          .bg-\\[\\#5865F2\\] {
            --tw-bg-opacity: 1;
            background-color: rgb(88 101 242 / var(--tw-bg-opacity));
          }
        `}
          </style>
          <Suspense>
            <PlitziBuilder
              webKey={webKey}
              environment="main"
              userKey={userKey}
              server={serverMemo}
              className="h-full"
              builderEnvironment={builderEnvironment}
            />
          </Suspense>
          {/* <BuilderIntro /> */}
        </ContainerShadow.Content>
      </ContainerShadow>
    </RootElement>
  );
};

PlitziBuilderWrapper.displayName = 'PlitziBuilderWrapper';

// PlitziBuilderWrapper.type = 'demo';
// PlitziBuilderWrapper.pluginSettings = Settings;
// PlitziBuilderWrapper.version = VERSION;

export const plugins = {};

// export const version = VERSION;

export default PlitziBuilderWrapper;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

// import Input from '@plitzi/plitzi-ui/Input';
// eslint-disable-next-line
// @ts-ignore
import PluginLottie from '@plitzi/plitzi-plugin-lottie';
// eslint-disable-next-line
// @ts-ignore
// import PluginTyped from '@plitzi/plitzi-plugin-typed';
// eslint-disable-next-line
// @ts-ignore
import PlitziSdk from '@plitzi/plitzi-sdk';
import React, { useMemo } from 'react';

import { getEnvironmentServer } from '@/config';

import PlitziBuilderWrapper from './PlitziBuilderWrapper';

export type PlitziSdkWrapperProps = {
  className?: string;
  previewMode?: boolean;
  environment?: 'production' | 'staging' | 'development' | 'main';
  sdkEnvironment?: 'production' | 'staging' | 'development';
  webKey: string;
  externalStyle?: string;
  basePath?: string;
  renderMode?: 'iframe' | 'raw' | 'shadow' | 'ssr' | 'widget';
  // offlineData?: {
  //   schema: {
  //     id: string;
  //     props: {
  //       name: string;
  //       description: string;
  //       version: string;
  //       plugins: Record<string, any>;
  //     };
  //   };
  //   style: {
  //     id: string;
  //     props: {
  //       cache: Record<string, any>;
  //     };
  //   };
  //   plugins: Record<string, any>;
  // };
  server?: Record<string, unknown>;
};

const PlitziSdkWrapper = ({
  className = '',
  previewMode = false,
  environment = 'main',
  sdkEnvironment = 'development',
  webKey, //  = '',
  externalStyle = '',
  basePath = '',
  renderMode = 'iframe',
  // offlineData,
  server
}: PlitziSdkWrapperProps) => {
  const serverMemo = useMemo(
    () => ({ basePath, ...getEnvironmentServer(sdkEnvironment), ...server }),
    [basePath, server, sdkEnvironment]
  );

  return (
    <PlitziSdk
      className={className}
      environment={environment}
      webKey={webKey}
      externalStyle={externalStyle}
      server={serverMemo}
      previewMode={previewMode}
      renderMode={renderMode}
      debugMode={sdkEnvironment === 'development'}
      // offlineMode={!!offlineData && Object.keys(offlineData).length > 0}
      // offlineData={offlineData}
    >
      <PlitziSdk.Plugin
        renderType="plitziBuilder"
        component={PlitziBuilderWrapper}
        apiKey="wtf"
        internalProps={{ apiKey: 'wtf' }}
      />
      {/* <PlitziSdk.Plugin renderType="typed" component={PluginTyped} /> */}
      <PlitziSdk.Plugin renderType="lottie" component={PluginLottie} />
    </PlitziSdk>
  );
};

export default PlitziSdkWrapper;

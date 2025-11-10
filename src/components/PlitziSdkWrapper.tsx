// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

// eslint-disable-next-line
// @ts-ignore
import PlitziSdk from '@plitzi/plitzi-sdk/loader/next';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { getEnvironmentServer } from '@/config';

const PlitziBuilderWrapper = dynamic(() => import('./PlitziBuilderWrapper'), { ssr: false });

import type { SDKEnvironment } from '@/config';

export type PlitziSdkWrapperProps = {
  className?: string;
  previewMode?: boolean;
  environment?: 'production' | 'staging' | 'development' | 'main';
  sdkEnvironment?: SDKEnvironment;
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
  sdkEnvironment = 'production',
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
      debugMode={sdkEnvironment === 'local'}
      // offlineMode={!!offlineData && Object.keys(offlineData).length > 0}
      // offlineData={offlineData}
    >
      <PlitziSdk.Plugin
        renderType="plitziBuilder"
        component={PlitziBuilderWrapper}
        builderEnvironment={sdkEnvironment}
      />
    </PlitziSdk>
  );
};

export default PlitziSdkWrapper;

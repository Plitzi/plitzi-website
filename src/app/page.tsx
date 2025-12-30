'use client';

// eslint-disable-next-line
// @ts-ignore
import PlitziSdk from '@plitzi/plitzi-sdk';
import { useMemo } from 'react';

import PlitziBuilderWrapper from '@/components/PlitziBuilderWrapper';
import { getEnvironmentServer } from '@/config';

import type { SDKEnvironment } from '@/config';

export default function Home() {
  const sdkEnvironment =
    (process.env.NEXT_PUBLIC_SDK_ENVIRONMENT as SDKEnvironment | undefined) ?? ('production' as SDKEnvironment);

  const serverMemo = useMemo(() => ({ basePath: '', ...getEnvironmentServer(sdkEnvironment) }), [sdkEnvironment]);

  return (
    <PlitziSdk
      className="min-h-dvh w-full grow text-gray-700"
      environment="main"
      webKey={process.env.NEXT_PUBLIC_PLITZI_WEB_KEY as string}
      // externalStyle={externalStyle}
      server={serverMemo}
      previewMode
      renderMode="raw"
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
}

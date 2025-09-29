import SdkLoader from '@/components/SdkLoader';

export default function Home() {
  // const sdkEnvironment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

  return (
    <SdkLoader
      className="min-h-dvh w-full grow text-gray-700"
      // environment={environment}
      sdkEnvironment={process.env.NEXT_PUBLIC_SDK_ENVIRONMENT as 'production' | 'staging' | 'development' | undefined}
      webKey={process.env.NEXT_PUBLIC_PLITZI_WEB_KEY as string}
      // externalStyle={externalStyle}
      // server={serverMemo}
      previewMode
      // renderMode={renderMode}
      renderMode="raw"
      // debugMode={sdkEnvironment === 'development'}
      // offlineMode={!!offlineData && Object.keys(offlineData).length > 0}
      // offlineData={offlineData}
    />
  );
}

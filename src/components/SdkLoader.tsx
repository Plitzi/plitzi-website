'use client';

import dynamic from 'next/dynamic.js';
import React from 'react';

import type { PlitziSdkWrapperProps } from './PlitziSdkWrapper.tsx';

const PlitziSdkWrapper = dynamic(() => import('./PlitziSdkWrapper'), { ssr: false });

const SdkLoader = (props: PlitziSdkWrapperProps) => <PlitziSdkWrapper {...props} />;

export default SdkLoader;

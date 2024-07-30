import {getLinkingObject} from 'react-native-web-screen';

import {Routes} from './webScreenRoutes';

export const linkingConfig = {
  screens: {
    [Routes.Projects]: "/one"
  },
};

export const baseURL = 'https://turbo-native-demo.glitch.me/';

export const linking = getLinkingObject(baseURL, linkingConfig);

console.log(linking)
import {getLinkingObject} from 'react-native-web-screen';

import {Routes} from './webScreenRoutes';

export const linkingConfig = {
  screens: {
    [Routes.Posts]: "/posts"
  },
};

export const baseURL = 'http://10.0.2.2:3000/';

export const linking = getLinkingObject(baseURL, linkingConfig);

console.log(linking)
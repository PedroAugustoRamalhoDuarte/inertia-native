import {getLinkingObject} from 'react-native-web-screen';

export const Routes = {
  Posts: "Posts",
  CreatePost: "CreatePost",
  ShowPost: "ShowPost",
  EditPost: "EditPost",
  Fallback: "Fallback",
}

export const linkingConfig = {
  screens: {
    [Routes.Posts]: "posts",
    [Routes.CreatePost]: "posts/new",
    [Routes.EditPost]: "posts/:id/edit",
    [Routes.ShowPost]: "posts/:id",
    [Routes.Fallback]: "*",
  },
};

export const linkingTurboConfig = {
  screens: {
    [Routes.Posts]: "turbo/posts",
    [Routes.CreatePost]: "turbo/posts/new",
    [Routes.EditPost]: "turbo/posts/:id/edit",
    [Routes.ShowPost]: "turbo/posts/:id",
    [Routes.Fallback]: "*",
  },
};

export const baseURL = 'http://192.168.2.61:3000/';

export const linking = getLinkingObject(baseURL, linkingConfig);

import {getLinkingObject} from 'react-native-web-screen';

export const Routes = {
  Posts: "Posts",
  CreatePost: "CreatePost",
  ShowPost: "ShowPost",
  EditPost: "EditPost",
}

export const linkingConfig = {
  screens: {
    [Routes.Posts]: "*",
    [Routes.CreatePost]: "posts/new",
    [Routes.EditPost]: "posts/:id/edit",
    [Routes.ShowPost]: "posts/:id",
  },
};

export const baseURL = 'http://192.168.2.7:3000/';

export const linking = getLinkingObject(baseURL, linkingConfig);

console.log(linking)
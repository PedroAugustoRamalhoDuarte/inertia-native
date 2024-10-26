# Inertia + React Native

> This repo is a work in progress to make Inertia play nice with React Native. Something like Hotwired Native for
> Inertia

This repo will show you how to use Inertia with React Native.

In SwitchDreams stack we use this awesome tool called `Inertia` and our goal is to integrate our web application into a
webview with React Native and make it more native like.

## Rails Application

The Rails application is a default Rails + Inertia with React application

## How to RUN?

- Install dependencies from your rails app and react native inside mobile folder
- Run you rails app in root folder with: `foreman start -f Procfile.dev`
- Changes your URL to you PC ip inside `mobile/webScreen` file
- Run your expo react native app inside mobile folder with: `yarn start`

## Native -> React Native

> The first attempt was to use Turbo Native with react-native-turbo package, but for Turbo work we need to hack a
> little bit the JS bridge between Native and Turbo JS. But we are not using turbo js, so the hack is a little bit
> bigger, we can accomplish that but maybe is too much work on it, more info in docs.

For native mobile we are using React Native with this following packages:

- [React Native Web Screen](https://github.com/software-mansion-labs/react-native-turbo-demo/tree/main/packages/navigation):
  The goal of this package it to allow you to render web views as if they were real native screens, caching the results
  and providing native animation between screens.
- [React Navigation]
- [React Native WebView]
- [Expo]

The principal idea is to customize the react-native-webview to listen to Inertia router events and render one Webview
for each
principal Screen of you Website and one Webview to Fallback.

Also we can mix between Native Screen and Web Screens.

Actually the demo APP uses Stack Router, but in the feature we want to support Tab Navigation too.

### TODO List

- Improves reload page after create something (Important)
- Post demo vídeo in README.md
# Inertia + Turbo Native + React Native

This repo will show you how to use Inertia with "turbo native" and React Native.

Most of the guides setup Turbo Native with Turbo and Android or IOS separated, but in the rails world we always try to
make thing simpler, and let's do it one more time eliminated separated build from IOS and Android and unified with React
Native.

In SwitchDreams stack we use this awesome tool called Inertia and our goal is to integrate our web application into a
webview with React Native and make it more native like.

## Rails Application

The Rails application is a default Rails + Inertia with React application

## Native -> React Native

> The first attempt was to use Turbo Native with react-native-turbo package, but for Turbo work we need to hack a
> little bit the JS bridge between Native and Turbo JS. But we are not using turbo js, so the hack is a little bit
> bigger, we can accomplish that but maybe is too much work on it, more info in docs.

For native mobile we are using React Native with this following packages

- [React Native Web Screen](https://github.com/software-mansion-labs/react-native-turbo-demo/tree/main/packages/navigation):
  The goal of this package it to allow you to render web views as if they were real native screens, caching the results
  and providing native animation between screens.
- [React Navigation]
- [Expo]

### TODO List

- Explain better the idea from the project
- Removes turbo native things
- Rename folder mobile to native
- Usage instructions
- Demo with Post CRUDs
- Post demo vídeo in README.md
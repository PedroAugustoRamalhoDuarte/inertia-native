# Inertia + Turbo Native + React Native

Work in Progress...

This repo will show you how to use inertia with turbo native and react native

Most of the guides setup Turbo Native with Turbo and Android or IOS separated, but in the rails world we always try to
make thing simpler, and let's do it one more time eliminated separated build from IOS and Android and unified with React
Native.

In SwitchDreams stack we use this awesome tool called Inertia and our goal is to integrate with Turbo Native.

## Mobile

For mobile we are using React Native, is a bit of trouble to set up everything correct.

### Steps

- Create a mobile build

`eas build --profile development --platform android --local`

- Submit the mobile build for the simulator (For more info
  access [expo docs](https://docs.expo.dev/build-reference/apk/#installing-your-build))

`adb install <build-name.apk>`

### TODO List

- Explain better the idea from the project
- Removes turbo native things
- Rename folder mobile to native
- Usage instructions
- Demo with Post CRUDs
- Post demo vídeo in README.md
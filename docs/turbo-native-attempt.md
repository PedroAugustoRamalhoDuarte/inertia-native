### Steps

- Create a mobile build

`eas build --profile development --platform android --local`

- Submit the mobile build for the simulator (For more info
  access [expo docs](https://docs.expo.dev/build-reference/apk/#installing-your-build))

`adb install <build-name.apk>`

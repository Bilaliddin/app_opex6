<!-- opex6
cd C:\Dev\rn\app_opex6
npx expo start -c
r
npm i


# 1) Перейти в папку проекта (исправь путь под себя)
cd C:\Dev\rn\app_opex6

# 2) Запустить Android-эмулятор (любой из списка)
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -list-avds
# подставь имя из списка (например: Medium_Phone_API_36.1)
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Medium_Phone_API_36.1
# при ощибке 
# Перезапуск демона ADB
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" kill-server
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" start-server

# 3) Проверить, что ADB видит устройство
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices

# 4) Установить/обновить зависимости (если нужно)
npm i

# 5) Запустить Expo с очисткой кэша Metro
npx expo start -c

# 6) Открыть проект на эмуляторе (в окне Expo можно нажать "a")
# или командой:
npx expo start --android

-->



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

Update: 2025-10-22T18:27:15

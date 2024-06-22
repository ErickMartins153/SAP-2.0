const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    name: IS_DEV ? "SAP_DEV" : "SAP",
    slug: "SAP",
    version: "1.0.0",
    orientation: "portrait",
    icon: `./assets/images/${IS_DEV ? "icon-dev" : "icon"}.png`,
    scheme: "sap",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FFECC0",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: IS_DEV ? "br.upe.sap.dev" : "br.upe.sap",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-image-picker",
        {
          photosPermission:
            "O aplicativo precisa de acesso às suas fotos para que você possa compartilhá-la",
        },
      ],
      [
        "expo-dev-launcher",
        {
          launchMode: "most-recent",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "590e140f-70c4-426c-80ee-36911006ff84",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/590e140f-70c4-426c-80ee-36911006ff84",
    },
  },
};

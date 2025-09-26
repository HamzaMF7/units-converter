export default {
  expo: {
    name: "units-converter",
    slug: "units-converter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "unitsconverter",
    userInterfaceStyle: "automatic",
    
    plugins : [
      ["expo-build-properties", {
        "android": { "newArchEnabled": true },
        "ios": { "newArchEnabled": true }
      }]
      ,
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ] , 

    extra : {
      eas: {
        "projectId": "399c63da-aa99-47fc-a4ba-0a08de088d95"
      }

    } , 
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#0B0F1A" // match your brand
    },

    ios: {
      bundleIdentifier: "com.hmf.unitsconverter",
      supportsTablet: true,
      buildNumber: "1"
    },

    android: {
      package: "com.hmf.unitsconverter",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#0B0F1A",
        monochromeImage: "./assets/images/adaptive-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },

    experiments: {
      typedRoutes: true
    }


  }
};

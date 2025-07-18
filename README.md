# iTarian-TicketSys

## Bundling for Android & Cleaning Up Unnecessary Files

When you run the following command to bundle your React Native app for Android:

```sh
npx react-native bundle --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/
```

This command may generate many unnecessary files in `android/app/src/main/assets/` and `android/app/src/main/res/`.

**Before creating a new APK, you should clean up these files:**

1. Remove all files in `android/app/src/main/assets/` except `index.android.bundle`.
2. Remove unnecessary files in `android/app/src/main/res/drawable-*` and `android/app/src/main/res/raw/` that are not required by your app.

3. Verify only required files exist before building APK.

This helps keep your APK clean and free of unnecessary assets.
# iTarian-TicketSys

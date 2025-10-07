# APK Build Instructions

## Method 1: Online APK Builder (Easiest)

1. **Zip your project:**
   - Zip the entire project folder
   - Upload to: https://monaca.io/ or https://voltbuilder.com/

2. **Configure build:**
   - Select Android platform
   - Upload your zip file
   - Download the built APK

## Method 2: Manual USB Installation

1. **Install Java JDK 17:**
   ```
   Download from: https://adoptium.net/
   ```

2. **Install Android SDK:**
   ```
   Download from: https://developer.android.com/studio#cmdline-tools
   ```

3. **Set Environment Variables:**
   ```
   JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
   ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   ```

4. **Build APK:**
   ```
   cd android
   .\gradlew assembleDebug
   ```

5. **Install to Phone:**
   ```
   .\gradlew installDebug
   ```

## APK Location
After building, your APK will be at:
`android\app\build\outputs\apk\debug\app-debug.apk`

## USB Installation Steps
1. Connect phone via USB
2. Enable USB Debugging on phone
3. Run: `.\gradlew installDebug`
   OR
4. Copy APK to phone and install manually
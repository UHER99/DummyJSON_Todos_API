@echo off
echo Building APK for USB installation...
echo.
echo Make sure you have:
echo 1. Java JDK installed
echo 2. Phone connected via USB
echo 3. USB Debugging enabled on phone
echo.
pause

cd android
echo Building debug APK...
.\gradlew assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ APK built successfully!
    echo APK location: android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Installing to connected device...
    .\gradlew installDebug
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ App installed successfully on your phone!
    ) else (
        echo ❌ Installation failed. Copy APK manually to your phone.
        echo APK path: %cd%\app\build\outputs\apk\debug\app-debug.apk
    )
) else (
    echo ❌ Build failed. Check if Java is installed correctly.
)

pause
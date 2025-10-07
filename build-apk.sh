#!/bin/bash

echo "🚀 Building APK via GitHub Actions..."
echo ""
echo "This will trigger a build on GitHub and provide you with the APK."
echo ""

# Check if gh CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found. Triggering workflow..."
    gh workflow run build-android.yml
    echo ""
    echo "✅ Build triggered! Check the progress at:"
    echo "   https://github.com/UHER99/DummyJSON_Todos_API/actions"
    echo ""
    echo "📱 To download APK when ready:"
    echo "   1. Go to the Actions tab"
    echo "   2. Click on the latest 'Build Android APK' run"
    echo "   3. Download the 'android-apk' artifact"
else
    echo "ℹ️  GitHub CLI not installed. Manual trigger required:"
    echo ""
    echo "🌐 Go to: https://github.com/UHER99/DummyJSON_Todos_API/actions"
    echo "📋 Steps:"
    echo "   1. Click on 'Build Android APK' workflow"
    echo "   2. Click 'Run workflow' button"
    echo "   3. Click 'Run workflow' again"
    echo "   4. Wait for completion (~5-10 minutes)"
    echo "   5. Download APK from artifacts"
fi

echo ""
echo "🎯 Your APK will be available as 'android-apk' in the artifacts section."
# Unofficial Fluxer Client (UFC)

An unofficial, high-performance desktop experience for Fluxer, built with Electron for maximum stability and a native feel. This client bridges the gap between the web and the desktop, offering features specifically designed for professional workflows.

---

## 📥 Download Latest Version
[![Download Unofficial Fluxer Client](https://img.shields.io/badge/Download-Latest_Release-blue?style=for-the-badge&logo=windows)](https://github.com/ByAldon/Unofficial-Fluxer-Client/releases/latest)

---

## 🚀 Version 1.4.5 Highlights

The client is constantly evolving to provide a seamless desktop experience:

- **🧠 Smart Background Refresh**: Automatically performs a silent cache refresh every 5 minutes when the app is minimized, ensuring your session is always fast when you return.
- **🌐 Native Link Handling**: External links shared in chats are now fully intercepted and instantly open in your default Windows browser for security and ease of use.
- **🔄 Intelligent Update System**: Automatically checks for the latest releases on startup. Direct download links are provided in notifications.
- **🔇 Silent Experience**: All intrusive Windows alert sounds ("dings") have been removed from notifications and dialogs.
- **📐 Optimized Workspace**: The default window resolution is set to **1440x900**, reducing unnecessary scrollbars.
- **🧼 Deep Cleanup Policy**: The uninstaller is optimized to purge all local site data, caches, and application-specific registry entries from `%AppData%` upon removal.

## 📥 Installation

1. Click the **Download** badge above or navigate to the [Releases](https://github.com/ByAldon/Unofficial-Fluxer-Client/releases) section.
2. Download the latest setup executable.
3. Run the installer. If a previous version exists, it will perform a clean update automatically.

## ⌨️ Development & Build

If you want to build the project yourself:

```bash
# Install dependencies
npm install

# Run the app in development mode
npm start

# Build the Windows installer (output in dist/ folder)
npm run build

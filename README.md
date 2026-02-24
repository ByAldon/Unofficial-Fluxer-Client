# Unofficial Fluxer Client

An unofficial, high-performance desktop experience for Fluxer, built with Electron for maximum stability and a native feel. This client bridges the gap between the web and the desktop, offering features specifically designed for professional workflows.

## 🚀 Version 1.4.4 Highlights

Since the initial release, the client has evolved from a simple wrapper to a refined desktop application:

- **🔄 Intelligent Update System**: Automatically checks for the latest releases on startup. Direct download links are provided in notifications for a seamless upgrade experience [cite: 2026-02-23].
- **🔇 Silent Experience**: All intrusive Windows alert sounds ("dings") have been removed from notifications and dialogs to ensure a focused, non-disruptive environment [cite: 2026-02-23].
- **📐 Optimized Workspace**: The default window resolution is set to **1440x900**, providing the Fluxer UI with more breathing room and significantly reducing unnecessary scrollbars.
- **🛠️ Network & Cache Tools**: 
    - **Smart Refresh**: A dedicated network-refresh button is integrated into the UI (bottom-right) to resolve loading issues instantly without restarting the app.
    - **Tray Integration**: Access "Clear Cache & Reload" directly from the system tray for deep troubleshooting.
- **🛡️ Enhanced Navigation**: External links are automatically intercepted and opened in your default system browser to keep your session secure and focused.
- **🧼 Deep Cleanup Policy**: The uninstaller is optimized to purge all local site data, caches, and application-specific registry entries from `%AppData%` upon removal [cite: 2026-02-23].

## 📥 Installation

1. Navigate to the [Releases](https://github.com/ByAldon/Unofficial-Fluxer-Client/releases) section.
2. Download the latest **`Unofficial-Fluxer-Client-Setup.exe`**.
3. Run the installer. If a previous version exists, it will perform a clean update automatically.

## ⌨️ Development & Build

If you want to build the project yourself:

```bash
# Install dependencies
npm install

# Run the app in development mode
npm start

# Build the Windows installer (dist/ folder)
npm run build
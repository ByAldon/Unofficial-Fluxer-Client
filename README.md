# 🚀 Unofficial Fluxer Client

An unofficial, high-performance desktop experience for Fluxer, built with Electron for maximum stability and a native Windows feel. This client bridges the gap between the web and the desktop, offering features specifically designed for professional workflows and fewer distractions.

[![GitHub Release](https://img.shields.io/github/v/release/ByAldon/Unofficial-Fluxer-Client?style=for-the-badge&color=success)](https://github.com/ByAldon/Unofficial-Fluxer-Client/releases/latest)
[![Download Unofficial Fluxer Client](https://img.shields.io/badge/Download-Latest_Release-blue?style=for-the-badge&logo=windows)](https://github.com/ByAldon/Unofficial-Fluxer-Client/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

This client goes beyond simply wrapping a website. It actively enhances your experience with custom quality-of-life improvements:

- **🖥️ Standalone Workspace**: Stop losing your Fluxer session between dozens of open browser tabs. Keep it neatly organized in your taskbar.
- **🖱️ Instant Tray Access**: Just like Discord and other native apps, a simple **left-click** on the system tray icon instantly restores and focuses the window.
- **🧠 Smart Background Refresh**: Never come back to a stale or disconnected session. When minimized or hidden, the app performs a silent cache refresh every 5 minutes.
- **🌐 Native Link Handling**: Security first. External links shared in chats are intercepted and instantly opened in your default Windows browser (Chrome, Edge, Firefox, etc.) instead of awkward in-app popups.
- **🛡️ Proactive Server Notices**: Custom, native-looking dialogs inform you about external Fluxer server instability, so you always know whether it's an app bug or a server issue.
- **🤫 Silent Auto-Updates**: The app checks for the latest releases on startup and handles updates cleanly without intrusive Windows alert sounds.

---

## 📥 Installation

1. Navigate to the [Releases](https://github.com/ByAldon/Unofficial-Fluxer-Client/releases) section or click the Download badge above.
2. Download the latest `Unofficial-Fluxer-Client-Setup-x.x.x.exe` file.
3. Run the installer. 
4. *Upgrading?* The installer will automatically detect your current version and perform a clean update without losing your settings.

---

## 🛠️ Usage & System Tray Options

Once the app is running, it will reside in your Windows system tray (bottom right). 
- **Left-Click**: Instantly show or restore the app window.
- **Right-Click**: Opens the context menu with the following options:
  - `Show App`: Restores the window.
  - `Clear Cache & Reload`: Instantly performs a hard refresh and clears local session data. Use this if the app feels sluggish or if Fluxer servers are having hiccups.
  - `About`: Check your current version and manually check for updates.

---

## ⌨️ Development & Build Instructions

If you want to compile the project yourself, ensure you have [Node.js](https://nodejs.org/) installed, then run the following commands:

```bash
# Clone the repository
git clone [https://github.com/ByAldon/Unofficial-Fluxer-Client.git](https://github.com/ByAldon/Unofficial-Fluxer-Client.git)

# Navigate into the directory
cd Unofficial-Fluxer-Client

# Install the required dependencies
npm install

# Run the application in development mode
npm start

# Compile and build the Windows executable (.exe)
npm run build
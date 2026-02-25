<div align="center">

# ⚡ FluxCap - The Unofficial Fluxer Client!

> **An unofficial, community-driven, and highly customizable desktop client for the Fluxer network.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.4.8-brightgreen.svg)]()
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange.svg)](#contributing)

</div>

---

## 📖 Table of Contents

* [About the Project](#-about-the-project)
* [Key Features](#-key-features)
* [Installation & Setup](#-installation--setup)
    * [Standard Installation](#standard-installation)
    * [Build from Source](#build-from-source)
    * [Clean Installation Guide](#clean-installation-guide)
* [Usage](#-usage)
* [Disclaimer](#-disclaimer)
* [License](#-license)

---

## 🚀 About the Project

**FluxCap** is an independent desktop client designed to connect seamlessly with the Fluxer network. Built with Electron, it provides a dedicated, fast, and customizable user interface for Windows, taking Fluxer out of your browser and directly onto your desktop.

## ✨ Key Features

* **🔌 Seamless Connectivity:** Connects directly to the official `web.fluxer.app` interface.
* **⚡ Optimized Performance:** Includes smart background refreshing and cache management to keep memory usage low.
* **🔄 Auto-Updates:** Built-in automatic updates ensure you are always running the latest version without manual downloads.
* **💻 Native Desktop Experience:** Features a system tray icon, custom window framing, and secure external link handling.
* **🧩 Open Source:** Fully transparent architecture, distributed under the MIT License.

---

## 🛠 Installation & Setup

### Standard Installation (Recommended)

1. Go to the [Releases](https://github.com/ByAldon/FluxCap/releases) page.
2. Download the latest `FluxCap-Setup-1.4.8.exe` installer.
3. Run the installer and follow the prompts.

### Build from Source

To get a development environment running or to build the application yourself, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ByAldon/FluxCap.git](https://github.com/ByAldon/FluxCap.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd FluxCap
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```
4.  **Start the application in development mode:**
    ```bash
    npm start
    ```
5.  **Build the Windows Installer (.exe):**
    ```bash
    npm run build
    ```

### Clean Installation Guide

When updating to a new major version of FluxCap, we highly recommend performing a clean installation. This prevents old cache files, registry entries, or outdated configurations from causing unexpected behavior.

We recommend using **Revo Uninstaller** to ensure all leftover registry items and hidden application data in your `AppData` folders are completely removed.

1.  **Download:** Get [Revo Uninstaller Free](https://www.revouninstaller.com/products/revo-uninstaller-free/) and install it.
2.  **Uninstall:** Open Revo Uninstaller, select FluxCap, and click **Uninstall**.
3.  **Scan for Leftovers:** Use the "Moderate" or "Advanced" scan to find and safely remove remaining files and registry entries.
4.  **Install the New Update:** Once your system is clean, download and install the latest release.

For detailed instructions, please refer to our [Clean Installation Guide in the Wiki](https://github.com/ByAldon/FluxCap/wiki/Clean-Installation-Guide) or the [Revo Uninstaller Support Page](https://www.revouninstaller.com/support/#howto).

---

## 💻 Usage

Simply launch **FluxCap** from your start menu or desktop shortcut. The client will automatically connect to the Fluxer web interface. You can log in using your standard credentials.

If you close the window, FluxCap will silently minimize to your system tray to keep you connected in the background. Right-click the tray icon to completely quit the application, clear the cache, or manually check for updates.

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! We love community input to make FluxCap better.

1. Fork the Project.
2. Create your Feature Branch: `git checkout -b feature/AmazingFeature`
3. Commit your Changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request.

---

## ⚠️ Disclaimer

**FluxCap is a third-party, independent project.** It is not affiliated with, endorsed by, sponsored by, or formally associated with the official Fluxer project or its development team. "Fluxer" is a trademark of its respective owners. 

If you encounter issues related to the core network or your account, please contact the official Fluxer support. For client-specific bugs, please use our issue tracker.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

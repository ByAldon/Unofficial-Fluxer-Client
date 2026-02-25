<div align="center">

# ⚡ FluxCap

> **An unofficial, community-driven, and highly customizable client for the Fluxer network.**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-brightgreen.svg)](https://nodejs.org/)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange.svg)](#contributing)

</div>

---

## 📖 Table of Contents

* [About the Project](#-about-the-project)
* [Key Features](#-key-features)
* [Screenshots](#-screenshots)
* [Installation & Setup](#-installation--setup)
    * [Prerequisites](#prerequisites)
    * [Build from Source](#build-from-source)
    * [Clean Installation Guide](#clean-installation-guide)
* [Usage](#-usage)
* [Roadmap](#-roadmap)
* [Contributing](#-contributing)
* [Disclaimer](#-disclaimer)
* [License](#-license)

---

## 🚀 About the Project

**FluxCap** is an independent client designed from the ground up to connect seamlessly with the Fluxer instant messaging and VoIP platform. Whether you are connecting to the official `fluxer.app` nodes or your own self-hosted private instance, FluxCap provides a lightweight, fast, and customizable user interface. 

Our goal is to give users more control over their messaging experience without sacrificing the core functionality of the Fluxer network.

## ✨ Key Features

* **🔌 Seamless Connectivity:** Log in to any official or self-hosted Fluxer instance with ease.
* **🎨 Fully Customizable:** Tailor the UI to your liking with built-in dark/light modes and custom theme support.
* **⚡ Optimized Performance:** Engineered for low memory consumption and snappy response times.
* **🔒 Privacy Focused:** All connections are secure, and no telemetry data is collected by the client.
* **🧩 Open Source:** Fully transparent architecture, welcoming community audits and contributions.

## 📸 Screenshots

*(Add screenshots of your application here to show off the interface!)*

> `<img src="docs/assets/screenshot-login.png" alt="Login Screen" width="400"/>`
> `<img src="docs/assets/screenshot-chat.png" alt="Chat Interface" width="400"/>`

---

## 🛠 Installation & Setup

### Prerequisites

Ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (version 18 or higher)
* npm (Node Package Manager)
* Git

### Build from Source

To get a development environment running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ByAldon/Unofficial-Fluxer-Client.git](https://github.com/ByAldon/Unofficial-Fluxer-Client.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Unofficial-Fluxer-Client
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

### Clean Installation Guide

When updating to a new major version of FluxCap, we highly recommend performing a clean installation. This prevents old cache files or outdated configurations from causing unexpected behavior.

We recommend using **Revo Uninstaller** to ensure all leftover registry items and hidden application data are completely removed.

1.  **Download:** Get [Revo Uninstaller Free](https://www.revouninstaller.com/products/revo-uninstaller-free/) and install it.
2.  **Uninstall:** Open Revo Uninstaller, select FluxCap, and click **Uninstall**.
3.  **Scan for Leftovers:** Use the "Moderate" or "Advanced" scan to find and safely remove remaining files and registry entries.
4.  **Install the New Update:** Once your system is clean, download and install the latest release.

For detailed instructions, please refer to our [Clean Installation Guide in the Wiki](https://github.com/ByAldon/Unofficial-Fluxer-Client/wiki/Clean-Installation-Guide) or the [Revo Uninstaller Support Page](https://www.revouninstaller.com/support/#howto).

---

## 💻 Usage

1. Launch the FluxCap application on your operating system.
2. On the welcome screen, enter the **Instance URL** of the server you wish to connect to (e.g., `https://fluxer.app`).
3. Enter your standard Fluxer **Username** and **Password**.
4. Click **Login**. You are now ready to chat, join communities, and use voice channels!

---

## 🗺 Roadmap

- [x] Basic authentication and node connection.
- [x] Real-time text messaging.
- [ ] Implement custom themes and CSS overrides.
- [ ] Add Voice over IP (VoIP) channel support.
- [ ] File sharing and media attachments.
- [ ] Multi-account management.

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! We love community input to make FluxCap better.

1. Fork the Project.
2. Create your Feature Branch: `git checkout -b feature/AmazingFeature`
3. Commit your Changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request.

Please make sure to update tests as appropriate.

---

## ⚠️ Disclaimer

**FluxCap is a third-party, independent project.** It is not affiliated with, endorsed by, sponsored by, or formally associated with the official Fluxer project or its development team. "Fluxer" is a trademark of its respective owners. 

If you encounter issues related to the core network or your account, please contact the official Fluxer support. For client-specific bugs, please use our issue tracker.

---

## 📄 License

This project is licensed under the **AGPLv3 License**. See the `LICENSE` file for more details.
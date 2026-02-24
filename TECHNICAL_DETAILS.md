# Technical Details & Transparency Report

This document provides a comprehensive overview of the architecture, security protocols, and maintenance logic implemented in the Unofficial Fluxer Client. Our mission is to provide a superior desktop experience for Fluxer while remaining 100% transparent about our code [cite: 2026-02-23].

## 🏗️ Core Architecture
The application is built using **Electron**, an open-source framework that allows us to wrap the official Fluxer web interface into a dedicated, high-performance desktop container.

### 1. Main Process (`main.js`)
The main process acts as the application's "brain" and security gatekeeper:
* **Navigation Hardening**: We use the **WHATWG URL API** to sanitize and validate every navigation request. This resolves security vulnerabilities found in legacy Node.js methods.
* **Domain Whitelisting**: The application strictly enforces a whitelist. Only `*.fluxer.app` domains are permitted to load internally. All external links are automatically pushed to the user's default system browser to prevent phishing [cite: 2026-02-23].
* **Process Sandboxing**: The renderer process is fully sandboxed, meaning the website has no direct access to the local file system or hardware [cite: 2026-02-23].
* **System Maintenance**: To ensure session stability, the app monitors system idle time. After 600 seconds (10 minutes) of inactivity, it performs an automated cache clear and page refresh [cite: 2026-02-22, 2026-02-23].

### 2. Preload Script (`preload.js`)
The preload script facilitates secure communication between the web content and the desktop app:
* **Context Isolation**: This script runs in a separate JavaScript context, ensuring the website's code cannot interfere with the application's internal functions [cite: 2026-02-23].
* **UI Injection**: It safely injects the "Network Issue" button. This button allows users to manually clear the cache and trigger a hard refresh if they encounter network resets (e.g., `net_error -101`).
* **IPC Communication**: We use Inter-Process Communication (IPC) to send requests from the UI to the main process without exposing sensitive Node.js APIs to the web environment [cite: 2026-02-23].

## 🔒 Security Hardening
* **`nodeIntegration: false`**: This is disabled to prevent the website from executing local system commands.
* **`sandbox: true`**: Provides an additional layer of protection by isolating the browser environment [cite: 2026-02-23].
* **Permission Blocker**: The app explicitly blocks unauthorized requests for camera, microphone, and location from non-whitelisted domains [cite: 2026-02-23].

## 📦 Smart Installer & "Clean Slate" Policy
We use the NSIS framework to manage the application lifecycle and respect user privacy:
* **Dual-Registry Detection**: The installer scans both `HKCU` (User) and `HKLM` (System) registers to find previous installations using the `UNINSTALL_APP_KEY`.
* **Forced Clean Update**: When a previous version is detected, the installer prompts for a "Clean Update." This silently executes the old uninstaller to remove legacy files before installing new ones, preventing file corruption and version conflicts [cite: 2026-02-23].
* **Total Purge**: Upon uninstallation, the app wipes all session data in `%AppData%\unofficial-fluxer-client` and local registry keys under `HKCU\Software\unofficial-fluxer-client` [cite: 2026-02-23].
* **OS Log Handling**: Please note that Windows-managed logs like 'Prefetch' and 'AppCompatFlags' are controlled by the operating system for optimization and may be visible in deep-cleaning tools like Revo Uninstaller [cite: 2026-02-23].

## 🛠️ Compliance
* **SemVer Standard**: The project strictly follows Semantic Versioning (Major.Minor.Patch) to ensure compatibility with modern build pipelines.
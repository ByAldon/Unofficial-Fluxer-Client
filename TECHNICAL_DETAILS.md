# Technical Details & Transparency Report

This document provides a detailed overview of the technical architecture, installation logic, and data handling of FluxCap.

## 📦 Installer Logic & Stability (v1.5.0)

- **Native Architecture**: The installer utilizes the NSIS (Nullsoft Scriptable Install System) engine via Electron-Builder to ensure maximum compatibility with the Windows operating system.
- **Clean Update Path**: To ensure stability, the installer is configured to perform a clean update when a previous version is detected, preventing version conflicts and stale cache issues.
- **Silent UI Policy**: All informational and update-related dialog boxes are configured with `type: 'none'` to bypass the default Windows system sounds, providing a silent user experience.

## 🎨 UI & User Experience Enhancements

- **Discord-Style Tray Interaction**: A new event listener has been added to the tray icon (`tray.on('click')`) to allow users to instantly show the application via a simple left-click, mimicking native chat application behavior.
- **Smart Refresh Integration**: A custom "Hard Refresh" button is injected via `preload.js`, communicating with the main process through Electron's `ipcMain/ipcRenderer` to trigger a full cache purge and reload.
- **Anti-Overlap Positioning**: The UI elements are positioned at `bottom: 20px` and `right: 20px` to avoid interference with native Fluxer web notifications and navigation elements.
- **External Link Handling**: A security layer monitors `will-navigate` events. Any request to a non-Fluxer domain is intercepted and redirected to the system's default web browser for security.

## 🧼 Residual File Policy & System Integrity

- **Aggressive Data Purge**: Upon uninstallation, the application is programmed to remove all user-specific site data, local storage, and cached files located in `%AppData%\fluxcap`.
- **System-Managed Files**: Users may notice residual entries in advanced tools like Revo Uninstaller:
    - **AppCompatFlags**: These registry keys are created and managed by the Windows OS for compatibility tracking and are not under the app's direct control.
    - **Prefetch (.pf) Files**: These are Windows-generated optimization files used to speed up application launch times.
    - **System Integrity**: This application does not attempt to modify these OS-level files to ensure the overall stability of the host Windows environment.

## 🔄 Update Mechanism

- **GitHub API Integration**: The client performs a secure, asynchronous check against the GitHub Releases API on startup.
- **Manual Verification**: Users can trigger a manual update check through the 'About' menu, which provides a direct link to the latest assets on the official repository.

---
*Technical Transparency Report - FluxCap Project*
# Technical Details & Transparency Report (v1.4.9)

This document provides a detailed overview of the technical architecture and data handling of FluxCap [cite: 2026-02-22].

## 📦 Installer Logic & Stability

- **Native Architecture**: The installer utilizes the NSIS (Nullsoft Scriptable Install System) engine via Electron-Builder [cite: 2026-02-22].
- **Clean Update Path**: Configured to perform a clean update when a previous version is detected [cite: 2026-02-22].
- **Silent UI Policy**: Dialog boxes are configured with `type: 'none'` to bypass default Windows system sounds [cite: 2026-02-22].

## 🎨 UI & User Experience Enhancements

- **Smart Refresh Integration**: A custom "Hard Refresh" button is injected via `preload.js` [cite: 2026-02-22].
- **Crash Mitigation**: Version 1.4.9 includes a hardened `ipcMain` handler for the server stability notice to prevent application crashes [cite: 2026-02-22].
- **External Link Handling**: A security layer monitors `will-navigate` events and redirects non-Fluxer domains to the default browser [cite: 2026-02-22].

## 🧼 Residual File Policy & System Integrity

- **AppData Isolation**: Application data is stored in `%AppData%\fluxcap` [cite: 2026-02-22].
- **System Integrity**: This application does not attempt to modify OS-level files like `AppCompatFlags` or `Prefetch` files [cite: 2026-02-22].

---
*Technical Transparency Report - FluxCap Project [cite: 2026-02-22]*
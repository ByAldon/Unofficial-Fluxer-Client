# Technical Details & Transparency Report (v1.4.8)

## 📦 Installer & Stability
- [cite_start]**NSIS Engine**: Utilizes the NSIS engine via electron-builder for native Windows compatibility. [cite: 2, 3]
- [cite_start]**Namespace Migration**: All system paths have been migrated to the `fluxcap` namespace to ensure a clean separation from legacy builds. 

## 🎨 User Experience
- [cite_start]**Smart Refresh**: A custom "Hard Refresh" logic is integrated to allow full cache purges without restarting. [cite: 2, 3]
- [cite_start]**Silent UI**: Update dialogs use `type: 'none'` to respect Windows focus assist settings. [cite: 2, 3]

## 🧼 System Integrity
- [cite_start]**AppData Purge**: Uninstallation removes data from `%AppData%\fluxcap`. [cite: 2, 3]
- [cite_start]**OS-Managed Files**: Does not interfere with Windows-generated files like `AppCompatFlags` or `Prefetch` to maintain system stability. [cite: 2, 3]
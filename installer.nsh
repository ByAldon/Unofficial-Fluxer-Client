!macro customHeader
  !define MUI_LICENSEPAGE_CHECKBOX
!macroend

!macro customUnInstall
  RMDir /r "$APPDATA\fluxcap"
  RMDir /r "$LOCALAPPDATA\fluxcap-updater"
  DeleteRegKey HKCU "Software\fluxcap"
!macroend
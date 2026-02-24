!macro customHeader
  !define MUI_LICENSEPAGE_CHECKBOX
!macroend

!macro customUnInstall
  RMDir /r "$APPDATA\unofficial-fluxer-client"
  RMDir /r "$LOCALAPPDATA\unofficial-fluxer-client-updater"
  DeleteRegKey HKCU "Software\unofficial-fluxer-client"
!macroend
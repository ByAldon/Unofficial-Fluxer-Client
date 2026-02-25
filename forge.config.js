module.exports = {
  packagerConfig: {
    asar: true,
    icon: './icon',
    name: "FluxCap"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'fluxcap',
        authors: 'Aldon',
        description: 'An unofficial client for Fluxer'
      },
    }
  ],
};
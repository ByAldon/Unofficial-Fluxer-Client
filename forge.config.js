module.exports = {
  packagerConfig: {
    asar: true,
    icon: './icon',
    name: "Unofficial Fluxer Client"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'unofficial_fluxer_client',
        authors: 'Timothy',
        description: 'Unofficial Fluxer Client'
      },
    }
  ],
};
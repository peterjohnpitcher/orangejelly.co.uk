import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '9brdfanc',
    dataset: 'production'
  },
  studioHost: 'orangejelly' // This will create orangejelly.sanity.studio
});
module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'test', release: 'patch' },
          { type: 'chore', release: 'patch' }
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        }
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        writerOpts: {
          groupBy: 'type',
          commitGroupsSort: 'title',
          commitsSort: 'header',
          types: [
            { type: 'feat', section: '✨ Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'docs', section: '📚 Documentation' },
            { type: 'style', section: '💄 Style' },
            { type: 'refactor', section: '♻️ Refactor' },
            { type: 'perf', section: '⚡ Performance' },
            { type: 'test', section: '✅ Tests' },
            { type: 'chore', section: '🔧 Chores' }
          ]
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog\n\nAll notable changes to the Future of Work Encyclopedia project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).'
      }
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        successComment: false,
        failTitle: false,
        releasedLabels: false,
        assets: [
          {
            path: 'RELEASE_NOTES_*.md',
            label: 'Release Notes'
          }
        ]
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};

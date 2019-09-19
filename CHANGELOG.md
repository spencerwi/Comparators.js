# Changelog
All notable changes to this project will be documented in this file (starting from version 3.0.0)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.2] - 2019-09-19
### Added
 - Tests that exercise typescript usage (via `mocha-typescript`, see `test/typescript-definition-file.spec.ts`)
### Changed
 - Upgraded a dep or two by minor version based on security scans

## [3.0.1] - 2019-09-18
### Changed
 - Fixed some things in README and updated some deps

## [3.0.0] - 2019-05-16
### Added
 - Multiple output formats, since Webpack and other modern loaders don't like 
 my old version of typescript's UMD output (complaining about require used in
 a non-staticly-analyzable way). There are now two output files:
   - `dist/commonjs/comparators.js`, which is commonjs output usable by webpack/rollup/etc
   - `dist/umd/comparators.js`, which is a UMD format usable by pretty much 
   everything, including the browser  

 - Tests to exercise in-browser usage (via `mocha-chrome`)
 - A `package-lock.json` file

### Changed
 - Output paths; please reference either `dist/commonjs/comparators.js` or 
 `dist/umd/comparators.js` now instead of just `dist/comparator.js`


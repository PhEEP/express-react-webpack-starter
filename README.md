# Philippe's File Explorer

A sample project intended to show a bit about how I think when approaching technical problems.

## Features

- Navigate a file system
- Add/Remove items from the file system
- Expand/collapse folders

## Thoughts and improvements

Next steps for me would be to migrate some of the state management to a global store to support a few of the extensions. By keeping a list of selected items I could support multi-select with bulk actions, a separate view with file details and weather info, as well as cleaning up the `FileExplorer.tsx` component by separating concerns.
I would also want a more complete suite of unit tests. I've included one for some basic interaction. I had some difficulty setting it up as I'm not used to such a bare project, so I learned an awful lot getting the environment to a place where the tests would run.
The icons should be more accessible svgs. In general I would like to build more accessibility into the project.

## Outstanding bugs

Capital letters as file names break the `FileIcons` component. It should error or coerce the extension.
When all directories are deleted there's no way to reinstantiate the tree. Either should reveal the demo button or disallow deletion of `root`.
Multi-select happens accidentally because an item is not deselected on clicking anything else. Move selection state to global store to make this clearer.

## Dependencies

- Install `node`
  - Use NVM (https://github.com/nvm-sh/nvm): `nvm install lts/dubnium && nvm use lts/dubnium`
  - Alternatively you can download and install it manually: https://nodejs.org/en/download/
- Install `yarn ^1.10.1`
  - Use brew (https://brew.sh/): `brew install yarn`
  - Alternatively you can download and install it manually: https://classic.yarnpkg.com/en/docs/install

## Development

- Download and install VSCode: https://code.visualstudio.com/
- Read the setup guide https://code.visualstudio.com/docs/setup/setup-overview
  - Launching VSCode from the command line: Open the Command Palette (F1) and type `shell command` to find the `Shell Command: Install 'code' command in PATH command`
    - After doing this you can start VSCode on a repo with `code .`
- Install TSLint extension in VSCode https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
- In order to run the debugger for backend/tests put a breakpoint in VSCode and run this command in VSCode (`CMD + SHIFT + P`): `Debug: attach node to process`. You can also enable `Debug: Toggle Auto Attach` to start the debugger every time a node process is started from VSCode terminal.
- To open a terminal in VSCode: `` CTRL + `  ``

## Usage

- Install dependencies: `yarn install`
- Build application (both frontend and backend in http://localhost:8080): `yarn build`
  - Some browser automatically redirects you to `https` so make sure to disable the automatic redirect
- Watch for changes and build application: `yarn build-watch`
- Build frontend, watch for changes and hot reload (port 8000): `yarn build-hot-reload`
  - All the backend requests will be forwarded to port 8080 so you need to run the backend
- Run application (port 8080): `yarn start`
- Run tests: `yarn test`
- Remove all the generated files: `yarn clean`

## Useful links

- Typescript guide: https://basarat.gitbook.io/typescript/
- VSCode custom settings: https://github.com/gianluca-venturini/env_confs/tree/master/vs_codet

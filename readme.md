<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/trumio/trumio-web-react">
    <img src="./docs/assets/named-logo.png" alt="Logo" height="40">
  </a>

<h3 align="center">
  Web Application
</h3>

![GitHub Actions - Built & Pretty](https://img.shields.io/github/actions/workflow/status/trumio/trumio-web-react/verify-pr.yml?label=Built%20%26%20Pretty)
![GitHub package.json version](https://img.shields.io/github/package-json/v/trumio/trumio-web-react)

  <p align="center">
    A web application built for Trumio Incorporation.
    <br />
    <a href="https://github.com/trumio/trumio-web-react"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/trumio/trumio-web-react">View Demo</a>
    ·
    <a href="https://github.com/trumio/trumio-web-react/issues">Report Bug</a>
    ·
    <a href="https://github.com/trumio/trumio-web-react/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is a monorepo that contains the code for the Trumio Web Applications - both the OneOff and Flexternships applications.

If you are new to this project, please refer to our [contributing guidelines](https://github.com/trumio/trumio-web-react/blob/tru-dev/CONTRIBUTING.md) for more information. For quick start, please refer to the [Getting Started](#getting-started) section.

### Built With

<!-- [![Next][Next.js]][Next-url] -->

[![React][React.js]][React-url]
[![Vite][Vite.js]][Vite-url]
[![TypeScript][TypeScript.js]][TypeScript-url]
[![Zustand][Zustand.js]][Zustand-url]
[![Tailwind][Tailwind.js]][Tailwind-url]
[![Redux][Redux.js]][Redux-url]

<!-- GETTING STARTED -->

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/trumio/trumio-web-react.git
   ```
2. Navigate to the project directory
   ```sh
   cd trumio-web-react
   ```
3. Install the required npm packages - prefer yarn over npm
   ```sh
   yarn install
   ```
4. Start the development server
   ```sh
   yarn start
   ```
   You can use `yarn start:trudev` to start the application with tru-dev mode.

For additional scripts, refer to the `package.json` file.

<!-- USAGE EXAMPLES -->
<!--
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what made this project possible. Any contributions you make are **greatly appreciated**.

If you want to resolve an issue on Jira, please assign it to yourself and follow the steps below:

1. Install the project as per the [Getting Started](#getting-started) section
2. Create a new branch from `trudev` branch (`git checkout -b {issue-type}/{jira-issue-key}-title-in-kebab-case`)
3. Make your changes and commit them (`git commit -m 'Add some AmazingFeature'`)
4. Push to the remote branch (`git push origin {issue-type}/{jira-issue-key}-title-in-kebab-case`)
5. Open a Pull Request to the `trudev` branch via [PRs tab](https://github.com/trumio/trumio-web-react/pulls)

Example branch name: `feature/TRU-1234-add-comments-dashboard`

See the [TRU board](https://trumio-team.atlassian.net/jira/software/c/projects/TRU/boards/2) on [Jira](https://trumio-team.atlassian.net) for a full list of proposed features (and known issues).

## Code Structure

Here comes the tricky part of this project - the codebase is a mix of two applications - OneOff and Flexternships.

### OneOff App

> [!CAUTION]
>
> ### Deprecated
>
> OneOff App Code in this project was the base for building flexternships' pages and components at the end of 2024, it is now in long-term stasis and will be removed soon. We recommend that you add all your code inside the `src/flexternships` directory.
>
> If you are modifying any component from the OneOff App, you can still continue to do so, but please do not add any new components to the OneOff App - instead, add them to the `src/flexternships` directory with the appropriate conventions.

### Flexternships App

This is the new app that is being built. It is located in the `src/flexternships` directory. This application holds high significance. It's carefully built considering scalability, performance, and maintainability.

<!-- LICENSE -->

## License

This is a proprietary project. All rights reserved. Please contact your administrator for access to the project.

<!-- CONTACT -->

## Contact

Trumio Inc. - support@trumio.ai

Project Link: [https://github.com/trumio/trumio-web-react](https://github.com/trumio/trumio-web-react)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Shields.io](https://shields.io/)
- [Ack 1](https://example.com)
- [Ack 1](https://example.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/trumio/trumio-web-react.svg?style=for-the-badge
[contributors-url]: https://github.com/trumio/trumio-web-react/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/trumio/trumio-web-react.svg?style=for-the-badge
[forks-url]: https://github.com/trumio/trumio-web-react/network/members
[stars-shield]: https://img.shields.io/github/stars/trumio/trumio-web-react.svg?style=for-the-badge
[stars-url]: https://github.com/trumio/trumio-web-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/trumio/trumio-web-react.svg?style=for-the-badge
[issues-url]: https://github.com/trumio/trumio-web-react/issues
[license-shield]: https://img.shields.io/github/license/trumio/trumio-web-react.svg?style=for-the-badge
[license-url]: https://github.com/trumio/trumio-web-react/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/trumio-inc
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TypeScript.js]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Zustand.js]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white
[Zustand-url]: https://zustand-demo.pmnd.rs/
[Tailwind.js]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Redux.js]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/

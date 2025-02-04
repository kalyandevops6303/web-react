<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/trumio/trumio-web-react">
    <img src="./assets/named-logo.png" alt="Logo" height="40">
  </a>

  <h3>Web Application</h3>

[![Built & Pretty](https://github.com/trumio/trumio-web-react/actions/workflows/verify-pr.yml/badge.svg?branch=tru-dev)](https://github.com/trumio/trumio-web-react/actions/workflows/verify-pr.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/trumio/trumio-web-react/blob/tru-dev/CONTRIBUTING.md)

  <p>
    A web application built for Trumio Incorporation.
  </p>

[**Explore the docs »**](https://github.com/trumio/trumio-web-react)

[View Demo](https://github.com/trumio/trumio-web-react) •
[Report Bug](https://github.com/trumio/trumio-web-react/issues) •
[Request Feature](https://github.com/trumio/trumio-web-react/issues)

</div>

---

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This monorepo contains the code for Trumio Web Applications - both OneOff and Flexternships applications.

New to this project? Check our [contributing guidelines](https://github.com/trumio/trumio-web-react/blob/tru-dev/CONTRIBUTING.md) or jump to [Getting Started](#getting-started).

### Tech Stack

[![React][React.js]][React-url]
[![Vite][Vite.js]][Vite-url]
[![TypeScript][TypeScript.js]][TypeScript-url]
[![Zustand][Zustand.js]][Zustand-url]
[![Tailwind][Tailwind.js]][Tailwind-url]
[![Redux][Redux.js]][Redux-url]

## Getting Started

### Prerequisites

- Node.js with npm (latest version recommended)
  ```bash
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/trumio/trumio-web-react.git
   ```

2. Navigate to project directory

   ```bash
   cd trumio-web-react
   ```

3. Install dependencies (yarn preferred)

   ```bash
   yarn install
   ```

4. Start development server
   ```bash
   yarn start
   # Or for tru-dev mode:
   yarn start:trudev
   ```

> **Note**: See `package.json` for additional scripts

## Contributing

We welcome contributions! Here's how you can help:

1. Install project ([Getting Started](#getting-started))
2. Create feature branch from `trudev`:
   ```bash
   git checkout -b {issue-type}/{jira-issue-key}-title-in-kebab-case
   ```
3. Make changes and commit:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push branch:
   ```bash
   git push origin {issue-type}/{jira-issue-key}-title-in-kebab-case
   ```
5. Open PR to `trudev` via [PRs tab](https://github.com/trumio/trumio-web-react/pulls)

Example branch: `feature/TRU-1234-add-comments-dashboard`

See [TRU board](https://trumio-team.atlassian.net/jira/software/c/projects/TRU/boards/2) for feature requests and issues.

## Project Structure

The codebase contains two applications:

### OneOff App

> [!CAUTION]
>
> #### Deprecated
>
> The OneOff App code served as foundation for Flexternships pages/components (late 2024). It's now in stasis and pending removal. Please add new code to `src/flexternships/`.
>
> Modifications to existing OneOff components are permitted, but new components should follow Flexternships conventions.

### Flexternships App

Located in `src/flexternships/`, this is our primary focus. Built with emphasis on:

- Scalability
- Performance
- Maintainability

## License

Proprietary. All rights reserved. Contact administrator for access.

## Contact

Trumio Inc. - support@trumio.ai

[Project Repository](https://github.com/trumio/trumio-web-react)

## Acknowledgments

- [GitHub Actions](https://github.com/features/actions)
- [Jenkins](https://jenkins.io/)

<!-- Badge Definitions -->

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
[product-screenshot]: ./assets/product-screenshot-sign-in.png
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

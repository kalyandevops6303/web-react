# Contributing to Trumio Web Application

We're excited that you're interested in contributing to Trumio! This document provides guidelines and instructions for contributing to our React/TypeScript application.

## Code Style Guidelines

We follow established coding standards to maintain consistency across the codebase:

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-and-dont.html)

### Key Style Points

- Use TypeScript for type safety
- Follow React functional component patterns
- Use ES6+ features appropriately
- Maintain consistent naming conventions
- Write clear, self-documenting code
- Include JSDoc comments for complex functions

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/trumio/trumio-web-react.git
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/TRU-XXX-description
   ```

## Development Workflow

1. Write clean, maintainable code
2. Add appropriate tests
3. Ensure all tests pass:
   ```bash
   yarn test
   ```
4. Run linting:
   ```bash
   yarn lint
   ```
5. Format code:
   ```bash
   yarn format
   ```

## Pull Request Process

1. Update documentation if needed
2. Follow PR template guidelines
3. Ensure CI checks pass
4. Request review from maintainers
5. Address review feedback

## Technology Stack

- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State Management:** Zustand/Redux
- **Testing:** Jest + React Testing Library

## Best Practices

### React

- Use functional components
- Implement proper prop types
- Follow component composition patterns
- Maintain single responsibility principle

### TypeScript

- Define clear interfaces
- Use strict type checking
- Avoid `any` type when possible
- Leverage generics appropriately

### Tailwind CSS

- Follow utility-first approach
- Use consistent spacing scale
- Maintain responsive design patterns
- Extract components for reusability

### Testing

- Write unit tests for components
- Include integration tests
- Maintain good test coverage
- Follow testing best practices

## Need Help?

- Check existing issues and PRs
- Join our development discussions
- Contact maintainers
- Review documentation

## Code of Conduct

Please note that this project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the project's license.

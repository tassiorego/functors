
![Functors banner - the functors mascot generated by dall-e 2](https://raw.githubusercontent.com/ortense/functors/main/media/mascot.jpg)

# @ortense/functors

[![install size](https://packagephobia.com/badge?p=@ortense/functors)](https://packagephobia.com/result?p=@ortense/functors) [![Coverage Status](https://coveralls.io/repos/github/ortense/mediator/badge.svg?branch=github-actions)](https://coveralls.io/github/ortense/functors?branch=github-actions)

A collection of dependency-free functors written in TypeScript, created to be type-safe, immutable, and lightweight.

## What is a Functor?

In functional programming, a functor is a concept that represents a type with the ability to be mapped over. This means that you can apply a function to the values inside the type, without altering the structure of the type itself. Functors provide a powerful abstraction for building composable and reusable code, promoting a declarative and functional style of programming.

![functor chart - made in excalidraw.com](https://raw.githubusercontent.com/ortense/functors/main/media/flow.png)

## Overview

This project is a TypeScript library that embraces the functor concept, offering implementations of common functors. These functors provide useful abstractions for various scenarios in your application, allowing you to write more expressive and maintainable code.

## Install

Pick your favorite package manager.

```sh
npm install @ortense/functors  # npm
yarn add  @ortense/functors    # yarn
pnpm add @ortense/functors     # pnpm
bun add @ortense/functors      # bun
```

## Implemented Functors

For detailed documentation, please refer to the [official documentation](https://ortense.github.io/functors).

### Lazy

Represents a lazy-evaluated value, allowing computations to be deferred until needed.

```ts
import { lazy } from '@ortense/functors'

const double = (value: number) => {
  console.log('Doubling...')
  return value * 2
}
const lazyDouble = lazy(() => 7)
  .map(double)
  .map(double)

const result = lazyDouble.evaluate()
console.log(result)
// Output:
// Doubling...
// Doubling...
// 42
```

### History

Represents a history of values, enabling operations like mapping, resetting, and rolling back to previous states.

```ts
import { history } from '@ortense/functors'

const userHistory = history({ name: 'Jane Doe' })
  .map(user => ({ ...user, id: 1 }))
  .map(({ id }) => ({ id, name: 'Jonh Due' }))

console.log(userHistory.current()) // { id: 1, name: 'Jonh Due' }
console.log(userHistory.rollback().current()) // { id: 1, name: 'Jane Doe' }
console.log(userHistory.reset().current()) // {  name: 'Jane Doe' }
```

### Either

Represents a type that can be either of type L or R, providing a mechanism for branching based on success or failure.

```ts
import { Either, left, right } from '@ortense/functors'

const divide = (
  numerator: number,
  denominator: number,
): Either<Error, number> => {
  if (Number.isNaN(numerator)) {
    return left(new Error('Numerator is not a number.'))
  }
  if (Number.isNaN(denominator)) {
    return left(new Error('Denominator is not a number.'))
  }

  if (denominator === 0) {
    return left(new Error('Division by zero is not posible.'))
  }

  return right(numerator / denominator)
}

const numerator = Number(document.querySelector('input#numerator').value)
const denominator = Number(document.querySelector('input#denominator').value)
const display = document.querySelector('div#display-result')

divide(numerator, denominator)
  .right(result => {
    display.textContent = `${numerator} / ${denominator} = ${result}`
  })
  .left(error => {
    display.textContent = error.message
  })
```

### Maybe

Represents a type that may contain a value or be empty, helping to handle null or undefined values.

```ts
import { Maybe, maybe } from '@ortense/functors'

type User = { id: string; name: string }

const findUserById = async (id: string): Maybe<User> => {
  const user = await db.users.findByID(id) // suppose that return user or null
  return maybe<User>(user)
};

const userName = findUserById('123')
  .map(user => user.name) // Maybe<string>
  .mapEmpty(() => 'Default Name')
  .unwrap()

console.log(userName) // Output: Default Name (if user not found)
```

## Contribution

Contributions are welcome! Feel free to open issues, submit pull requests, or provide feedback to help improve this library.

## License

This library is licensed under the MIT License - see the [LICENSE](https://github.com/ortense/functors/blob/main/LICENSE) file for details.

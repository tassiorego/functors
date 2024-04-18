export interface Result<F, S> {
  failure<T>(fn: (value: F) => T): Result<T, S>;

  success<T>(fn: (value: S) => T): Result<F, T>;

  isFailure(): boolean;

  isSuccess(): boolean;

  value(): F | S;
}

export class Failure<F, S> implements Result<F, S> {
  private constructor(private val: F) {}

  static create<F, S>(value: F): Result<F, S> {
    return new Failure<F, S>(value);
  }

  failure<T>(fn: (value: F) => T): Result<T, S> {
    return new Failure<T, S>(fn(this.val));
  }

  success<T>(fn: (value: S) => T): Result<F, T> {
    return this as unknown as Result<F, ReturnType<typeof fn>>;
  }

  isFailure(): boolean {
    return true;
  }

  isSuccess(): boolean {
    return false;
  }
  value(): F | S {
    return this.val;
  }
}

export class Success<F, S> implements Result<F, S> {
  private constructor(private val: S) {}

  static create<F, S>(value: S): Result<F, S> {
    return new Success<F, S>(value);
  }

  failure<T>(fn: (value: F) => T): Result<T, S> {
    return this as unknown as Result<ReturnType<typeof fn>, S>;
  }

  success<T>(fn: (value: S) => T): Result<F, T> {
    return new Success(fn(this.val));
  }

  isFailure(): boolean {
    return false;
  }

  isSuccess(): boolean {
    return true;
  }

  value(): F | S {
    return this.val;
  }
}

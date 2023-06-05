class UserExistError {
  constructor(message) {
    this.status = 409;
    this.message = message;
  }
}
class UsernameAlreadyExistError {
  constructor(message) {
    this.status = 403;
    this.message = message;
  }
}

class UserNotFoundError {
  constructor(message) {
    this.status = 404;
    this.message = message;
  }
}

class TodoNotFoundError {
  constructor(message) {
    this.status = 404;
    this.message = message;
  }
}
class NotFoundError {
  constructor(message) {
    this.status = 404;
    this.message = message;
  }
}

module.exports = {
  UserExistError,
  UserNotFoundError,
  UsernameAlreadyExistError,
  TodoNotFoundError,
  NotFoundError,
};

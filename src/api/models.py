"""
Lightweight in-memory replacement for models to make the exercise runnable
without requiring a full SQLAlchemy setup in the codespace.

This provides a `db` object with a `session` that supports `add`/`commit`, and
a `User` class with a `query`-style compatibility layer used by the routes.
"""

from typing import List, Optional


class DummySession:
    def add(self, obj):
        # on add, append to the in-memory list if it's a User
        if isinstance(obj, User):
            User._users.append(obj)

    def commit(self):
        # no-op for in-memory
        pass


class DummyDB:
    def __init__(self):
        self.session = DummySession()

    def init_app(self, app):
        # compatibility shim
        return None


class _QueryResult:
    def __init__(self, items: List["User"]):
        self._items = items

    def first(self) -> Optional["User"]:
        return self._items[0] if self._items else None


class _Query:
    def __init__(self, users_ref: List["User"]):
        self._users_ref = users_ref

    def filter_by(self, **kwargs) -> _QueryResult:
        results = []
        for u in self._users_ref:
            ok = True
            for k, v in kwargs.items():
                if not hasattr(u, k) or getattr(u, k) != v:
                    ok = False
                    break
            if ok:
                results.append(u)
        return _QueryResult(results)

    def get(self, id_value: int) -> Optional["User"]:
        for u in self._users_ref:
            if getattr(u, "id", None) == id_value:
                return u
        return None


db = DummyDB()


class User:
    _users: List["User"] = []

    def __init__(self, email: str, password: str):
        self.id = len(User._users) + 1
        self.email = email
        self.password = password
        self.is_active = True

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


# query compatibility object (holds reference to the list so it's always up-to-date)
query = _Query(User._users)
# allow `User.query.filter_by(...).first()` usage
User.query = query

from slowapi import Limiter
from slowapi.util import get_remote_address

# Shared rate limiter instance, imported by main.py (to attach to the app)
# and by individual routers (to decorate specific endpoints).
limiter = Limiter(key_func=get_remote_address)
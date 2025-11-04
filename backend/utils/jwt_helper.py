import jwt
from ..config import settings

def create_token(data: dict):
    return jwt.encode(data, settings.secret_key, algorithm='HS256')

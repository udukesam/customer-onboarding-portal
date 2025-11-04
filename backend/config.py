from pydantic import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./onboarding.db"
    secret_key: str = "verysecret"

    class Config:
        env_file = ".env"

settings = Settings()

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "development"  # set to "production" on the deployed server

    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db_name: str = "hospital_db"

    # No insecure fallback: in production this must come from .env / CI secrets.
    # In development, an insecure default is used only if unset, with a loud warning.
    jwt_secret_key: str = ""
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440

    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    allow_seed_endpoint: bool = False  # never true in production

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()

if not settings.jwt_secret_key:
    if settings.environment == "production":
        raise RuntimeError(
            "JWT_SECRET_KEY must be set in production. "
            "Generate one with: python -c \"import secrets; print(secrets.token_hex(32))\" "
            "and put it in your .env / CI secrets."
        )
    import warnings

    warnings.warn(
        "JWT_SECRET_KEY is not set — using an insecure development-only default. "
        "This is fine for local dev, but never deploy without setting a real secret.",
        stacklevel=1,
    )
    settings.jwt_secret_key = "dev-secret-change-me"

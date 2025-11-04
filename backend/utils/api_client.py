import requests

class APIClient:
    def __init__(self, base_url: str):
        self.base = base_url

    def get(self, path: str, **kwargs):
        return requests.get(f"{self.base}{path}", **kwargs)

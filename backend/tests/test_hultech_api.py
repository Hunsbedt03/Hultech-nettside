"""Backend tests for Hultech API"""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://industrial-solutions-50.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health & root
def test_root_ok(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert data.get("service") == "Hultech API"


def test_health_email_disabled(api):
    r = api.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "healthy"
    assert data.get("email_configured") is False
    assert "timestamp" in data


# Contact create
def test_contact_post_minimum(api):
    payload = {
        "name": "TEST_Ola Nordmann",
        "company": "TEST_Hul AS",
        "message": "TEST_Vi trenger CE-merking.",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and len(data["id"]) > 0
    assert data["email_sent"] is False
    assert data["email_configured"] is False
    assert data["name"] == payload["name"]
    assert data["company"] == payload["company"]
    assert data["message"] == payload["message"]
    assert "_id" not in data
    pytest.created_id = data["id"]


def test_contact_post_with_valid_email(api):
    payload = {
        "name": "TEST_Kari",
        "company": "",
        "email": "kari@example.no",
        "message": "TEST_test melding",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["email"] == "kari@example.no"
    assert data["email_sent"] is False


def test_contact_post_invalid_email(api):
    payload = {
        "name": "TEST_X",
        "email": "not-an-email",
        "message": "TEST_msg",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422


def test_contact_post_missing_name(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"message": "TEST_no name"})
    assert r.status_code == 422


def test_contact_post_missing_message(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"name": "TEST_only name"})
    assert r.status_code == 422


def test_contact_post_empty_strings(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"name": "", "message": ""})
    assert r.status_code == 422


# Contact list
def test_contact_list(api):
    r = api.get(f"{BASE_URL}/api/contact")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    if data:
        first = data[0]
        assert "_id" not in first
        assert "id" in first and "name" in first and "message" in first
        # verify desc sort
        ts = [item["created_at"] for item in data]
        assert ts == sorted(ts, reverse=True)

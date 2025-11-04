from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Optional
import uuid
import os

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)

# In-memory store (you can replace this later with a DB)
CUSTOMERS_DB = {}

UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)


class Customer(BaseModel):
    customer_id: str
    name: str
    email: str
    phone: Optional[str] = None
    kyc_uploaded: bool = False
    approved: bool = False


@router.post("/register", response_model=Customer)
async def register_customer(
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None)
):
    """Registers a new customer and stores the basic profile."""
    customer_id = str(uuid.uuid4())
    if any(c.email == email for c in CUSTOMERS_DB.values()):
        raise HTTPException(status_code=400, detail="Email already registered")

    customer = Customer(
        customer_id=customer_id,
        name=name,
        email=email,
        phone=phone
    )
    CUSTOMERS_DB[customer_id] = customer
    return customer


@router.post("/{customer_id}/upload_kyc")
async def upload_kyc(customer_id: str, file: UploadFile = File(...)):
    """Uploads the KYC document for a specific customer."""
    if customer_id not in CUSTOMERS_DB:
        raise HTTPException(status_code=404, detail="Customer not found")

    file_path = os.path.join(UPLOADS_DIR, f"{customer_id}_{file.filename}")
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    CUSTOMERS_DB[customer_id].kyc_uploaded = True
    return {"message": "KYC uploaded successfully", "file_path": file_path}


@router.get("/", response_model=List[Customer])
async def list_customers():
    """Returns a list of all registered customers."""
    return list(CUSTOMERS_DB.values())


@router.get("/{customer_id}", response_model=Customer)
async def get_customer(customer_id: str):
    """Fetches details of a single customer by ID."""
    if customer_id not in CUSTOMERS_DB:
        raise HTTPException(status_code=404, detail="Customer not found")
    return CUSTOMERS_DB[customer_id]


@router.put("/{customer_id}/approve")
async def approve_customer(customer_id: str):
    """Marks a customer as approved (admin-only flow)."""
    if customer_id not in CUSTOMERS_DB:
        raise HTTPException(status_code=404, detail="Customer not found")

    customer = CUSTOMERS_DB[customer_id]
    if not customer.kyc_uploaded:
        raise HTTPException(status_code=400, detail="Cannot approve before KYC upload")

    customer.approved = True
    return {"message": f"Customer {customer.name} approved successfully"}


@router.delete("/{customer_id}")
async def delete_customer(customer_id: str):
    """Deletes a customer record (for testing/demo purposes)."""
    if customer_id not in CUSTOMERS_DB:
        raise HTTPException(status_code=404, detail="Customer not found")

    del CUSTOMERS_DB[customer_id]
    return {"message": "Customer deleted successfully"}

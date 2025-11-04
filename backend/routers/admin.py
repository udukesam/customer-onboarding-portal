from fastapi import APIRouter, HTTPException
from backend.services import approval_service

router = APIRouter(
    prefix="/admin",
    tags=["Admin Approval"],
)


@router.get("/pending")
async def get_pending_customers():
    """Fetch customers whose KYC is uploaded but not yet approved."""
    return approval_service.get_pending_customers()


@router.put("/approve/{customer_id}")
async def approve_customer(customer_id: str):
    """Approve a customer based on customer ID."""
    success = approval_service.approve_customer(customer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Customer not found or invalid state")
    return {"message": f"Customer {customer_id} approved successfully"}


@router.put("/reject/{customer_id}")
async def reject_customer(customer_id: str):
    """Reject a customer and mark as not approved."""
    success = approval_service.reject_customer(customer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Customer not found or invalid state")
    return {"message": f"Customer {customer_id} rejected successfully"}

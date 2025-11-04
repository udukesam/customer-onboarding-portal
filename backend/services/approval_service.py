from backend.routers.customers import CUSTOMERS_DB

def get_pending_customers():
    """Return all customers with KYC uploaded but not yet approved."""
    return [
        customer for customer in CUSTOMERS_DB.values()
        if customer.kyc_uploaded and not customer.approved
    ]


def approve_customer(customer_id: str) -> bool:
    """Mark a customer as approved."""
    if customer_id not in CUSTOMERS_DB:
        return False

    customer = CUSTOMERS_DB[customer_id]
    if not customer.kyc_uploaded:
        return False

    customer.approved = True
    return True


def reject_customer(customer_id: str) -> bool:
    """Reject a customer by marking them unapproved (could extend to status tracking)."""
    if customer_id not in CUSTOMERS_DB:
        return False

    customer = CUSTOMERS_DB[customer_id]
    customer.approved = False
    return True

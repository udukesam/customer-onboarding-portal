from fastapi import APIRouter, HTTPException
from backend.services import email_service

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.post("/send")
async def send_notification(email: str, subject: str, message: str):
    """
    Trigger an email notification to a given recipient.
    This endpoint allows frontend or other backend services to request a mail delivery.
    """
    try:
        success = email_service.send_email(email=email, subject=subject, message=message)
        if success:
            return {"status": "success", "detail": f"Email sent to {email}"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/test/{email}")
async def test_notification(email: str):
    """
    Test endpoint to verify email delivery setup.
    Sends a sample test mail to the provided address.
    """
    subject = "Test Notification from Customer Onboarding Portal"
    message = (
        "This is a test email confirming that the notification service is working correctly."
    )
    try:
        success = email_service.send_email(email=email, subject=subject, message=message)
        if success:
            return {"status": "success", "detail": f"Test email sent to {email}"}
        else:
            raise HTTPException(status_code=500, detail="Email delivery failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Notification test failed: {str(e)}")

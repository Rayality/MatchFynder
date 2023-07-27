from fastapi import BackgroundTasks, APIRouter
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import os
from pathlib import Path

router = APIRouter()

conf = ConnectionConfig(
    MAIL_USERNAME=os.environ["MAIL_USERNAME"],
    MAIL_PASSWORD=os.environ["MAIL_PASSWORD"],
    MAIL_FROM=os.environ["MAIL_FROM"],
    MAIL_PORT=os.environ["MAIL_PORT"],
    MAIL_SERVER=os.environ["MAIL_SERVER"],
    MAIL_FROM_NAME=os.environ["MAIL_FROM_NAME"],
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=Path(__file__).parent / "templates/email",
)


async def send_email_async(subject: str, email_to: str):
    template = """
        <html>
        <body>


<p>Hi !!!
        <br>Thanks for using fastapi mail, keep using it..!!!</p>


        </body>
        </html>
        """
    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        body=template,
        subtype="html",
    )

    fm = FastMail(conf)
    await fm.send_message(message, template_name="email.html")


def send_email_background(
    background_tasks: BackgroundTasks, subject: str, email_to: str
):
    template = """
        <html>
        <body>


<p>Hi !!!
        <br>Thanks for using fastapi mail, keep using it..!!!</p>


        </body>
        </html>
        """
    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        body=template,
        subtype="html",
    )
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message, template_name="email.html")


@router.get("/send-email/asynchronous")
async def send_email_asynchronous(email_to: str, name: str):
    await send_email_async(
        "Calling All Picky Eaters",
        email_to,
    )
    return "Success"


@router.get("/send-email/backgroundtasks")
def send_email_backgroundtasks(
    background_tasks: BackgroundTasks, email_to: str, name: str
):
    send_email_background(
        background_tasks,
        "Calling All Picky Eaters",
        email_to,
    )
    return "Success"

import logging
from typing import Dict

from telegram import __version__ as TG_VER

try:
    from telegram import __version_info__
except ImportError:
    __version_info__ = (0, 0, 0, 0, 0)  # type: ignore[assignment]

if __version_info__ < (20, 0, 0, "alpha", 1):
    raise RuntimeError(f"This programme is not compatible with your current PTB version {TG_VER}.")

from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

CHOOSING, TYPING_REPLY, TYPING_CHOICE, TYPING_REPLY2 = range(4)

reply_keyboard = [
    ["🔗 In blockchain notes", "💿 Local notes"],
    ["🖊 Make local note", "🌐 Make on-chain note"]
]
markup = ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Start the conversation and ask user for input."""
    await update.message.reply_text(
        "Hi! This bot can help you to find information about owner of eth wallet"
        " Or to add information about your wallet to help other to find you",
        reply_markup=markup,
    )

    return CHOOSING


async def regular_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text
    context.user_data["choice"] = text
    await update.message.reply_text(f"You have chosen {text.lower()}!")
    output = ""
    if text == "🔗 In blockchain notes":
        output = "Here you can get secure data about eth address, you can trust to this information" \
                 "because it is taken from blockchain. Enter eth address:"
    elif text == "💿 Local notes":
        output = "Do not trust 100% to local notes about owner " \
                 "cause anyone can create them and delete them! Now type eth address:"
    elif text == "🖊 Make local note":
        output = "To make note enter eth address to which you what connect note with info:"
    if text != "🌐 Make on-chain note":
        await update.message.reply_text(output)
        return TYPING_REPLY
    else:
        await update.message.reply_text("Now in telegram it is impossible to connect web 3 wallet "
                                        "to write smart contracts that is why it is possible "
                                        "to continue only in web",
                                        reply_markup=InlineKeyboardMarkup(
                                            [[InlineKeyboardButton("website",
                                                                   url="https://crypto-notes-ten.vercel.app/create")]]
                                            )
                                        )
        await update.message.reply_text("Chose:", reply_markup=markup)
        return CHOOSING


# async def received_information(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
#     user_data = context.user_data
#     text = update.message.text
#     category = user_data["choice"]
#     user_data[category] = text
#     del user_data["choice"]
#
#     await update.message.reply_text(
#         "Neat! Just so you know, this is what you already told me:"
#         f"{facts_to_str(user_data)}You can tell me more, or change your opinion"
#         " on something.",
#         reply_markup=markup,
#     )
#
#     return

async def received_information(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_data = context.user_data
    text = update.message.text
    category = user_data["choice"]
    # del user_data["choice"]
    if category == "🔗 In blockchain notes":
        pass
    elif category == "💿 Local notes":
        file = open("db.txt", "r")
        output = f"There is no note on address {text}."
        for i in file:
            elements = i.split(":")
            if elements[0] == text:
                output = f"There is note on address {text}! Here it is: {elements[1]}"
        file.close()
        await update.message.reply_text(output, reply_markup=markup)
    else:
        context.user_data["adr"] = text
        await update.message.reply_text("Now wright note that you want to attach:")
        return TYPING_REPLY2
    return CHOOSING


async def received_information2(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_data = context.user_data
    text = update.message.text
    adr = user_data["adr"]
    f = open("db.txt", "a")
    print(f"{adr}:{text}", file=f)
    f.close()
    await update.message.reply_text("Note have successfully saved locally you can check it!", reply_markup=markup)
    return CHOOSING


async def done(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_data = context.user_data
    if "choice" in user_data:
        del user_data["choice"]

    await update.message.reply_text(
        f"I learned these facts about you: Until next time!",
        reply_markup=ReplyKeyboardRemove(),
    )

    user_data.clear()
    return ConversationHandler.END


def main() -> None:
    application = Application.builder().token("5663446849:AAHWUZH51abe_Hna6jwxx1tBaQbRwS48Ft8").build()
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            CHOOSING: [
                MessageHandler(
                    filters.Regex("^(🔗 In blockchain notes|💿 Local notes|🖊 Make local note|🌐 Make on-chain note)$"),
                    regular_choice
                ),
            ],
            TYPING_CHOICE: [
                MessageHandler(
                    filters.TEXT & ~(filters.COMMAND | filters.Regex("^Done$")), regular_choice
                )
            ],
            TYPING_REPLY: [
                MessageHandler(
                    filters.TEXT & ~(filters.COMMAND | filters.Regex("^Done$")),
                    received_information,
                )
            ],
            TYPING_REPLY2: [
                MessageHandler(
                    filters.TEXT & ~(filters.COMMAND | filters.Regex("^Done$")),
                    received_information2,
                )
            ]
        },
        fallbacks=[MessageHandler(filters.Regex("^Done$"), done)],
    )
    application.add_handler(conv_handler)
    application.run_polling()


if __name__ == "__main__":
    main()

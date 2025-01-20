from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

# Replace 'YOUR_BOT_TOKEN' with your actual bot token
BOT_TOKEN = "7278739263:AAEzh1QtNGs9uR6cj_zIYUM2rf_HM_TOGkc"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Send "Hi" message
    await update.message.reply_text("Hi!")
    
    # Send the GIF
    await update.message.reply_document(document="https://github.com/Ebisa7/ETN/raw/main/well1.gif")

def main():
    # Create the application
    app = Application.builder().token(BOT_TOKEN).build()

    # Add the /start command handler
    app.add_handler(CommandHandler("start", start))

    # Run the bot
    app.run_polling()

if __name__ == "__main__":
    main()
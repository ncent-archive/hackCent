<<<<<<< HEAD
https://medium.com/ncent/can-careers-find-the-right-people-a1e135a2a7a7
=======
JobBot
This bot will be used to periodically send messages to the JobBot Telegram room

Setup
Create a secret.env file that looks like this:

TOKEN=ISSUED_BOT_TOKEN
CHAT_ID=CHAT_ID
Run
sh dockerExec.sh
Stop
docker rm -f messageBotContainer
Logs
docker logs messageBotContainer
>>>>>>> e2c73fa2b85fb2684414c144e60f4594972cee7c

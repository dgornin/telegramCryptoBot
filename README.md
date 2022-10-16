# [telegramCryptoBot](https://github.com/dgornin/telegramCryptoBot) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dgornin/telegramCryptoBot/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) 
Telegram bot to find info about wallet owner in blockchain by passing it
Nowadays, there is a problem that cryptocurrency address do not represent the owner if you know just address it is hard to untested who is an owner to contact with him. If owner want he can make note in blockchain with his contact information. This information will be secured in blockchain and every one cen get access to this information. Bot provide access to web3 provider to get this information from blockchain,to make UX better.
* **Creation** by bot you can create note about your eth address and every one can see it just by placing your address in bot this will help other people to contact with you if they want.
* **Observation** by bot it is possible to enter eth address and parse blockchain on existing of notes related to this account
## Deployment
* [Telegram bot](https://t.me/cryptoOwnerBot)
* [Website](https://telegram-crypto-bot-mu.vercel.app/)
* [Smart contract](https://goerli.etherscan.io/address/0xF98Ca04B59b794EDf62dd76bDD9c44256bA99AD8)
## Run locally
### Bot (python) part
To run bot you should install python 3.10 and some additional libraries you can find them in [bot/requirements.txt](https://github.com/dgornin/telegramCryptoBot/blob/main/bot/requirements.txt)
```bash
pip install python-telegram-bot --pre
```
Then to run bot you can use "python3" command
```bash
python3 main.py
```
Or "nohup python3" to run it background on server
```bash
nohup python3 main.py &
```
### Front (Next.js) part
You will need to install node js locally then go to front folder and run "npx install" it will install all dependencies that require to run server
```bash
npx install
```
Then "npm run dev" to run server on local address
```bash
npm run dev
```
### Smart contract (solidity) part
You should to download hardhat package
```bash
npm init
npm install --save-dev hardhat
```
Then change token to your and deploy contract to test net by
```bash
npx hardhat run scripts/deploy.js --network goerli
```
## Contributors
* [dgornin](https://github.com/dgornin)
## License
React is [MIT licensed](./LICENSE).

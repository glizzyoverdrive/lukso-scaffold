
# LUKSO Scaffold 🛠️

A full-stack starter for LUKSO with high fidelity examples for devs to get started and launch quickly.

_Learn, fiddle, prototype and launch full-stack dApps with smooth #devex, from localhost, testnet to mainnet in the same stack._

![starter](https://i.imgur.com/0ElnBan.png)

### WHY?

I built this because I believe developers are important for the growth of LUKSO ecosystem. LUKSO (despite being an EVM network), it has its own lingos, standards and way of doing.

By having a structured dev environment with plenty of guides and full-stack code samples, it would smoothen the learning curve to onboard developers into the ecosystem. Scaffold 🛠️ abstracts away boring things like making wallet connectors work and changing between networks, so that devs can focus on being creative and productive.

### Brief Background

This is built on top of the 2nd version of Scaffold Ethereum. Not only it is a great starter stack, it also has huge community and ample resources around it.

LUKSO Scaffold 🛠️ added in wallet integrations, project samples and other various additions to make full-cycle LUKSO #devex great.

_New additions are added in non-intrusive way, limiting to `./lukso` folder so that new commits in the parent project can easily be merged back in._

So, SE2 references and resources are still mostly valid: https://github.com/scaffold-eth/scaffold-eth-2

### Overview of LUKSO Scaffold 🛠️

As the very first step, wallet and chain integrations as well as sample LUKSO specific full-stack samples are added in. Please refer to `./packages/contracts` and `./packages/nextjs/pages/[folder]` .

Next, more polished and opinionated full-stack sample projects will be added in. Better structured usage of `erc725.js`, `lsp-factory.js`, `eip191-signer.js` inside NextJS along with Wagmi/Viem combo will be provided. If needed, LUKSO specific React hooks would be added.

Next is to build community around Scaffold 🛠️ , inspired by Ethereum Speedrun, by creating guides and challenges for developers to take on.

### Modular approach

As can be seen, now in early form, each sample is organized in its own folder so that these modules can easily be swapped in and out, just by simple drag and drop of folders.

This would be super useful to share and remix LUKSO full-stack dApps.

### Getting started

To get started with LUKSO Scaffold 🛠️, follow the steps below:

1.  Clone this repo & install dependencies

```
git clone https://github.com/0xstruct/lukso-scaffold.git
cd lukso-scaffold
yarn install
```

2.  Run a local network (hardhat) in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in  `hardhat.config.ts`.

3.  On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in  `packages/hardhat/contracts`  and can be modified to suit your needs. The  `yarn deploy`  command uses the deploy script located in  `packages/hardhat/deploy`  to deploy the contract to the network. You can also customize the deploy script.

4.  On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on:  `http://localhost:3000`. You can interact with your smart contract using the  `Debug Contracts`  page. You can tweak the app config in  `packages/nextjs/scaffold.config.ts`.

Run smart contract test with  `yarn hardhat:test`

-   Edit your smart contract  `YourContract.sol`  in  `packages/hardhat/contracts`
-   Edit your frontend in  `packages/nextjs/pages`
-   Edit your deployment scripts in  `packages/hardhat/deploy`

### Documentation
Please refer to SE2 [docs](https://docs.scaffoldeth.io/) and [website](https://scaffoldeth.io/).
Also other great projects used in this stack:

 - [Wagmi](https://wagmi.sh/) 
 - [Viem](https://viem.sh/)
 - [Rainbowkit](https://www.rainbowkit.com/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [DaisyUI](https://daisyui.com/)
 - [NextJS](https://nextjs.org/)

And last but not least
- [Scaffold 🛠️ docs](https://docs.google.com/document/d/1c61ehvHnfs5hrK0Wk-vBTaNk1NagiU6usKnsJmabKwk/edit?usp=sharing) _(WIP)_

### Sample dApps

- **universalprofile**
	-  `./packages/nextjs/pages/universalprofile`
	- this interacts with LSP0 and LSP3
	- _thanks to Jake Prins_
- **nfts** 
	- `./packages/nextjs/pages/nfts`
	- this interacts with LSP8
	- _thanks to Samuel Videau_
- **ticket** 
	- `./packages/nextjs/pages/ticket`
	- this interacts with LSP7
	- _thanks to CJ42_

More to come, please suggest dApps that you want to see to really interact with various LSP standards.


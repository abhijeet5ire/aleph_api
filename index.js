import express from 'express';
import { ApiPromise, WsProvider } from '@polkadot/api';
import {Keyring} from '@polkadot/keyring'
import { ContractPromise } from '@polkadot/api-contract';
const app = express();
const port = 3000;

const WS_PROVIDER = 'wss://ws.test.azero.dev'; // Update with your Substrate node's WebSocket endpoint
const PRIVATE_KEY = 'YOURPVTKEY';
const CONTRACT_ADDRESS = '5C7mVyTvQFPFaBCg59fQ688ijzft2TtpeuaZQYycH3NzkMX2'; // Replace with your actual contract address
let accounttxn
const metadata={
	"source": {
	  "hash": "0x3059bc3c858ce6b7a702c4144e4a72d5dcc7e3c1ac9fa72b1515636b8d95eee5",
	  "language": "ink! 4.3.0",
	  "compiler": "rustc 1.77.0-nightly",
	  "build_info": {
		"build_mode": "Release",
		"cargo_contract_version": "3.2.0",
		"rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
		"wasm_opt_settings": {
		  "keep_debug_symbols": false,
		  "optimization_passes": "Z"
		}
	  }
	},
	"contract": {
	  "name": "mytoken",
	  "version": "0.1.0",
	  "authors": [
		"[your_name] <[your_email]>"
	  ]
	},
	"spec": {
	  "constructors": [
		{
		  "args": [],
		  "default": false,
		  "docs": [
			"Constructor that initializes the contract."
		  ],
		  "label": "new",
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink_primitives",
			  "ConstructorResult"
			],
			"type": 1
		  },
		  "selector": "0x9bae9d5e"
		}
	  ],
	  "docs": [],
	  "environment": {
		"accountId": {
		  "displayName": [
			"AccountId"
		  ],
		  "type": 5
		},
		"balance": {
		  "displayName": [
			"Balance"
		  ],
		  "type": 8
		},
		"blockNumber": {
		  "displayName": [
			"BlockNumber"
		  ],
		  "type": 10
		},
		"chainExtension": {
		  "displayName": [
			"ChainExtension"
		  ],
		  "type": 11
		},
		"hash": {
		  "displayName": [
			"Hash"
		  ],
		  "type": 9
		},
		"maxEventTopics": 4,
		"timestamp": {
		  "displayName": [
			"Timestamp"
		  ],
		  "type": 0
		}
	  },
	  "events": [],
	  "lang_error": {
		"displayName": [
		  "ink",
		  "LangError"
		],
		"type": 3
	  },
	  "messages": [
		{
		  "args": [],
		  "default": false,
		  "docs": [
			" Mint function to increase the total supply of NFTs."
		  ],
		  "label": "mint",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 1
		  },
		  "selector": "0xcfdd9aa2"
		},
		{
		  "args": [],
		  "default": false,
		  "docs": [
			" Get the total supply of NFTs."
		  ],
		  "label": "total_supply",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 4
		  },
		  "selector": "0xdb6375a8"
		}
	  ]
	},
	"storage": {
	  "root": {
		"layout": {
		  "struct": {
			"fields": [
			  {
				"layout": {
				  "leaf": {
					"key": "0x00000000",
					"ty": 0
				  }
				},
				"name": "total_supply"
			  }
			],
			"name": "MyToken"
		  }
		},
		"root_key": "0x00000000"
	  }
	},
	"types": [
	  {
		"id": 0,
		"type": {
		  "def": {
			"primitive": "u64"
		  }
		}
	  },
	  {
		"id": 1,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 2
					}
				  ],
				  "index": 0,
				  "name": "Ok"
				},
				{
				  "fields": [
					{
					  "type": 3
					}
				  ],
				  "index": 1,
				  "name": "Err"
				}
			  ]
			}
		  },
		  "params": [
			{
			  "name": "T",
			  "type": 2
			},
			{
			  "name": "E",
			  "type": 3
			}
		  ],
		  "path": [
			"Result"
		  ]
		}
	  },
	  {
		"id": 2,
		"type": {
		  "def": {
			"tuple": []
		  }
		}
	  },
	  {
		"id": 3,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "index": 1,
				  "name": "CouldNotReadInput"
				}
			  ]
			}
		  },
		  "path": [
			"ink_primitives",
			"LangError"
		  ]
		}
	  },
	  {
		"id": 4,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 0
					}
				  ],
				  "index": 0,
				  "name": "Ok"
				},
				{
				  "fields": [
					{
					  "type": 3
					}
				  ],
				  "index": 1,
				  "name": "Err"
				}
			  ]
			}
		  },
		  "params": [
			{
			  "name": "T",
			  "type": 0
			},
			{
			  "name": "E",
			  "type": 3
			}
		  ],
		  "path": [
			"Result"
		  ]
		}
	  },
	  {
		"id": 5,
		"type": {
		  "def": {
			"composite": {
			  "fields": [
				{
				  "type": 6,
				  "typeName": "[u8; 32]"
				}
			  ]
			}
		  },
		  "path": [
			"ink_primitives",
			"types",
			"AccountId"
		  ]
		}
	  },
	  {
		"id": 6,
		"type": {
		  "def": {
			"array": {
			  "len": 32,
			  "type": 7
			}
		  }
		}
	  },
	  {
		"id": 7,
		"type": {
		  "def": {
			"primitive": "u8"
		  }
		}
	  },
	  {
		"id": 8,
		"type": {
		  "def": {
			"primitive": "u128"
		  }
		}
	  },
	  {
		"id": 9,
		"type": {
		  "def": {
			"composite": {
			  "fields": [
				{
				  "type": 6,
				  "typeName": "[u8; 32]"
				}
			  ]
			}
		  },
		  "path": [
			"ink_primitives",
			"types",
			"Hash"
		  ]
		}
	  },
	  {
		"id": 10,
		"type": {
		  "def": {
			"primitive": "u32"
		  }
		}
	  },
	  {
		"id": 11,
		"type": {
		  "def": {
			"variant": {}
		  },
		  "path": [
			"ink_env",
			"types",
			"NoChainExtension"
		  ]
		}
	  }
	],
	"version": "4"
  }
let api;
async function queryTotalSupply(api, contract, owner) {
	try {
	  // Query the totalSupply storage item of the contract
	  const { gasRequired, result, output } = await contract.query.totalSupply(owner, { gasLimit: -1 });
  
	  // Log the actual result from RPC as `ContractExecResult`

  
	  // Log the gas consumed for contract execution

	  // Check if the call was successful
	  if (result.isOk) {
		// Output the return value
		
	  } else {
		
	  }
	} catch (error) {

	}
  }
  
async function connectToSubstrate() {
	const provider = new WsProvider(WS_PROVIDER);
	api = await ApiPromise.create({ provider });
	
	
	const keyring = new Keyring({ type: 'sr25519' });
	const account = keyring.addFromUri(PRIVATE_KEY);
	accounttxn=account
    const [chain, nodeName, nodeVersion] = await Promise.all([
		api.rpc.system.chain(),
		api.rpc.system.name(),
		api.rpc.system.version()
	  ]);
	


	await api.isReadyOrError;
	await api.setSigner(account);
	  // Retrieve the chain & node information information via rpc calls
	
  }


app.get('/mint', async (req, res) => {
  try {
    if (!api) {
      await connectToSubstrate();
    }

	const keyring = new Keyring({ type: 'sr25519' });
	const account = keyring.addFromUri(PRIVATE_KEY);

    
    const contract = new ContractPromise(api, metadata, CONTRACT_ADDRESS);
    // Find the metadata section for the 'mytoken' module
	await contract.tx.mint({ storageDepositLimit:null, gasLimit:3000n * 1000000n }).signAndSend(account, result => {
		if (result.status.isInBlock) {
		  console.log('in a block');
		} else if (result.status.isFinalized) {
		  console.log('finalized');
		      console.log('Transaction Hash:', result.txHash.toString());
    console.log('Block Number:', result.blockNumber.toString());
	res.json({  'Transaction Hash:': result.txHash.toString() });
		} })  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Express API listening at http://localhost:${port}`);
});

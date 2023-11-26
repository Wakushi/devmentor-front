export const teachingSubjects = [
	"Blockchain Basics",
	"Smart Contracts Basics",
	"ERC20",
	"NFTs",
	"DeFi",
	"DAOs",
	"Chainlink",
	"Smart Contracts Security"
]

export const levels = ["Novice", "Beginner", "Intermediate"]

export interface Engagement {
	durationInSeconds: number
	label: string
}

export const engagements: Engagement[] = [
	{ durationInSeconds: 604800, label: "1 week" },
	{ durationInSeconds: 1209600, label: "2 weeks" },
	{ durationInSeconds: 1814400, label: "3 weeks" },
	{ durationInSeconds: 2419200, label: "1 month" }
]

export const DEVMENTOR_CONTRACT_ADDRESS =
	"0x33BDb1951C95E1Dd877EAc9EDF94A6C47F111810"

export const DEVMENTOR_CONTRACT_ABI = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "vrfCoordinator",
						type: "address"
					},
					{
						internalType: "address",
						name: "priceFeed",
						type: "address"
					},
					{
						internalType: "bytes32",
						name: "gasLane",
						type: "bytes32"
					},
					{
						internalType: "uint64",
						name: "subscriptionId",
						type: "uint64"
					},
					{
						internalType: "uint32",
						name: "callbackGasLimit",
						type: "uint32"
					},
					{
						internalType: "string[]",
						name: "languages",
						type: "string[]"
					},
					{
						internalType: "string",
						name: "baseURI",
						type: "string"
					}
				],
				internalType: "struct DEVMentor.DEVMentorConfig",
				name: "config",
				type: "tuple"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "DEVMentor__AlreadyRegisteredAsMentee",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "DEVMentor__AlreadyRegisteredAsMentor",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "DEVMentor__IncorrectMentee",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "DEVMentor__IncorrectMentor",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_rewardId",
				type: "uint256"
			}
		],
		name: "DEVMentor__InsufficientBalance",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_badgeId",
				type: "uint256"
			}
		],
		name: "DEVMentor__InvalidBadgeId",
		type: "error"
	},
	{
		inputs: [],
		name: "DEVMentor__MinimumEngagementNotReached",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "DEVMentor__NotAMentee",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "DEVMentor__NotAMentor",
		type: "error"
	},
	{
		inputs: [],
		name: "DEVMentor__NotEnoughLockedValue",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_badgeId",
				type: "uint256"
			}
		],
		name: "DEVMentor__NotEnoughXP",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_badgeId",
				type: "uint256"
			}
		],
		name: "DEVMentor__PreviousBadgeRequired",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "DEVMentor__RequestAlreadyOpened",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_rewardId",
				type: "uint256"
			}
		],
		name: "DEVMentor__RewardSoldOut",
		type: "error"
	},
	{
		inputs: [],
		name: "DEVMentor__SessionDurationNotOver",
		type: "error"
	},
	{
		inputs: [],
		name: "DEVMentor__TransferFailed",
		type: "error"
	},
	{
		inputs: [],
		name: "DEVMentor__WrongRating",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "needed",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ERC1155InsufficientBalance",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "approver",
				type: "address"
			}
		],
		name: "ERC1155InvalidApprover",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "idsLength",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "valuesLength",
				type: "uint256"
			}
		],
		name: "ERC1155InvalidArrayLength",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "ERC1155InvalidOperator",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			}
		],
		name: "ERC1155InvalidReceiver",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address"
			}
		],
		name: "ERC1155InvalidSender",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "ERC1155MissingApprovalForAll",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "have",
				type: "address"
			},
			{
				internalType: "address",
				name: "want",
				type: "address"
			}
		],
		name: "OnlyCoordinatorCanFulfill",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "OwnableInvalidOwner",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "OwnableUnauthorizedAccount",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "badgeId",
				type: "uint256"
			}
		],
		name: "BadgeMinted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			}
		],
		name: "MenteeConfirmedSession",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "valueLocked",
				type: "uint256"
			}
		],
		name: "MenteeLockedValue",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			}
		],
		name: "MenteeMatchedWithMentor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			}
		],
		name: "MenteeOpenedRequest",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			}
		],
		name: "MenteeRegistered",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "MenteeValueSent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			}
		],
		name: "MentorApproved",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			}
		],
		name: "MentorConfirmedSession",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			}
		],
		name: "MentorRegistered",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256"
			}
		],
		name: "MentorSelectionRequestSent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "tipper",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "MentorTipped",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "MentorTokensGained",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			}
		],
		name: "RequestCancelled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "rewardId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalSupply",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "metadataURI",
				type: "string"
			}
		],
		name: "RewardAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "rewardId",
				type: "uint256"
			}
		],
		name: "RewardClaimed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "engagement",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "valueLocked",
				type: "uint256"
			}
		],
		name: "SessionCreated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "rating",
				type: "uint256"
			}
		],
		name: "SessionRated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "mentee",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "mentor",
				type: "address"
			}
		],
		name: "SessionValidated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256[]",
				name: "ids",
				type: "uint256[]"
			},
			{
				indexed: false,
				internalType: "uint256[]",
				name: "values",
				type: "uint256[]"
			}
		],
		name: "TransferBatch",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "TransferSingle",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "value",
				type: "string"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "id",
				type: "uint256"
			}
		],
		name: "URI",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "XPGained",
		type: "event"
	},
	{
		inputs: [],
		name: "EDU_ELITE_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "EDU_ELITE_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "GUIDANCE_GURU_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "GUIDANCE_GURU_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "KNOWLEDGE_KNIGHT_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "KNOWLEDGE_KNIGHT_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "LEGEND_LUMINARY_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "LEGEND_LUMINARY_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MENTOR_MAESTRO_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MENTOR_MAESTRO_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MENTOR_TOKEN_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MENTOR_TOKEN_INCREMENT_FACTOR",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MENTOR_TOKEN_MONTHLY_BONUS",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MENTOR_TOKEN_PER_SESSION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "MINIMUM_LOCKED_VALUE",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "NEW_NAVIGATOR_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "NEW_NAVIGATOR_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "PIONEER_PATRON_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "PIONEER_PATRON_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "SAGE_SHERPA_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "SAGE_SHERPA_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "SKILL_SEEKER_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "SKILL_SEEKER_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "WISDOM_WARRIOR_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "WISDOM_WARRIOR_XP",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "XP_INCREMENT_FACTOR",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "XP_MONTHLY_BONUS",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "XP_PER_SESSION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "XP_TOKEN_ID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_language",
				type: "string"
			}
		],
		name: "addLanguage",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "price",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "totalSupply",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "metadataURI",
				type: "string"
			}
		],
		name: "addReward",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "adminMintMentorToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "adminMintXp",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "approveMentor",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "availableRewardIds",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "id",
				type: "uint256"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "accounts",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "ids",
				type: "uint256[]"
			}
		],
		name: "balanceOfBatch",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_badgeId",
				type: "uint256"
			}
		],
		name: "burnXpForBadge",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "cancelRequestForSession",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_engagement",
				type: "uint256"
			}
		],
		name: "changeMentorEngagement",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "rewardId",
				type: "uint256"
			}
		],
		name: "claimMentorReward",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "fulfillPendingRequests",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "getAllLanguages",
		outputs: [
			{
				internalType: "string[]",
				name: "",
				type: "string[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "getAvailableRewardIds",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "badgeId",
				type: "uint256"
			}
		],
		name: "getBadgeXpCost",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [],
		name: "getEthPrice",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_languageId",
				type: "uint256"
			}
		],
		name: "getLanguageById",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IDEVMentor.Subject",
				name: "_subject",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "_engagement",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_language",
				type: "uint256"
			}
		],
		name: "getMatchingMentors",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "getMenteeInfo",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "language",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "sessionCount",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "mentor",
						type: "address"
					},
					{
						internalType: "bool",
						name: "registered",
						type: "bool"
					},
					{
						internalType: "bool",
						name: "hasRequest",
						type: "bool"
					}
				],
				internalType: "struct MenteeRegistry.Mentee",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "getMenteeRequest",
		outputs: [
			{
				components: [
					{
						internalType: "enum IDEVMentor.Level",
						name: "level",
						type: "uint8"
					},
					{
						internalType: "enum IDEVMentor.Subject",
						name: "learningSubject",
						type: "uint8"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					}
				],
				internalType: "struct MenteeRegistry.MenteeRequest",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "getMenteeSession",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "mentor",
						type: "address"
					},
					{
						internalType: "address",
						name: "mentee",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "valueLocked",
						type: "uint256"
					},
					{
						internalType: "bool",
						name: "mentorConfirmed",
						type: "bool"
					},
					{
						internalType: "bool",
						name: "menteeConfirmed",
						type: "bool"
					}
				],
				internalType: "struct SessionRegistry.Session",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "getMentorContact",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "getMentorInfo",
		outputs: [
			{
				components: [
					{
						internalType: "enum IDEVMentor.Subject[]",
						name: "teachingSubjects",
						type: "uint8[]"
					},
					{
						internalType: "address",
						name: "mentee",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "contactHash",
						type: "bytes"
					},
					{
						internalType: "uint8",
						name: "yearsOfExperience",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "language",
						type: "uint8"
					},
					{
						internalType: "uint256",
						name: "totalRating",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "sessionCount",
						type: "uint256"
					},
					{
						internalType: "bool",
						name: "registered",
						type: "bool"
					},
					{
						internalType: "bool",
						name: "validated",
						type: "bool"
					}
				],
				internalType: "struct MentorRegistry.Mentor",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_requestId",
				type: "uint256"
			}
		],
		name: "getMentorSelectionRequest",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "mentee",
						type: "address"
					},
					{
						internalType: "address[]",
						name: "matchingMentors",
						type: "address[]"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					}
				],
				internalType: "struct MentorRegistry.MentorSelectionRequest",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "getMentors",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "rewardId",
				type: "uint256"
			}
		],
		name: "getRewardById",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "totalSupply",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "remainingSupply",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "metadataURI",
						type: "string"
					}
				],
				internalType: "struct RewardManager.Reward",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			},
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "getSession",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "mentor",
						type: "address"
					},
					{
						internalType: "address",
						name: "mentee",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "valueLocked",
						type: "uint256"
					},
					{
						internalType: "bool",
						name: "mentorConfirmed",
						type: "bool"
					},
					{
						internalType: "bool",
						name: "menteeConfirmed",
						type: "bool"
					}
				],
				internalType: "struct SessionRegistry.Session",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_user",
				type: "address"
			}
		],
		name: "getUserBadgeId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_user",
				type: "address"
			}
		],
		name: "getUserMentorTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_user",
				type: "address"
			}
		],
		name: "getUserXp",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "isAccountMentee",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "isAccountMentor",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "isMentorValidated",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "languages",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "nextTokenId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "enum IDEVMentor.Level",
						name: "level",
						type: "uint8"
					},
					{
						internalType: "enum IDEVMentor.Subject",
						name: "subject",
						type: "uint8"
					},
					{
						internalType: "uint256",
						name: "language",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					},
					{
						internalType: "address[]",
						name: "matchingMentors",
						type: "address[]"
					},
					{
						internalType: "address",
						name: "chosenMentor",
						type: "address"
					}
				],
				internalType:
					"struct MenteeRegistry.MenteeRegistrationAndRequest",
				name: "request",
				type: "tuple"
			}
		],
		name: "openRequestForSession",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "requestId",
				type: "uint256"
			},
			{
				internalType: "uint256[]",
				name: "randomWords",
				type: "uint256[]"
			}
		],
		name: "rawFulfillRandomWords",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "enum IDEVMentor.Level",
						name: "level",
						type: "uint8"
					},
					{
						internalType: "enum IDEVMentor.Subject",
						name: "subject",
						type: "uint8"
					},
					{
						internalType: "uint256",
						name: "language",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					},
					{
						internalType: "address[]",
						name: "matchingMentors",
						type: "address[]"
					},
					{
						internalType: "address",
						name: "chosenMentor",
						type: "address"
					}
				],
				internalType:
					"struct MenteeRegistry.MenteeRegistrationAndRequest",
				name: "request",
				type: "tuple"
			}
		],
		name: "registerAsMenteeAndMakeRequestForSession",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "enum IDEVMentor.Subject[]",
						name: "teachingSubjects",
						type: "uint8[]"
					},
					{
						internalType: "uint256",
						name: "engagement",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "language",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "yearsOfExperience",
						type: "uint8"
					},
					{
						internalType: "string",
						name: "contact",
						type: "string"
					}
				],
				internalType: "struct MentorRegistry.MentorRegistration",
				name: "registration",
				type: "tuple"
			}
		],
		name: "registerAsMentor",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "rewards",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "totalSupply",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "remainingSupply",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "metadataURI",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "ids",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "values",
				type: "uint256[]"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "safeBatchTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_baseURI",
				type: "string"
			}
		],
		name: "setBaseUri",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "_tokenURI",
				type: "string"
			}
		],
		name: "setTokenURI",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			}
		],
		name: "tipMentor",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_contact",
				type: "string"
			}
		],
		name: "updateContact",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			},
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_engagement",
				type: "uint256"
			}
		],
		name: "updateSessionEngagement",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "uri",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentor",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_rating",
				type: "uint256"
			}
		],
		name: "validateSessionAsMentee",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "validateSessionAsMentor",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	}
]

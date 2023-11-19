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
	"0xF15142420907453d40531289DAa4A07b1FBAd3c6"

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
						internalType: "address",
						name: "priceFeed",
						type: "address"
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
				internalType: "address",
				name: "_mentee",
				type: "address"
			}
		],
		name: "DEVMentor__RequestAlreadyOpened",
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
				internalType: "address",
				name: "_mentor",
				type: "address"
			},
			{
				internalType: "address",
				name: "_mentee",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_valueLocked",
				type: "uint256"
			}
		],
		name: "adminCompleteSession",
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
				internalType: "uint8",
				name: "_language",
				type: "uint8"
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
						internalType: "bool",
						name: "accepted",
						type: "bool"
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
		name: "getMentorAverageRating",
		outputs: [
			{
				internalType: "uint256",
				name: "averageRating",
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
		stateMutability: "nonpayable",
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

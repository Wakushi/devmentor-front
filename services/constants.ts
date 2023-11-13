export const DEVMENTOR_CONTRACT_ADDRESS =
	"0x659Ac35802485B139879c9774170186d83839be7"

export const DEVMENTOR_CONTRACT_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_vrfCoordinator",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "_gasLane",
				type: "bytes32"
			},
			{
				internalType: "uint64",
				name: "_subscriptionId",
				type: "uint64"
			},
			{
				internalType: "uint32",
				name: "_callbackGasLimit",
				type: "uint32"
			},
			{
				internalType: "string[]",
				name: "_languages",
				type: "string[]"
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
				internalType: "enum DEVMentor.Subject",
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
				internalType: "struct DEVMentor.Mentee",
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
				internalType: "struct DEVMentor.Session",
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
						internalType: "enum DEVMentor.Subject[]",
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
				internalType: "struct DEVMentor.Mentor",
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
				internalType: "enum DEVMentor.Subject",
				name: "_subject",
				type: "uint8"
			},
			{
				internalType: "enum DEVMentor.Level",
				name: "_level",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "_engagement",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "_matchingMentors",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "_chosenMentor",
				type: "address"
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
				internalType: "enum DEVMentor.Level",
				name: "_level",
				type: "uint8"
			},
			{
				internalType: "enum DEVMentor.Subject",
				name: "_subject",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "_language",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_engagement",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "_matchingMentors",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "_chosenMentor",
				type: "address"
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
				internalType: "enum DEVMentor.Subject[]",
				name: "_teachingSubjects",
				type: "uint8[]"
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
			},
			{
				internalType: "uint8",
				name: "_yearsOfExperience",
				type: "uint8"
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

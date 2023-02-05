export const usePokeInfoHooks = () => {

	const typeImage = (type: string) => {
		switch (type) {
			case "ノーマル":
				return "/img/pokemon/icon_type_1.svg"
			case "ほのお":
				return "/img/pokemon/icon_type_2.svg"
			case "みず":
				return "/img/pokemon/icon_type_3.svg"
			case "くさ":
				return "/img/pokemon/icon_type_4.svg"
			case "でんき":
				return "/img/pokemon/icon_type_5.svg"
			case "こおり":
				return "/img/pokemon/icon_type_6.svg"
			case "かくとう":
				return "/img/pokemon/icon_type_7.svg"
			case "どく":
				return "/img/pokemon/icon_type_8.svg"
			case "じめん":
				return "/img/pokemon/icon_type_9.svg"
			case "ひこう":
				return "/img/pokemon/icon_type_10.svg"
			case "エスパー":
				return "/img/pokemon/icon_type_11.svg"
			case "むし":
				return "/img/pokemon/icon_type_12.svg"
			case "いわ":
				return "/img/pokemon/icon_type_13.svg"
			case "ゴースト":
				return "/img/pokemon/icon_type_14.svg"
			case "ドラゴン":
				return "/img/pokemon/icon_type_15.svg"
			case "あく":
				return "/img/pokemon/icon_type_16.svg"
			case "はがね":
				return "/img/pokemon/icon_type_17.svg"
			case "フェアリー":
				return "/img/pokemon/icon_type_18.svg"
		}
	}

	const statusBarIsValue = (status: number) => {
		const statusRatio = Math.round(status / 15)
		return Array.from(Array(statusRatio).keys(), x => x)
	}	

	const statusBarNonValue = (status: number) => {
		const statusRatio = 15 -  Math.round(status / 15)
		return Array.from(Array(statusRatio).keys(), x => x)
	}

	return [
		typeImage, statusBarIsValue, statusBarNonValue
	];
}


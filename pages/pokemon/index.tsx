import { useEffect, useState } from 'react'
import Axios from 'axios'

export default function Home() {
	const [datas, setDatas] = useState<any[]>([])
	// 取得するデータ
	// 図鑑番号
	// 名前
	// タイプ１
	// タイプ２
	// 高さ
	// 重さ
	// 種族値(HP、攻撃、防御、特攻、特防、素早さ)
	// 画像(フロント、バック、シルエット)
	// 進化前
	// 進化後
	// 特性
	// 夢特性
	const fetchdatas = () => {
		Axios
			.get('https://pokeapi.co/api/v2/pokemon-species/1')
			.then((res) => {
				let pokemon = res.data
				console.log('Data', pokemon)
				console.log('No:', 1)
				const name_ja =  pokemon.names.filter((g) => g.language.name === "ja")
				console.log('Name:', name_ja[0].name)
				const genera_ja =  pokemon.genera.filter((g) => g.language.name === "ja")
				console.log('Genera:', genera_ja[0].genus)
				const flavor_text_entries_ja =  pokemon.flavor_text_entries.filter((g) => g.language.name === "ja")
				console.log('Flavor_text_entries:', flavor_text_entries_ja[0].flavor_text)
				// setDatas(res.data)
			})
			.catch(error => {
					console.error(error)
			})
	}
	const fetchpoke = () => {
		return new Promise((resolve, reject) => {
			Axios
				.get('https://pokeapi.co/api/v2/pokemon/151')
				.then((res) => {
					let pokemon = res.data
					console.log('Data', pokemon)
					console.log('Height', pokemon.height)
					console.log('Weight', pokemon.weight)
					console.log('H', pokemon.stats[0].base_stat)
					console.log('A', pokemon.stats[1].base_stat)
					console.log('D', pokemon.stats[2].base_stat)
					console.log('SA', pokemon.stats[3].base_stat)
					console.log('SD', pokemon.stats[4].base_stat)
					console.log('S', pokemon.stats[5].base_stat)
					resolve(pokemon)
				})
				.catch(error => {
						console.error(error)
				})
		})
	}
	const fetchType = (url) => {
		return new Promise((resolve, reject) => {
			Axios
				.get(`${url}`)
				.then((res) => {
					let type = res.data
					resolve(type)
				})
				.catch(error => {
						console.error(error)
				})
		})
	}
	
	async function main() {
		let data = await fetchpoke()
		let type1_data = await fetchType(data.types[0].type.url)
		let type1 = type1_data.names.filter((g) => g.language.name === "ja")
		console.log('Type1:',type1[0].name)

		let type2_data = ""
		let type2_name = ""
		let type2 = ""
		if(data.types[1] !== undefined) {
			type2_data = await fetchType(data.types[1]?.type.url)
			type2_name = type2_data.names.filter((g) => g.language.name === "ja")
			type2 = type2_data.name
		}
		console.log('Type2:',type2)
	}

	useEffect(() => {
		main()
	}, [])

  return (
    <>
			pp
    </>
  )
}

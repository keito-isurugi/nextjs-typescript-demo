import { useEffect, useState } from 'react'
import Axios from 'axios'
import Button from '@mui/material/Button';

export default function Home() {
	const [datas, setDatas] = useState<any[]>([])
	const [generation, setGeneration] = useState<Number>(1)

	const fetchPokeSpecies = (id: number) => {
		return new Promise((resolve, rejects) => {
			Axios
				.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
				.then((res) => {
					let pokemon = res.data
					resolve(pokemon)
				})
				.catch(error => {
						console.error(error)
				})
		})
	}
	const fetchPoke = (id: number) => {
		return new Promise((resolve, reject) => {
			Axios
				.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.then((res) => {
					let pokemon = res.data
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
	
	const main = async() => {
		let pokeDatas = [];
		await Promise.all([...Array(151)].map(async(_, i) => {
			// 日本語情報取得用データ
			let pokeSpecies = await fetchPokeSpecies(i + 1)
			// 詳細情報取得用でーた
			let poke = await fetchPoke(i + 1)
			let pokeData = await fetchPokeDetail(i + 1, pokeSpecies, poke)
			pokeDatas.push(pokeData)
		}))
		await pokeDatasSet(pokeDatas)
		console.log("終了！！")
	}

	const onCliciMain = () => {
		(async ()=>{
			console.log("非同期的に呼び出す")
			await main()
		}).call([])
	}

	const pokeDatasSet = async(pokeDatas) => {
		pokeDatas.sort((a, b) => a.no - b.no);
		setDatas(pokeDatas)
	}

	const fetchPokeDetail  = async (i, pokeSpecies, poke) => {
			// 図鑑番号
			let pokeNo = i
			// 名前
			const name_ja =  pokeSpecies.names.filter((g) => g.language.name === "ja")
			let name = name_ja[0].name
			// ぶんるい
			const genera_ja =  pokeSpecies.genera.filter((g) => g.language.name === "ja")
			let classification = genera_ja[0].genus
			// タイプ1
			let type1_datas = await fetchType(poke.types[0].type.url)
			let type1_data = type1_datas.names.filter((g) => g.language.name === "ja")
			let type1 = type1_data[0].name
			// タイプ２
			let type2_datas = ""
			let type2_data = ""
			let type2 = ""
			if(poke.types[1] !== undefined) {
				type2_datas = await fetchType(poke.types[1]?.type.url)
				type2_data = type2_datas.names.filter((g) => g.language.name === "ja")
				type2 = type2_data[0].name
			}
			// 高さ
			let height = poke.height
			// 重さ
			let weight = poke.weight
			// 図鑑
			const flavor_text_entries_ja =  pokeSpecies.flavor_text_entries.filter((g) => g.language.name === "ja")
			let flavor_text = flavor_text_entries_ja[0].flavor_text
			// 種族値(HP、攻撃、防御、特攻、特防、素早さ)
			let hp = poke.stats[0].base_stat
			let attack = poke.stats[1].base_stat
			let defense = poke.stats[2].base_stat
			let special_attack = poke.stats[3].base_stat
			let special_defense = poke.stats[4].base_stat
			let speed = poke.stats[5].base_stat
			// 画像
			let img = poke.sprites.other["official-artwork"].front_default
			// let images = poke.sprites

			// 出力
			let poke_json = {
				no: pokeNo,
				name: name,
				classification: classification,
				type1: type1,
				type2: type2,
				height: height,
				weight: weight,
				flavor_text: flavor_text,
				status: {
					hp: hp,
					attack: attack,
					defense: defense,
					special_attack: special_attack,
					special_defense: special_defense,
					speed: speed,
				},
				img: img,
				generation: 1
				// images: images
			}
			return poke_json
	}


	const fileDl = () => {
		const fileName = "pokemon.json";
		const data = JSON.stringify(datas);
		const link = document.createElement("a");
		link.href = "data:text/plain," + encodeURIComponent(data);
		link.download = fileName;
		link.click();
	}


  return (
    <>
			<div className='flex gap-3'>
				<select 
					id="generation"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 font-bold"
					onChange={(e) => setGeneration(Number(e.target.value))}
					>
					<option selected>世代を選択してください</option>
					{[...Array(9)].map((_, i) => (
						<option key={i+1} value={i+1}>第{i+1}世代</option>
					))}
				</select>
				<Button className='bg-red-700 hover:bg-red-500 text-white font-bold' onClick={() => onCliciMain()}>ポケモンデータ取得</Button>
				<Button className='bg-blue-700 hover:bg-blue-500 text-white font-bold' onClick={() => fileDl()}>jsonファイルDL</Button>
			</div>
    </>
  )
}
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { resolve } from 'path';
import { rejects } from 'assert';
import async from '../api/todo/register';

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

	// 進化前
	// 進化後
	// 特性
	// 夢特性
	// 画像(pokemon/1/sprites/back_default, pokemon/1/sprites/other, pokemon/1/sprites/versionsの３種類くらいある）
	const fetchPokeSpecies = (id: number) => {
		return new Promise((resolve, rejects) => {
			Axios
				.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
				.then((res) => {
					let pokemon = res.data
					// console.log('Data', pokemon)
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
					// console.log('Data', pokemon)
					// console.log('img_back_default', pokemon.sprites.back_default)
					// console.log('img_back_female', pokemon.sprites.back_female)
					// console.log('img_back_shiny_default', pokemon.sprites.back_shiny)
					// console.log('img_back_shiny_female', pokemon.sprites.back_shiny_female)
					// console.log('img_front_default', pokemon.sprites.front_default)
					// console.log('img_front_female', pokemon.sprites.front_female)
					// console.log('img_front_shiny_default', pokemon.sprites.front_shiny)
					// console.log('img_front_shiny_female', pokemon.sprites.front_shiny_female)
					// pokemon.sprites.other.official-artwork.front_default
					// pokemon.sprites.other.official-artwork.front_shiny
					// console.log('img_front', pokemon.sprites.other["official-artwork"].front_default)
					// console.log('img_front', pokemon.sprites.other["official-artwork"].front_shiny)
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
		for (let i = 1; i <= 9; i++) {
			// 日本語情報取得用データ
			let pokeSpecies = await fetchPokeSpecies(i)
			// 詳細情報取得用でーた
			let poke = await fetchPoke(i)
			// await fetchPokeDetail(i, pokeSpecies, poke)
			console.log('No:', i)
		}
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
			// // タイプ1
			// let type1_datas = await fetchType(poke.types[0].type.url)
			// let type1_data = type1_datas.names.filter((g) => g.language.name === "ja")
			// let type1 = type1_data[0].name
			// // タイプ２
			// let type2_datas = ""
			// let type2_data = ""
			// let type2 = ""
			// if(poke.types[1] !== undefined) {
			// 	type2_datas = await fetchType(poke.types[1]?.type.url)
			// 	type2_data = type2_datas.names.filter((g) => g.language.name === "ja")
			// 	type2 = type2_data[0].name
			// }
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
	
			// 出力
			console.log('No:', pokeNo)
			// console.log('名前:', name)
			// console.log('ぶんるい:', classification)
			// console.log('タイプ１:', type1)
			// console.log('タイプ２:', type2)
			// console.log('たかさ:', height)
			// console.log('おもさ:', weight)
			// console.log('図鑑:', flavor_text)
			// console.log(`種族値: HP:${hp},攻撃:${attack},防御:${defense},特攻:${special_attack},特防:${special_defense},素早さ:${speed}`)
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

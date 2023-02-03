import { useEffect, useState } from 'react'
import Axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import pokemonJson from '@/lib/json/pokemon.json';
import styels from '@/public/css/pokemon.module.css'

export default function Home() {
	const [datas, setDatas] = useState<any[]>([])
	const [pokeNum, setPokeNum] = useState<Number>(0)
	const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		// bgcolor: 'background.paper',
		border: '1px solid #000',
		boxShadow: 24,
		p: 4,
	};
	
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

	const setPokeDetail = (i) => {
		console.log(i)
		setPokeNum(i)
		handleOpen()
	}

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
					<div className="rounded overflow-hidden shadow-lg bg-white" style={style}>
						<div className="w-full mx-auto bg-gray-300">
							<img className="w-full" src={pokemonJson[pokeNum].img} alt={pokemonJson[pokeNum].name} />	
						</div>
						<div className="px-3 py-2">
							<dl className='flex flex-wrap mb-2'>
								<dt className='font-bold text-xl'>No.{pokemonJson[pokeNum].no}：</dt>
								<dd className='font-bold text-xl'>{pokemonJson[pokeNum].name}</dd>
							</dl>
							<dl className='flex flex-wrap mb-2'>
								<dt className='font-bold text-xl'>分類：</dt>
								<dd className='font-bold text-xl'>{pokemonJson[pokeNum].classification}</dd>
							</dl>
							<dl className='flex flex-wrap mb-2'>
								<dt className='font-bold text-xl'>タイプ：</dt>
								<dd className='font-bold text-xl'>{pokemonJson[pokeNum].type1}、{pokemonJson[pokeNum].type2}</dd>
							</dl>
							<dl className='flex flex-wrap mb-2'>
								<dt className='font-bold text-xl'>高さ：{pokemonJson[pokeNum].height / 10}m　重さ：{pokemonJson[pokeNum].weight / 10}kg</dt>
							</dl>
							<dl className='flex mb-2'>
								<dt className='w-3/6 font-bold text-xl'>説明：</dt>
								<dd className='font-bold text-xl'>{pokemonJson[pokeNum].flavor_text}</dd>
							</dl>
						</div>
					</div>
        {/* </Box> */}
      </Modal>
			{/* <Button className='bg-red-900 hover:bg-red-700' onClick={() => onCliciMain()}>pk</Button>
			<Button className='bg-blue-900 hover:bg-blue-700' onClick={() => fileDl()}>File</Button> */}
			<div className='flex gap-4 flex-wrap justify-center'>
				{pokemonJson.map((data, index) => (
					<div className={`w-1/6 rounded overflow-hidden shadow-lg ${styels.card}`}>
						<div className="w-full mx-auto bg-gray-300 cursor-pointer" onClick={() => setPokeDetail(index)}>
							<img className="w-full" src={data.img} alt={data.name} />	
						</div>
						<div className="px-2 py-2">
							<div className="font-bold text-xl text-center">No.{data.no}：{data.name}</div>
						</div>
					</div>
				))}
			</div>
    </>
  )
}

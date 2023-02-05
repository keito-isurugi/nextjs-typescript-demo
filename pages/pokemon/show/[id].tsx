import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import pokemonJson from '@/lib/json/pokemon_1.json';
import styles from '@/public/css/pokemon.module.css'
import { usePokeInfoHooks } from '@/hooks/pokemon/usePokeInfoHooks'

const PokeShowPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
	const [ typeImage, statusBarIsValue, statusBarNonValue ] = usePokeInfoHooks()

	const [todoId, setTodoId] = useState()
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")


	useEffect(() => {
	}, [id])

	console.log(pokemonJson[id]?.status.map()

  return (
		<>
			{/* ヘッダー */}
			<div className={`bg-gray-300 flex ${styles.poke_show_header}`}>
				<div className="w-[60%] gap-10 flex mx-auto max-w-[1000px]">
					<div className="w-[40%] mx-auto">
						<img className="w-full" src={pokemonJson[id]?.img} alt={pokemonJson[id]?.name} />
					</div>
					<div className='w-[60%] pt-10'>
						<div className='rounded h-[60%] bg-white shadow-lg p-5'>
							<p className='font-bold text-xl'>No.{pokemonJson[id]?.no}</p>
							<p className='font-bold text-3xl'>{pokemonJson[id]?.name}</p>
						</div>	
					</div>
				</div>
			</div>

			{/* メイン */}
			<div className='w-[90%] mt-10 mb-0 mx-auto max-w-[1000px]'>
				<div className='flex justify-between'>
					{/* 情報 */}
					<ul className='w-[49%] border-4 rounded px-16 py-10'>
						<li className='mb-10'>
							<dl className='flex'>
								<dt className='font-bold text-xl'>分類：</dt>
								<dd className='text-xl font-medium'>{pokemonJson[id]?.classification}</dd>
							</dl>
						</li>
						<li className='mb-4'>
							<dl className='flex'>
								<dt className='font-bold text-xl'>タイプ：</dt>
								<dd className='flex gap-x-3'>
									<div className='text-[10px] font-medium w-[36px] text-center'>
										<img src={typeImage(pokemonJson[id]?.type1)} alt="" />
										{pokemonJson[id]?.type1}
									</div>
									<div className='text-[10px] font-medium w-[36px] text-center'>
										<img src={typeImage(pokemonJson[id]?.type2)} alt="" />
										{pokemonJson[id]?.type2}
									</div>
								</dd>
							</dl>
						</li>
						<li className='mb-10 flex'>
							<dl className='flex mr-10'>
								<dt className='font-bold text-xl'>高さ：</dt>
								<dd className='text-xl font-medium'>{pokemonJson[id]?.height / 10}m</dd>
							</dl>
							<dl className='flex'>
								<dt className='font-bold text-xl'>重さ：</dt>
								<dd className='text-xl font-medium'>{pokemonJson[id]?.weight / 10}kg</dd>
							</dl>
						</li>
					</ul>

					{/* ステータス */}
					<ul className='w-[49%] border-4 rounded p-10'>
						<dl className='flex mb-6'>
							<dt className='font-bold text-xl'>HP</dt>
							<dd className='text-xl font-medium'>
								<ul>
									<li></li>
								</ul>
								<ul>
									<li></li>
								</ul>
							</dd>
						</dl>
						<dl className='flex mb-6'>
							<dt className='font-bold text-xl'>こうげき</dt>
							<dd className='text-xl font-medium'>
								<ul className='flex'>
									{statusBarIsValue(pokemonJson[id]?.status.attack).map((i) => (
										<li className='bg-orange-400 rounded-[8px] w-[15px] h-[35px] mr-[5px]'></li>
									))}
									{statusBarNonValue(pokemonJson[id]?.status.attack).map((i) => (
										<li className='bg-gray-200 rounded-[8px] w-[15px] h-[35px] mr-[5px]'></li>
									))}
								</ul>
								<ul>
									<li></li>
								</ul>
								<ul>
									<li></li>
								</ul>
							</dd>
						</dl>
					</ul>
				</div>
				
				{/* 図鑑 */}
				<div className='border-4 rounded px-16 py-10 mt-4'>
					<p className='text-xl font-medium'>
						{pokemonJson[id]?.flavor_text}
					</p>
				</div>
			</div>
		</>
		)
}

export default PokeShowPage
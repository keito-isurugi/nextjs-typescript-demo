import { useEffect, useState } from 'react'
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
	
	// 詳細モーダル
	const setPokeDetail = (i) => {
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
      </Modal>

			<div className='flex gap-4 flex-wrap justify-center'>
				{pokemonJson.map((data, index) => (
					<div key={index} className={`w-1/6 rounded overflow-hidden shadow-lg ${styels.card}`}>
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

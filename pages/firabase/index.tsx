import { useState, useEffect } from "react"
import db from "@/lib/firabase"
import { collection, getDocs, doc, onSnapshot, setDoc } from "firebase/firestore"; 
import { Button } from "@mui/material";
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export default function Home() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		// データベースからデータを取得する
		const postDatas = collection(db, "pokemon")
		getDocs(postDatas).then((snapShot) => {
			setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
		})

		// リアルタイムで取得
		onSnapshot(postDatas, (post) => {
			setPosts(post.docs.map((doc) => ({ ...doc.data() })))
		})
	}, [])

	// const pokeArray = [{"no":1,"name":"フシギダネ","classification":"たねポケモン","type1":"くさ","type2":"どく","height":7,"weight":69,"flavor_text":"生まれたときから　背中に\n不思議な　タネが　植えてあって\n体と　ともに　育つという。","status":{"hp":45,"attack":49,"defense":49,"special_attack":65,"special_defense":65,"speed":45},"img":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png","generation":1},{"no":2,"name":"フシギソウ","classification":"たねポケモン","type1":"くさ","type2":"どく","height":10,"weight":130,"flavor_text":"つぼみが　背中に　ついていて\n養分を　吸収していくと\n大きな　花が　咲くという。","status":{"hp":60,"attack":62,"defense":63,"special_attack":80,"special_defense":80,"speed":60},"img":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png","generation":1}]

	const registerPost = () => {
		// pokeArray.map((poke, index) => {
		// 	setDoc(doc(db, "pokemon", `poke_${index}`), poke);
		// })
	}

  return (
    <>
      <div>
				<h2>Firabaseデモ</h2>
				{posts?.map((post, index) => (
					<>
						<div key={index}>
							<p>{post?.name}</p>
						</div>
					</>
				))}
      </div>
			<h2>データ追加</h2>
			<Button onClick={() => registerPost()}>データ追加です</Button>
    </>
  )
}

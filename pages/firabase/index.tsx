import { useState, useEffect } from "react"
import db from "@/lib/firabase"
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore"; 

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export default function Home() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		// データベースからデータを取得する
		const postDatas = collection(db, "posts")
		getDocs(postDatas).then((snapShot) => {
			setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
		})

		// リアルタイムで取得
		onSnapshot(postDatas, (post) => {
			setPosts(post.docs.map((doc) => ({ ...doc.data() })))
		})
	}, [])

	console.log(posts)

  return (
    <>
      <div>
				<h2>Firabaseデモ</h2>
				{posts?.map((post, index) => (
					<>
						<div key={index}>
							<p>{post?.title}</p>
							<p>{post?.text}</p>
						</div>
					</>
				))}
      </div>
    </>
  )
}

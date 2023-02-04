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
		const postDatas = collection(db, "posts")
		getDocs(postDatas).then((snapShot) => {
			setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
		})

		// リアルタイムで取得
		onSnapshot(postDatas, (post) => {
			setPosts(post.docs.map((doc) => ({ ...doc.data() })))
		})
	}, [])

	const postArray = [
		{title: "aaa", text: "aaa"},
		{title: "bbb", text: "bbb"},
		{title: "ccc", text: "ccc"},
	] 

	const registerPost = () => {
		console.log("hoge");
		// setDoc(doc(db, "posts", "LA"), {
		// 	title: "データ追加テスト",
		// 	text: "データ追加テストです。",
		// });
		postArray.map((post, index) => {
			setDoc(doc(db, "hogehoge", `json_register_test_${index}`), post);
		})
	}

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
			<h2>データ追加</h2>
			<Button onClick={() => registerPost()}>データ追加です</Button>
    </>
  )
}

import Head from "next/head";
import styles from "../styles/Home.module.css";
import queryStack from "../services/stack";
export default function Home(props) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Home page</h1>
		</div>
	);
}

export const getStaticProps = async (context) => {
	const blogsData = await queryStack({ contentType: "abhay_blog" });
	return {
		props: {
			blogs: blogsData[0],
		},
	};
};

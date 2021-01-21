import Head from "next/head";
import styles from "../styles/Home.module.css";
import queryStack from "../services/stack";
export default function Blog(props) {
	const blog = props.blog;
	return (
		<div className={styles.container}>
			<Head>
				<title>{blog.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>{blog.blog_title}</h1>
		</div>
	);
}

export const getStaticProps = async (context) => {
	const blogData = await queryStack({
		contentType: "abhay_blog",
		entryId: context.params.id,
	});
	const blog = await blogData.toJSON();
	return {
		props: { blog: blog },
	};
};

export const getStaticPaths = async (context) => {
	const blogsData = await queryStack({ contentType: "abhay_blog" });
	const paths = [
		...blogsData[0].map((blog) => {
			return { params: { id: blog.uid } };
		}),
	];
	return {
		paths,
		fallback: false,
	};
};

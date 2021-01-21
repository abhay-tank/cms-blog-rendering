import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Blog.module.scss";
import queryStack from "../services/stack";
export default function Home(props) {
	if (props.hasError) {
		return (
			<div className={styles.container}>
				<h1>Error fetching Data</h1>
			</div>
		);
	} else {
		return (
			<div className={styles.container}>
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{props.blogs.map((blog) => {
					return (
						<div key={blog.uid} className={styles["blog-card"]}>
							<h1>{blog.blog_title}</h1>
							<hr className={styles["hr"]} />
							{/* <h3>{blog.blogAuthor}</h3> */}
							<h4>{blog.uid}</h4>
							<p>
								{blog.blog_content.length > 100
									? blog.blog_content.substring(0, 100) + "  ....."
									: blog.blog_content}
							</p>
							<Link href={`/${blog.uid}`}>
								<button className={styles["btn-small"]}>Read more</button>
							</Link>
						</div>
					);
				})}
			</div>
		);
	}
}

export const getStaticProps = async (context) => {
	try {
		const blogsData = await queryStack({ contentType: "abhay_blog" });
		return {
			props: {
				blogs: blogsData[0],
			},
		};
	} catch (error) {
		return {
			props: {
				hasError: true,
			},
		};
	}
};

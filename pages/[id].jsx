import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import queryStack from "../services/stack";
import styles from "../styles/Blog.module.scss";
export default function Blog(props) {
	const blog = props.blog;
	if (props.hasError) {
		return (
			<div>
				<h1>Error fetching data</h1>
			</div>
		);
	} else {
		return (
			<div className={styles.container}>
				<Head>
					<title>{blog.title}</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<h1>{blog.blog_title}</h1>
				<Image src={blog.blog_image.url} height="400" width="600" />
				<p>{blog.blog_content}</p>
				<div>
					{blog.related_blogs.map((link) => {
						return (
							<Link key={link.blog_title} href={`/${link.uid}`}>
								{link.blog_title}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

export const getStaticProps = async (context) => {
	try {
		const blogData = await queryStack({
			contentType: "abhay_blog",
			entryId: context.params.id,
			referenceId: "related_blogs",
		});
		const blog = await blogData.toJSON();
		return {
			props: { blog: blog },
		};
	} catch (error) {
		return {
			props: { hasError: true },
		};
	}
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

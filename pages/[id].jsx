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
			<div>
				<Head>
					<title>{blog.title}</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<nav className="nav-container">
					<Link href={props.navbar.url.href}>
						<Image
							className="nav-link"
							src={props.navbar.logo.url}
							height="100"
							width="300"
							alt={props.navbar.url.title}
						/>
					</Link>
				</nav>
				<div className={`${styles["container"]} ${styles["blog-container"]}`}>
					<h1>{blog.blog_title}</h1>
					<Image
						className={styles["blogImage"]}
						src={blog.blog_image.url}
						height="400"
						width="600"
					/>
					<p>{blog.blog_content}</p>
					<div>
						{blog.related_blogs.map((link) => {
							return (
								<Link key={link.blog_title} href={`/${link.uid}`}>
									<div className={styles["relatedLink"]}>
										<h2>{link.blog_title}</h2>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				<footer className="footer">
					<Image
						className="avatarImage"
						src={props.footer.avatar_image.url}
						height="150"
						width="150"
					/>
					<h1>{props.footer.name}</h1>
					<div className="social-links">
						{Object.keys(props.footer.social_links).map((link) => {
							return (
								<Link
									key={props.footer.social_links[link].title}
									className="social-link"
									href={props.footer.social_links[link].href}
								>
									<h3>{props.footer.social_links[link].title}</h3>
								</Link>
							);
						})}
					</div>
				</footer>
			</div>
		);
	}
}

export const getStaticProps = async (context) => {
	try {
		const navbarData = await queryStack({
			contentType: "abhay_navbar",
			entryId: "blt84907aec22a25cb5",
		});
		const navbar = await navbarData.toJSON();
		const footerData = await queryStack({
			contentType: "abhay_footer",
			entryId: "blta0b13b7efa0d9f79",
		});
		const footer = await footerData.toJSON();
		const blogData = await queryStack({
			contentType: "abhay_blog",
			entryId: context.params.id,
			referenceId: "related_blogs",
		});
		const blog = await blogData.toJSON();
		return {
			props: { blog, navbar, footer },
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

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
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
			<div>
				<Head>
					<title>Feather Blogs</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<nav className={styles["nav-container"]}>
					<Link href={props.navbar.url.href}>
						<Image
							className={styles["nav-link"]}
							src={props.navbar.logo.url}
							height="100"
							width="300"
							alt={props.navbar.url.title}
						/>
					</Link>
				</nav>
				<div className={styles["container"]}>
					{props.blogs.map((blog) => {
						return (
							<div key={blog.uid} className={styles["blog-card"]}>
								<h1>{blog.blog_title}</h1>
								<hr className={styles["hr"]} />
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
				<footer className={styles["footer"]}>
					<Image
						className={styles["avatarImage"]}
						src={props.footer.avatar_image.url}
						height="150"
						width="150"
					/>
					<h1>{props.footer.name}</h1>
					<div className={styles["social-links"]}>
						{Object.keys(props.footer.social_links).map((link) => {
							return (
								<Link
									key={props.footer.social_links[link].title}
									className={styles["social-link"]}
									href={props.footer.social_links[link].href}
								>
									{props.footer.social_links[link].title}
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
		const blogsData = await queryStack({ contentType: "abhay_blog" });
		return {
			props: {
				navbar: navbar,
				blogs: blogsData[0],
				footer: footer,
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

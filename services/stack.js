import Contentstack from "contentstack";

const Stack = Contentstack.Stack(
	process.env.CMS_API_KEY,
	process.env.CMS_DELIVERY_TOKEN,
	process.env.CMS_ENVIRONMENT
);
const queryStack = async ({ contentType, entryId, referenceId }) => {
	const content = Stack.ContentType(contentType);
	try {
		if (entryId && referenceId && referenceId.length) {
			return await content.Entry(entryId).includeReference(referenceId).fetch();
		} else if (entryId) {
			return await content.Entry(entryId).fetch();
		} else {
			return await content.Query().includeCount().toJSON().find();
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export default queryStack;

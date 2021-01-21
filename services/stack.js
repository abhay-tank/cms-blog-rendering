import Contentstack from "contentstack";

const Stack = Contentstack.Stack(
	process.env.CMS_API_KEY,
	process.env.CMS_DELIVERY_TOKEN,
	process.env.CMS_ENVIRONMENT
);
const queryStack = async ({ contentType, entryId }) => {
	const content = Stack.ContentType(contentType);
	try {
		if (entryId) {
			return await content.Entry(entryId).fetch();
		} else {
			return await content.Query().includeCount().toJSON().find();
		}
	} catch (error) {
		return error;
	}
};
export default queryStack;

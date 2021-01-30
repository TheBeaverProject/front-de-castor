import PropTypes from "prop-types";

const NewsPrompt = (props) => {

    NewsPrompt.propTypes = {
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
    };

    return (
        <>
        </>
    );
}
export default NewsPrompt;
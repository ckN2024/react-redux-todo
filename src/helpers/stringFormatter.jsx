const stringFormatter = (originalString) => {
    const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?(\?.*)?$/gm
    const words = originalString.split(" ");

    const newWords = words.map((word, index) => {
        return word.match(URL_REGEX) ? (
            <a href={word} onClick={(e)=> e.stopPropagation()} className="text-blue-500" key={index}>{word} </a>
        ) : (
            <span key={index}>{word} </span>
        );
    });

    return newWords;
};

export default stringFormatter;
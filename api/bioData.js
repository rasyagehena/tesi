// api/bioData.js
const bioData = {
    john: {
        name: "John Doe",
        age: 30,
        profession: "Web Developer",
        bio: "John is a web developer with 10 years of experience."
    },
    jane: {
        name: "Jane Doe",
        age: 25,
        profession: "Graphic Designer",
        bio: "Jane is a graphic designer specializing in branding."
    }
};

const getBioData = (name) => {
    return bioData[name.toLowerCase()] || null;
};

module.exports = { getBioData };
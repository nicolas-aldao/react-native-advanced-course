export const generateRandomProfiles = (numProfiles: number) => {
    const femaleFirstNames = ["Emma", "Olivia", "Sophia", "Ava", "Isabella"];
    const maleFirstNames = ["John", "Alex", "Chris", "Liam", "Noah"];
    const lastNames = ["Doe", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Rodriguez"];

    const usedNames = new Set();
    const usedPhotos = new Set();
    const profiles = [];

    for (let i = 0; i < numProfiles; i++) {
        let isFemale = Math.random() > 0.5;
        let firstName;
        let lastName;
        let name;

        do {
            firstName = isFemale
                ? femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)]
                : maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
            lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            name = `${firstName} ${lastName}`;
        } while (usedNames.has(name));
        usedNames.add(name);

        let photoId;
        do {
            photoId = Math.floor(Math.random() * 100);
        } while (usedPhotos.has(photoId));
        usedPhotos.add(photoId);

        const gender = isFemale ? "women" : "men";
        const photo = `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`;

        profiles.push({
            id: i + 1,
            name,
            age: Math.floor(Math.random() * 18) + 22, // Generate age between 22 and 39
            photo,
        });
    }

    return profiles;
}

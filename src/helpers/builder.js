module.exports = {
  personBuilder: (body, file = null) => {
    const {
      firstName, lastName, alias, dateOfBirth, status, sex, city, address, state, zip,
      profession, degree, maritalStatus, bodyType, eyeColor, skinColor, hairType, height, weight,
      tattoos, drugs, amputhee, mental, diseases, registry, driverLicense, birthCertificate, professionalLicense,
      economicReg, geoReferences, picPath, picName
    } = body;

    let image = {};

    if ( file === null && picPath === null) {
      image = {
        url: 'https://res.cloudinary.com/stormamnc/image/upload/v1544470625/volta-api/people/person_picture_alt.png',
        originalname: 'Avatar',
      }
    } else if ( file === null && picPath !== null ) {
      image = {
        url: picPath,
        originalname: picName
      }
    } 

    const { url, originalname } = image;

    return {
      name: { firstName, lastName, alias },
      dateOfBirth,
      status,
      sex,
      locations: {
        ofBirth: {
          city, address, state, zip,
        },
        geoReferences,
      },
      background: { profession, degree, maritalStatus },
      picture: {
        picName: originalname,
        picPath: url,
      },
      appearance: {
        bodyType, eyeColor, skinColor, hairType, height, weight, tattoos,
      },
      health: {
        drugs, amputhee, mental, diseases,
      },
      documents: {
        registry, economicReg, driverLicense, birthCertificate, professionalLicense,
      },
    };
  },
  userBuilder: (body) => {
    const {
      firstName, lastName, username, email,
      organization, dateOfBirth, role, password,
    } = body;
    return {
      name: { firstName, lastName },
      email,
      username,
      password,
      organization,
      role,
      dateOfBirth,
    };
  },
};

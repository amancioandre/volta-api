module.exports = {
  personBuilder: (body, file = null) => {
    // console.log(body, file);
    const {
      firstName, lastName, alias, dateOfBirth, status, sex, city, address, state, zip,
      profession, degree, maritalStatus, bodyType, eyeColor, skinColor, hairType, height, weight,
      tattoos, drugs, amputhee, mental, diseases, registry, driverLicense, birthCertificate, professionalLicense,
      economicReg, geoReferences,
    } = body;

    let image = {};

    file === null ? image = {
      url: 'https://res.cloudinary.com/stormamnc/image/upload/v1544470625/volta-api/people/person_picture_alt.png',
      originalname: 'Avatar',
    } : image = file;

    const { url, originalname } = image;

    console.log(body);
    return {
      name: { firstName, lastName, alias },
      dateOfBirth,
      status,
      sex,
      locations: {
        ofBirth: {
          city, address, state, zip,
        },
<<<<<<< HEAD
        geoReferences: [{
          lat,
          lng,
          timestamps: { createdAt: 'createdAt' },
        }],
=======
        geoReferences
>>>>>>> 5993a8c8d82266704c34cfaff3e66dccbb42c65c
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
    console.log('userbuilder', body);
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

module.exports = {
  personBuilder: (body, file) => {
    console.log(body, file);
    const {
      firstName, lastName, alias, dateOfBirth, status, sex, city, address, state, zip,
      profession, degree, maritalStatus, bodyType, eyeColor, skinColor, hairType, height, weight,
      tattoos, drugs, amputhee, mental, diseases, registry, driverLicense, birthCertificate, professionalLicense,
      economicReg,
    } = body;

    const { url, originalname } = file

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
        // geoReferences: [{
        //   geoHash: String,
        //   timestamps: { createdAt: 'createdAt' },
        // }],
      },
      background: { profession, degree, maritalStatus },
      picture: {
        imgName: originalname,
        imgPath: url
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
    console.log("userbuilder", body)
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
